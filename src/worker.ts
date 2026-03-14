/**
 * Cloudflare Worker — Dynamic OG image / meta tag generation for Codex Themes.
 *
 * For normal browser requests: serves the static SPA assets as-is.
 * For social bot requests to /?theme=<id>: returns custom HTML with
 * theme-specific og:title, og:description, and og:image (SVG).
 * For /og-image?theme=<id>: returns an SVG image for the OG preview.
 */

export interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> };
}

// --- Social bot detection -------------------------------------------------

const BOT_UA =
  /facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot|vkshare|applebot|iframely|embedly|outbrain|quora link preview|rogerbot|tumblr|vimeobot|xing-contenttabreceiver|pinterest|redditbot|screaming frog|developers\.google|w3c_validator|facebot/i;

function isSocialBot(userAgent: string): boolean {
  return BOT_UA.test(userAgent);
}

// --- Compact theme data for OG -------------------------------------------
// Only curated / named themes. Generated themes (hue sweep, soft-light, etc.)
// fall back to a generic Codex Themes OG image with a colour extracted from the ID.

interface OgTheme {
  name: string;
  accent: string;
  surface: string;
  ink: string;
  variant: "light" | "dark";
  category: string;
}

const THEMES: Record<string, OgTheme> = {
  // Editor themes
  dracula: { name: "Dracula", accent: "#bd93f9", surface: "#282a36", ink: "#f8f8f2", variant: "dark", category: "Editor" },
  "dracula-soft": { name: "Dracula Soft", accent: "#9580c2", surface: "#2d2f3f", ink: "#e8e8e8", variant: "dark", category: "Editor" },
  monokai: { name: "Monokai", accent: "#f92672", surface: "#272822", ink: "#f8f8f2", variant: "dark", category: "Editor" },
  "monokai-pro": { name: "Monokai Pro", accent: "#ff6188", surface: "#2d2a2e", ink: "#fcfcfa", variant: "dark", category: "Editor" },
  nord: { name: "Nord", accent: "#88c0d0", surface: "#2e3440", ink: "#d8dee9", variant: "dark", category: "Editor" },
  "nord-light": { name: "Nord Light", accent: "#5e81ac", surface: "#eceff4", ink: "#2e3440", variant: "light", category: "Editor" },
  "solarized-dark": { name: "Solarized Dark", accent: "#268bd2", surface: "#002b36", ink: "#839496", variant: "dark", category: "Editor" },
  "solarized-light": { name: "Solarized Light", accent: "#268bd2", surface: "#fdf6e3", ink: "#657b83", variant: "light", category: "Editor" },
  "gruvbox-dark": { name: "Gruvbox Dark", accent: "#d79921", surface: "#282828", ink: "#ebdbb2", variant: "dark", category: "Editor" },
  "gruvbox-light": { name: "Gruvbox Light", accent: "#d79921", surface: "#fbf1c7", ink: "#3c3836", variant: "light", category: "Editor" },
  "catppuccin-mocha": { name: "Catppuccin Mocha", accent: "#cba6f7", surface: "#1e1e2e", ink: "#cdd6f4", variant: "dark", category: "Editor" },
  "catppuccin-macchiato": { name: "Catppuccin Macchiato", accent: "#c6a0f6", surface: "#24273a", ink: "#cad3f5", variant: "dark", category: "Editor" },
  "catppuccin-frappe": { name: "Catppuccin Frappé", accent: "#ca9ee6", surface: "#303446", ink: "#c6d0f5", variant: "dark", category: "Editor" },
  "catppuccin-latte": { name: "Catppuccin Latte", accent: "#8839ef", surface: "#eff1f5", ink: "#4c4f69", variant: "light", category: "Editor" },
  "one-dark": { name: "One Dark", accent: "#61afef", surface: "#282c34", ink: "#abb2bf", variant: "dark", category: "Editor" },
  "one-light": { name: "One Light", accent: "#4078f2", surface: "#fafafa", ink: "#383a42", variant: "light", category: "Editor" },
  "tokyo-night": { name: "Tokyo Night", accent: "#7aa2f7", surface: "#1a1b26", ink: "#a9b1d6", variant: "dark", category: "Editor" },
  "tokyo-night-storm": { name: "Tokyo Night Storm", accent: "#7aa2f7", surface: "#24283b", ink: "#a9b1d6", variant: "dark", category: "Editor" },
  "tokyo-night-light": { name: "Tokyo Night Light", accent: "#3366cc", surface: "#d5d6db", ink: "#343b58", variant: "light", category: "Editor" },
  "github-dark": { name: "GitHub Dark", accent: "#58a6ff", surface: "#0d1117", ink: "#c9d1d9", variant: "dark", category: "Editor" },
  "github-dark-dimmed": { name: "GitHub Dark Dimmed", accent: "#539bf5", surface: "#22272e", ink: "#adbac7", variant: "dark", category: "Editor" },
  "github-light": { name: "GitHub Light", accent: "#0969da", surface: "#ffffff", ink: "#24292f", variant: "light", category: "Editor" },
  "ayu-dark": { name: "Ayu Dark", accent: "#ffb454", surface: "#0a0e14", ink: "#b3b1ad", variant: "dark", category: "Editor" },
  "ayu-mirage": { name: "Ayu Mirage", accent: "#ffcc66", surface: "#1f2430", ink: "#cbccc6", variant: "dark", category: "Editor" },
  "ayu-light": { name: "Ayu Light", accent: "#ff9940", surface: "#fafafa", ink: "#575f66", variant: "light", category: "Editor" },
  "everforest-dark": { name: "Everforest Dark", accent: "#a7c080", surface: "#2d353b", ink: "#d3c6aa", variant: "dark", category: "Editor" },
  "everforest-light": { name: "Everforest Light", accent: "#8da101", surface: "#fdf6e3", ink: "#5c6a72", variant: "light", category: "Editor" },
  "rose-pine": { name: "Rosé Pine", accent: "#c4a7e7", surface: "#191724", ink: "#e0def4", variant: "dark", category: "Editor" },
  "rose-pine-moon": { name: "Rosé Pine Moon", accent: "#c4a7e7", surface: "#232136", ink: "#e0def4", variant: "dark", category: "Editor" },
  "rose-pine-dawn": { name: "Rosé Pine Dawn", accent: "#907aa9", surface: "#faf4ed", ink: "#575279", variant: "light", category: "Editor" },
  kanagawa: { name: "Kanagawa", accent: "#dca561", surface: "#1f1f28", ink: "#dcd7ba", variant: "dark", category: "Editor" },
  "material-dark": { name: "Material Dark", accent: "#82aaff", surface: "#212121", ink: "#eeffff", variant: "dark", category: "Editor" },
  "material-ocean": { name: "Material Ocean", accent: "#82aaff", surface: "#0f111a", ink: "#8f93a2", variant: "dark", category: "Editor" },
  "night-owl": { name: "Night Owl", accent: "#7fdbca", surface: "#011627", ink: "#d6deeb", variant: "dark", category: "Editor" },
  "light-owl": { name: "Light Owl", accent: "#2aa298", surface: "#fbfbfb", ink: "#403f53", variant: "light", category: "Editor" },
  "vitesse-dark": { name: "Vitesse Dark", accent: "#4d9375", surface: "#121212", ink: "#dbd7ca", variant: "dark", category: "Editor" },
  poimandres: { name: "Poimandres", accent: "#add7ff", surface: "#1b1e28", ink: "#a6accd", variant: "dark", category: "Editor" },
  "synthwave-84": { name: "Synthwave '84", accent: "#ff7edb", surface: "#262335", ink: "#ffffff", variant: "dark", category: "Editor" },
  cyberpunk: { name: "Cyberpunk", accent: "#ff00ff", surface: "#0d0221", ink: "#00ff9f", variant: "dark", category: "Editor" },
  "shades-of-purple": { name: "Shades of Purple", accent: "#fad000", surface: "#2d2b55", ink: "#e0def4", variant: "dark", category: "Editor" },
  "vscode-dark": { name: "VS Code Dark+", accent: "#569cd6", surface: "#1e1e1e", ink: "#d4d4d4", variant: "dark", category: "Editor" },
  "vscode-light": { name: "VS Code Light+", accent: "#0070c1", surface: "#ffffff", ink: "#000000", variant: "light", category: "Editor" },
  // Brand themes
  notion: { name: "Notion", accent: "#3183d8", surface: "#ffffff", ink: "#37352f", variant: "light", category: "Brand" },
  "notion-dark": { name: "Notion Dark", accent: "#529cca", surface: "#191919", ink: "#e3e2e0", variant: "dark", category: "Brand" },
  linear: { name: "Linear", accent: "#5e6ad2", surface: "#1a1a2e", ink: "#e8e8f0", variant: "dark", category: "Brand" },
  vercel: { name: "Vercel", accent: "#ffffff", surface: "#000000", ink: "#ededed", variant: "dark", category: "Brand" },
  stripe: { name: "Stripe", accent: "#635bff", surface: "#ffffff", ink: "#425466", variant: "light", category: "Brand" },
  "stripe-dark": { name: "Stripe Dark", accent: "#635bff", surface: "#0a2540", ink: "#c1c9d2", variant: "dark", category: "Brand" },
  figma: { name: "Figma", accent: "#a259ff", surface: "#ffffff", ink: "#333333", variant: "light", category: "Brand" },
  "figma-dark": { name: "Figma Dark", accent: "#a259ff", surface: "#2c2c2c", ink: "#e5e5e5", variant: "dark", category: "Brand" },
  discord: { name: "Discord", accent: "#5865f2", surface: "#313338", ink: "#dbdee1", variant: "dark", category: "Brand" },
  spotify: { name: "Spotify", accent: "#1db954", surface: "#121212", ink: "#ffffff", variant: "dark", category: "Brand" },
  "twitter-x": { name: "X (Twitter)", accent: "#1d9bf0", surface: "#000000", ink: "#e7e9ea", variant: "dark", category: "Brand" },
  obsidian: { name: "Obsidian", accent: "#7c3aed", surface: "#1e1e1e", ink: "#dcddde", variant: "dark", category: "Brand" },
  arc: { name: "Arc Browser", accent: "#5856d6", surface: "#f5f0ec", ink: "#222222", variant: "light", category: "Brand" },
  tailwind: { name: "Tailwind", accent: "#38bdf8", surface: "#0f172a", ink: "#e2e8f0", variant: "dark", category: "Brand" },
  supabase: { name: "Supabase", accent: "#3ecf8e", surface: "#1c1c1c", ink: "#ededed", variant: "dark", category: "Brand" },
  openai: { name: "OpenAI", accent: "#10a37f", surface: "#0d0d0d", ink: "#ececec", variant: "dark", category: "Brand" },
  anthropic: { name: "Anthropic", accent: "#cc785c", surface: "#f8f0e8", ink: "#2a1f1a", variant: "light", category: "Brand" },
  raycast: { name: "Raycast", accent: "#ff6363", surface: "#1a1a1a", ink: "#eeeeee", variant: "dark", category: "Brand" },
  // Nature
  "aurora-borealis": { name: "Aurora Borealis", accent: "#00ffaa", surface: "#0a0f1a", ink: "#d0f0e0", variant: "dark", category: "Nature" },
  "rose-pine2": { name: "Cherry Blossom", accent: "#d4619c", surface: "#fdf0f5", ink: "#4a2838", variant: "light", category: "Nature" },
  nebula: { name: "Nebula", accent: "#9c27b0", surface: "#0a0014", ink: "#d0b0e0", variant: "dark", category: "Nature" },
  // Mood
  "neon-city": { name: "Neon City", accent: "#ff00ff", surface: "#0a0020", ink: "#e0d0ff", variant: "dark", category: "Mood" },
  vaporwave: { name: "Vaporwave", accent: "#ff71ce", surface: "#0a001a", ink: "#e0c0ff", variant: "dark", category: "Mood" },
  "retro-terminal": { name: "Retro Terminal", accent: "#00ff00", surface: "#0a0a0a", ink: "#00ff00", variant: "dark", category: "Mood" },
  hacker: { name: "Hacker", accent: "#33ff33", surface: "#000800", ink: "#33ff33", variant: "dark", category: "Mood" },
  synthwave: { name: "Synthwave", accent: "#ff7edb", surface: "#262335", ink: "#ffffff", variant: "dark", category: "Mood" },
  // City
  "tokyo-neon": { name: "Tokyo Neon", accent: "#ff2d95", surface: "#0d0015", ink: "#f0e0ff", variant: "dark", category: "City" },
  "miami-vice": { name: "Miami Vice", accent: "#ff6ec7", surface: "#0a0028", ink: "#f0d0ff", variant: "dark", category: "City" },
  "new-york-midnight": { name: "New York Midnight", accent: "#ffd700", surface: "#0a0a0a", ink: "#e0e0e0", variant: "dark", category: "City" },
  // Framework
  react: { name: "React", accent: "#61dafb", surface: "#20232a", ink: "#e0e0e0", variant: "dark", category: "Framework" },
  vue: { name: "Vue", accent: "#42b883", surface: "#1a1a2e", ink: "#e0e0e0", variant: "dark", category: "Framework" },
  svelte: { name: "Svelte", accent: "#ff3e00", surface: "#1a1a2e", ink: "#e0e0e0", variant: "dark", category: "Framework" },
  nextjs: { name: "Next.js", accent: "#ffffff", surface: "#000000", ink: "#ededed", variant: "dark", category: "Framework" },
  rust: { name: "Rust", accent: "#dea584", surface: "#1a1a2e", ink: "#e0e0e0", variant: "dark", category: "Framework" },
};

// --- Color helpers ---------------------------------------------------------

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function adjust(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const clamp = (v: number) => Math.min(255, Math.max(0, v + amount));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mix(c1: string, c2: string, ratio: number): string {
  const [r1, g1, b1] = hexToRgb(c1);
  const [r2, g2, b2] = hexToRgb(c2);
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// --- SVG OG image generation ----------------------------------------------

function buildOgSvg(theme: OgTheme | null, themeId: string): string {
  // Use provided theme or derive accent from ID for generated themes
  const accent = theme?.accent ?? "#6366f1";
  const surface = theme?.surface ?? "#09090b";
  const ink = theme?.ink ?? "#ffffff";
  const variant = theme?.variant ?? "dark";
  const name = theme?.name ?? themeId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const category = theme?.category ?? "Theme";

  const isDark = variant === "dark";
  const sidebar = isDark ? adjust(surface, 10) : adjust(surface, -10);
  const border = isDark ? adjust(surface, 26) : adjust(surface, -18);
  const surfaceEl = isDark ? adjust(surface, 18) : adjust(surface, -5);
  const muted = mix(ink, surface, 0.5);
  const bg = isDark ? adjust(surface, -6) : adjust(surface, 6);

  const diffAdded = isDark ? "#4ade80" : "#16a34a";
  const diffRemoved = isDark ? "#f87171" : "#dc2626";

  // Truncate long names
  const displayName = name.length > 22 ? name.slice(0, 20) + "…" : name;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="${isDark ? adjust(surface, -2) : adjust(surface, 2)}"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="editorClip">
      <rect x="640" y="90" width="510" height="450" rx="14"/>
    </clipPath>
    <filter id="shadow">
      <feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="${accent}" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Main background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- Subtle accent glow on left -->
  <rect x="0" y="0" width="560" height="630" fill="url(#accentGrad)" opacity="0.6"/>

  <!-- Accent line at top -->
  <rect x="60" y="0" width="120" height="3" rx="1.5" fill="${accent}"/>

  <!-- Logo area -->
  <circle cx="82" cy="68" r="18" fill="${accent}" opacity="0.15"/>
  <circle cx="82" cy="68" r="10" fill="${accent}" opacity="0.3"/>
  <circle cx="82" cy="68" r="5" fill="${accent}"/>
  <text x="104" y="75" font-family="system-ui,-apple-system,sans-serif" font-size="18" font-weight="600" fill="${muted}">Codex Themes</text>

  <!-- Theme name -->
  <text x="60" y="210" font-family="system-ui,-apple-system,sans-serif" font-size="${displayName.length > 16 ? 58 : 70}" font-weight="800" fill="${ink}" letter-spacing="-2">${escapeXml(displayName)}</text>

  <!-- Badges -->
  <rect x="60" y="235" width="${category.length * 9 + 24}" height="30" rx="15" fill="${accent}" opacity="0.15"/>
  <text x="${60 + 12}" y="255" font-family="system-ui,-apple-system,sans-serif" font-size="14" font-weight="600" fill="${accent}">${escapeXml(category)}</text>

  <rect x="${60 + category.length * 9 + 36}" y="235" width="${variant.length * 9 + 24}" height="30" rx="15" fill="${muted}" opacity="0.15"/>
  <text x="${60 + category.length * 9 + 48}" y="255" font-family="system-ui,-apple-system,sans-serif" font-size="14" font-weight="500" fill="${muted}">${escapeXml(variant)}</text>

  <!-- Color swatches -->
  <text x="60" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" font-weight="600" fill="${muted}" letter-spacing="2" text-transform="uppercase">COLORS</text>
  <!-- Accent -->
  <rect x="60" y="332" width="120" height="60" rx="10" fill="${accent}"/>
  <text x="72" y="360" font-family="system-ui,-apple-system,sans-serif" font-size="11" font-weight="700" fill="${surface}" opacity="0.8">Accent</text>
  <text x="72" y="378" font-family="ui-monospace,monospace" font-size="11" fill="${surface}" opacity="0.7">${accent}</text>
  <!-- Surface -->
  <rect x="192" y="332" width="120" height="60" rx="10" fill="${surfaceEl}" stroke="${border}" stroke-width="1"/>
  <text x="204" y="360" font-family="system-ui,-apple-system,sans-serif" font-size="11" font-weight="700" fill="${ink}" opacity="0.8">Surface</text>
  <text x="204" y="378" font-family="ui-monospace,monospace" font-size="11" fill="${muted}">${surface}</text>
  <!-- Ink -->
  <rect x="324" y="332" width="120" height="60" rx="10" fill="${ink}" opacity="0.95"/>
  <text x="336" y="360" font-family="system-ui,-apple-system,sans-serif" font-size="11" font-weight="700" fill="${surface}">Ink</text>
  <text x="336" y="378" font-family="ui-monospace,monospace" font-size="11" fill="${surface}" opacity="0.7">${ink}</text>

  <!-- URL / branding at bottom -->
  <text x="60" y="580" font-family="system-ui,-apple-system,sans-serif" font-size="16" fill="${muted}" opacity="0.7">codex.instantlandingpages.xyz</text>
  <text x="60" y="606" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="${muted}" opacity="0.4">1000+ curated themes for OpenAI Codex</text>

  <!-- Right: Editor preview card -->
  <g filter="url(#shadow)">
    <!-- Card background -->
    <rect x="640" y="90" width="510" height="450" rx="14" fill="${surface}" stroke="${border}" stroke-width="1"/>

    <!-- Title bar -->
    <rect x="640" y="90" width="510" height="38" rx="14" fill="${sidebar}"/>
    <rect x="640" y="108" width="510" height="20" fill="${sidebar}"/>
    <!-- Traffic lights -->
    <circle cx="670" cy="109" r="6" fill="#ff5f57"/>
    <circle cx="690" cy="109" r="6" fill="#febc2e"/>
    <circle cx="710" cy="109" r="6" fill="#28c840"/>
    <!-- Title -->
    <text x="890" y="114" font-family="system-ui,-apple-system,sans-serif" font-size="11" fill="${muted}" text-anchor="middle">Codex</text>
    <rect x="640" y="127" width="510" height="1" fill="${border}"/>

    <!-- Sidebar -->
    <rect x="640" y="128" width="70" height="412" fill="${sidebar}"/>
    <rect x="710" y="128" width="1" height="412" fill="${border}"/>
    <!-- Sidebar items -->
    <rect x="648" y="142" width="54" height="7" rx="3" fill="${accent}" opacity="0.4"/>
    <rect x="648" y="112" width="2" height="35" rx="1" fill="${accent}" style="transform: translate(0, 30px)"/>
    <rect x="648" y="157" width="40" height="5" rx="2" fill="${muted}" opacity="0.2"/>
    <rect x="648" y="170" width="48" height="5" rx="2" fill="${muted}" opacity="0.2"/>
    <rect x="648" y="183" width="35" height="5" rx="2" fill="${muted}" opacity="0.15"/>
    <!-- Avatar -->
    <circle cx="675" cy="520" r="12" fill="${accent}" opacity="0.2" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>

    <!-- Main content area -->
    <!-- You message -->
    <circle cx="730" cy="160" r="11" fill="${accent}" opacity="0.25"/>
    <text x="730" y="164" font-family="system-ui,-apple-system,sans-serif" font-size="9" font-weight="700" fill="${accent}" text-anchor="middle">Y</text>
    <text x="748" y="158" font-family="system-ui,-apple-system,sans-serif" font-size="10" font-weight="700" fill="${accent}">You</text>
    <rect x="748" y="165" width="140" height="22" rx="5" fill="${surfaceEl}"/>
    <text x="757" y="180" font-family="system-ui,-apple-system,sans-serif" font-size="9" fill="${ink}">Refactor auth module</text>

    <!-- Codex response -->
    <circle cx="730" cy="210" r="11" fill="${accent}"/>
    <text x="730" y="214" font-family="system-ui,-apple-system,sans-serif" font-size="9" font-weight="700" fill="${surface}" text-anchor="middle">C</text>
    <text x="748" y="208" font-family="system-ui,-apple-system,sans-serif" font-size="10" fill="${muted}">Codex</text>

    <!-- Code block -->
    <rect x="748" y="215" width="368" height="110" rx="7" fill="${surfaceEl}" stroke="${border}" stroke-width="1"/>
    <!-- Code block header -->
    <rect x="748" y="215" width="368" height="22" rx="7" fill="${isDark ? adjust(surface, 14) : adjust(surface, -8)}" stroke="${border}" stroke-width="1"/>
    <rect x="748" y="228" width="368" height="9" fill="${isDark ? adjust(surface, 14) : adjust(surface, -8)}"/>
    <text x="758" y="230" font-family="ui-monospace,monospace" font-size="9" fill="${muted}">auth.ts</text>
    <text x="1100" y="230" font-family="ui-monospace,monospace" font-size="9" fill="${accent}" text-anchor="end">diff</text>
    <!-- Code lines -->
    <text x="758" y="253" font-family="ui-monospace,monospace" font-size="10" fill="${diffRemoved}">- const token = legacy();</text>
    <text x="758" y="268" font-family="ui-monospace,monospace" font-size="10" fill="${diffAdded}">+ const token = jwt.sign();</text>
    <text x="758" y="283" font-family="ui-monospace,monospace" font-size="10" fill="${muted}">  return validate(token);</text>
    <text x="758" y="298" font-family="ui-monospace,monospace" font-size="10" fill="${muted}">  await sync(session);</text>
    <!-- Diff highlights -->
    <rect x="748" y="243" width="368" height="16" rx="2" fill="${diffRemoved}" opacity="0.08"/>
    <rect x="748" y="259" width="368" height="16" rx="2" fill="${diffAdded}" opacity="0.08"/>

    <!-- Second message block -->
    <rect x="748" y="340" width="260" height="40" rx="7" fill="${surfaceEl}" stroke="${border}" stroke-width="1"/>
    <rect x="758" y="349" width="160" height="7" rx="3" fill="${muted}" opacity="0.3"/>
    <rect x="758" y="362" width="110" height="7" rx="3" fill="${muted}" opacity="0.2"/>

    <!-- Input bar -->
    <rect x="711" y="505" width="436" height="34" fill="${sidebar}" stroke="${border}" stroke-width="0" stroke-top="1"/>
    <rect x="711" y="505" width="436" height="1" fill="${border}"/>
    <rect x="720" y="512" width="380" height="20" rx="5" fill="${surfaceEl}" stroke="${border}" stroke-width="1"/>
    <text x="730" y="525" font-family="system-ui,-apple-system,sans-serif" font-size="9" fill="${muted}">Ask Codex…</text>
    <rect x="1112" y="512" width="26" height="20" rx="5" fill="${accent}"/>
    <text x="1125" y="525" font-family="system-ui,-apple-system,sans-serif" font-size="10" fill="${surface}" text-anchor="middle">↑</text>

    <!-- Bottom rounded fill to cover stray pixel -->
    <rect x="640" y="526" width="510" height="14" rx="0" fill="${surface}"/>
    <rect x="640" y="527" width="510" height="13" rx="0" fill="${surface}"/>
    <rect x="640" y="526" width="510" height="14" rx="14" fill="${surface}"/>
    <rect x="640" y="527" width="510" height="13" fill="${surface}"/>
  </g>
</svg>`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// --- OG HTML generation ---------------------------------------------------

function buildOgHtml(theme: OgTheme | null, themeId: string, requestUrl: string): string {
  const name = theme?.name ?? themeId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const category = theme?.category ?? "Theme";
  const variant = theme?.variant ?? "dark";

  const title = `${name} — Codex Themes`;
  const description = `Check out the ${name} ${category.toLowerCase()} theme (${variant}) for OpenAI Codex. Browse and copy config strings for 1000+ curated themes.`;

  const url = new URL(requestUrl);
  const ogImageUrl = `${url.origin}/og-image?theme=${encodeURIComponent(themeId)}`;
  const themeUrl = `${url.origin}/?theme=${encodeURIComponent(themeId)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${escapeXml(title)}</title>
  <meta name="description" content="${escapeXml(description)}"/>
  <link rel="canonical" href="${escapeXml(themeUrl)}"/>

  <!-- Open Graph -->
  <meta property="og:type" content="website"/>
  <meta property="og:site_name" content="Codex Themes"/>
  <meta property="og:title" content="${escapeXml(title)}"/>
  <meta property="og:description" content="${escapeXml(description)}"/>
  <meta property="og:url" content="${escapeXml(themeUrl)}"/>
  <meta property="og:image" content="${escapeXml(ogImageUrl)}"/>
  <meta property="og:image:type" content="image/svg+xml"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${escapeXml(title)}"/>
  <meta name="twitter:description" content="${escapeXml(description)}"/>
  <meta name="twitter:image" content="${escapeXml(ogImageUrl)}"/>

  <!-- Redirect browsers (not bots) to the real SPA -->
  <meta http-equiv="refresh" content="0; url=${escapeXml(themeUrl)}"/>
  <script>window.location.replace(${JSON.stringify(themeUrl)});</script>
</head>
<body>
  <p>Redirecting to <a href="${escapeXml(themeUrl)}">${escapeXml(title)}</a>…</p>
</body>
</html>`;
}

// --- Worker entry point ---------------------------------------------------

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") ?? "";

    // Route: /og-image?theme=<id> — serve the SVG OG image
    if (url.pathname === "/og-image") {
      const themeId = url.searchParams.get("theme") ?? "";
      const theme = THEMES[themeId] ?? null;
      const svg = buildOgSvg(theme, themeId || "codex-themes");
      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // Route: /share/<id>
    // We use /share/ because Cloudflare's static asset router intercepts "/" 
    // (serving index.html) before the worker runs.
    const shareMatch = url.pathname.match(/^\/share\/([^\/]+)/);
    if (shareMatch) {
      const themeId = shareMatch[1];
      if (isSocialBot(userAgent)) {
        const theme = THEMES[themeId] ?? null;
        const html = buildOgHtml(theme, themeId, request.url);
        return new Response(html, {
          headers: {
            "Content-Type": "text/html;charset=UTF-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      } else {
        // Human visitor: redirect to the actual SPA URL
        return Response.redirect(`${url.origin}/?theme=${themeId}`, 302);
      }
    }

    // Default: serve the static SPA assets
    return env.ASSETS.fetch(request);
  },
};
