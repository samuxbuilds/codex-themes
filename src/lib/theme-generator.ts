/**
 * Theme generation engine. Produces 1000+ Codex themes from editor presets,
 * brand palettes, color families, hue sweeps, duotones, and accessibility variants.
 */

import { CodexTheme, CodexThemeConfig } from "./types";

function hsl(h: number, s: number, l: number): string {
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs((2 * l) / 100 - 1)) * (s / 100);
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function makeTheme(
  id: string,
  name: string,
  codeThemeId: string,
  variant: "light" | "dark",
  category: string,
  tags: string[],
  accent: string,
  surface: string,
  ink: string,
  contrast: number,
  diffAdded = "#008000",
  diffRemoved = "#a31515",
  skill = "#0000ff"
): CodexTheme {
  return {
    id,
    name,
    codeThemeId,
    variant,
    category,
    tags,
    theme: {
      accent,
      contrast,
      fonts: { code: null, ui: null },
      ink,
      opaqueWindows: variant === "light",
      semanticColors: { diffAdded, diffRemoved, skill },
      surface,
    },
  };
}

// ── Famous editor / IDE themes ───────────────────────────────────
const editorThemes: CodexTheme[] = [
  makeTheme("dracula", "Dracula", "dracula", "dark", "Editor", ["popular", "purple"], "#bd93f9", "#282a36", "#f8f8f2", 60, "#50fa7b", "#ff5555", "#8be9fd"),
  makeTheme("dracula-soft", "Dracula Soft", "dracula", "dark", "Editor", ["purple", "muted"], "#9580c2", "#2d2f3f", "#e8e8e8", 55, "#50fa7b", "#ff5555", "#8be9fd"),
  makeTheme("monokai", "Monokai", "monokai", "dark", "Editor", ["popular", "warm"], "#f92672", "#272822", "#f8f8f2", 65, "#a6e22e", "#f92672", "#66d9ef"),
  makeTheme("monokai-pro", "Monokai Pro", "monokai", "dark", "Editor", ["warm", "pro"], "#ff6188", "#2d2a2e", "#fcfcfa", 62, "#a9dc76", "#ff6188", "#78dce8"),
  makeTheme("nord", "Nord", "nord", "dark", "Editor", ["popular", "cool", "blue"], "#88c0d0", "#2e3440", "#d8dee9", 55, "#a3be8c", "#bf616a", "#81a1c1"),
  makeTheme("nord-light", "Nord Light", "nord", "light", "Editor", ["cool", "blue"], "#5e81ac", "#eceff4", "#2e3440", 42, "#a3be8c", "#bf616a", "#81a1c1"),
  makeTheme("solarized-dark", "Solarized Dark", "solarized-dark", "dark", "Editor", ["popular", "classic"], "#268bd2", "#002b36", "#839496", 50, "#859900", "#dc322f", "#268bd2"),
  makeTheme("solarized-light", "Solarized Light", "solarized-light", "light", "Editor", ["classic"], "#268bd2", "#fdf6e3", "#657b83", 42, "#859900", "#dc322f", "#268bd2"),
  makeTheme("gruvbox-dark", "Gruvbox Dark", "gruvbox", "dark", "Editor", ["popular", "warm", "retro"], "#d79921", "#282828", "#ebdbb2", 58, "#b8bb26", "#fb4934", "#83a598"),
  makeTheme("gruvbox-light", "Gruvbox Light", "gruvbox", "light", "Editor", ["warm", "retro"], "#d79921", "#fbf1c7", "#3c3836", 40, "#b8bb26", "#9d0006", "#076678"),
  makeTheme("gruvbox-material-dark", "Gruvbox Material Dark", "gruvbox", "dark", "Editor", ["warm", "material"], "#d8a657", "#282828", "#d4be98", 56, "#a9b665", "#ea6962", "#7daea3"),
  makeTheme("gruvbox-material-light", "Gruvbox Material Light", "gruvbox", "light", "Editor", ["warm", "material"], "#d8a657", "#f9f5d7", "#654735", 38, "#a9b665", "#c14a4a", "#45707a"),
  makeTheme("catppuccin-mocha", "Catppuccin Mocha", "catppuccin", "dark", "Editor", ["popular", "pastel"], "#cba6f7", "#1e1e2e", "#cdd6f4", 58, "#a6e3a1", "#f38ba8", "#89b4fa"),
  makeTheme("catppuccin-macchiato", "Catppuccin Macchiato", "catppuccin", "dark", "Editor", ["pastel"], "#c6a0f6", "#24273a", "#cad3f5", 56, "#a6da95", "#ed8796", "#8aadf4"),
  makeTheme("catppuccin-frappe", "Catppuccin Frappé", "catppuccin", "dark", "Editor", ["pastel", "muted"], "#ca9ee6", "#303446", "#c6d0f5", 54, "#a6d189", "#e78284", "#8caaee"),
  makeTheme("catppuccin-latte", "Catppuccin Latte", "catppuccin", "light", "Editor", ["pastel"], "#8839ef", "#eff1f5", "#4c4f69", 40, "#40a02b", "#d20f39", "#1e66f5"),
  makeTheme("one-dark", "One Dark", "one-dark", "dark", "Editor", ["popular", "atom"], "#61afef", "#282c34", "#abb2bf", 60, "#98c379", "#e06c75", "#61afef"),
  makeTheme("one-light", "One Light", "one-light", "light", "Editor", ["atom"], "#4078f2", "#fafafa", "#383a42", 40, "#50a14f", "#e45649", "#4078f2"),
  makeTheme("tokyo-night", "Tokyo Night", "tokyonight", "dark", "Editor", ["popular", "blue", "neon"], "#7aa2f7", "#1a1b26", "#a9b1d6", 58, "#9ece6a", "#f7768e", "#7dcfff"),
  makeTheme("tokyo-night-storm", "Tokyo Night Storm", "tokyonight", "dark", "Editor", ["blue", "neon"], "#7aa2f7", "#24283b", "#a9b1d6", 56, "#9ece6a", "#f7768e", "#7dcfff"),
  makeTheme("tokyo-night-light", "Tokyo Night Light", "tokyonight", "light", "Editor", ["blue"], "#3366cc", "#d5d6db", "#343b58", 42, "#587539", "#8c4351", "#166775"),
  makeTheme("github-dark", "GitHub Dark", "github", "dark", "Editor", ["popular", "neutral"], "#58a6ff", "#0d1117", "#c9d1d9", 58, "#3fb950", "#f85149", "#58a6ff"),
  makeTheme("github-dark-dimmed", "GitHub Dark Dimmed", "github", "dark", "Editor", ["neutral"], "#539bf5", "#22272e", "#adbac7", 52, "#57ab5a", "#e5534b", "#539bf5"),
  makeTheme("github-light", "GitHub Light", "github", "light", "Editor", ["neutral"], "#0969da", "#ffffff", "#24292f", 38, "#1a7f37", "#cf222e", "#0969da"),
  makeTheme("ayu-dark", "Ayu Dark", "ayu", "dark", "Editor", ["warm", "orange"], "#ffb454", "#0a0e14", "#b3b1ad", 62, "#aad94c", "#d95757", "#39bae6"),
  makeTheme("ayu-mirage", "Ayu Mirage", "ayu", "dark", "Editor", ["warm", "purple"], "#ffcc66", "#1f2430", "#cbccc6", 55, "#bae67e", "#ff3333", "#5ccfe6"),
  makeTheme("ayu-light", "Ayu Light", "ayu", "light", "Editor", ["warm", "orange"], "#ff9940", "#fafafa", "#575f66", 40, "#86b300", "#f07171", "#399ee6"),
  makeTheme("everforest-dark", "Everforest Dark", "everforest", "dark", "Editor", ["green", "nature"], "#a7c080", "#2d353b", "#d3c6aa", 52, "#a7c080", "#e67e80", "#7fbbb3"),
  makeTheme("everforest-light", "Everforest Light", "everforest", "light", "Editor", ["green", "nature"], "#8da101", "#fdf6e3", "#5c6a72", 40, "#8da101", "#f85552", "#3a94c5"),
  makeTheme("rose-pine", "Rosé Pine", "rose-pine", "dark", "Editor", ["popular", "pink", "cozy"], "#c4a7e7", "#191724", "#e0def4", 55, "#9ccfd8", "#eb6f92", "#c4a7e7"),
  makeTheme("rose-pine-moon", "Rosé Pine Moon", "rose-pine", "dark", "Editor", ["pink", "cozy"], "#c4a7e7", "#232136", "#e0def4", 53, "#9ccfd8", "#eb6f92", "#c4a7e7"),
  makeTheme("rose-pine-dawn", "Rosé Pine Dawn", "rose-pine", "light", "Editor", ["pink", "cozy"], "#907aa9", "#faf4ed", "#575279", 40, "#56949f", "#b4637a", "#907aa9"),
  makeTheme("kanagawa", "Kanagawa", "kanagawa", "dark", "Editor", ["japanese", "warm"], "#dca561", "#1f1f28", "#dcd7ba", 58, "#76946a", "#c34043", "#7e9cd8"),
  makeTheme("kanagawa-wave", "Kanagawa Wave", "kanagawa", "dark", "Editor", ["japanese"], "#dca561", "#1f1f28", "#dcd7ba", 56, "#76946a", "#c34043", "#7fb4ca"),
  makeTheme("kanagawa-dragon", "Kanagawa Dragon", "kanagawa", "dark", "Editor", ["japanese", "muted"], "#c8b060", "#181616", "#c5c9c5", 60, "#87a987", "#c4746e", "#8ba4b0"),
  makeTheme("kanagawa-lotus", "Kanagawa Lotus", "kanagawa", "light", "Editor", ["japanese"], "#c9a554", "#f2ecbc", "#545464", 40, "#6f894e", "#d7474b", "#4d699b"),
  makeTheme("material-dark", "Material Dark", "material", "dark", "Editor", ["material", "popular"], "#82aaff", "#212121", "#eeffff", 60, "#c3e88d", "#f07178", "#82aaff"),
  makeTheme("material-ocean", "Material Ocean", "material", "dark", "Editor", ["material", "blue"], "#82aaff", "#0f111a", "#8f93a2", 62, "#c3e88d", "#f07178", "#82aaff"),
  makeTheme("material-palenight", "Material Palenight", "material", "dark", "Editor", ["material", "purple"], "#82aaff", "#292d3e", "#a6accd", 55, "#c3e88d", "#f07178", "#82aaff"),
  makeTheme("material-lighter", "Material Lighter", "material", "light", "Editor", ["material"], "#6182b8", "#fafafa", "#546e7a", 38, "#91b859", "#e53935", "#6182b8"),
  makeTheme("night-owl", "Night Owl", "night-owl", "dark", "Editor", ["popular", "blue"], "#7fdbca", "#011627", "#d6deeb", 60, "#addb67", "#ef5350", "#82aaff"),
  makeTheme("light-owl", "Light Owl", "night-owl", "light", "Editor", ["blue"], "#2aa298", "#fbfbfb", "#403f53", 38, "#2aa298", "#de3d3b", "#4876d6"),
  makeTheme("vitesse-dark", "Vitesse Dark", "vitesse", "dark", "Editor", ["green", "minimal"], "#4d9375", "#121212", "#dbd7ca", 58, "#4d9375", "#cb7676", "#6394bf"),
  makeTheme("vitesse-light", "Vitesse Light", "vitesse", "light", "Editor", ["green", "minimal"], "#1a6c37", "#ffffff", "#393a34", 38, "#1a6c37", "#ab5959", "#296aa3"),
  makeTheme("poimandres", "Poimandres", "poimandres", "dark", "Editor", ["blue", "minimal"], "#add7ff", "#1b1e28", "#a6accd", 55, "#5de4c7", "#d0679d", "#add7ff"),
  makeTheme("moonlight", "Moonlight", "moonlight", "dark", "Editor", ["blue", "purple"], "#82aaff", "#222436", "#c8d3f5", 56, "#c3e88d", "#ff757f", "#82aaff"),
  makeTheme("synthwave-84", "Synthwave '84", "synthwave", "dark", "Editor", ["neon", "retro", "synthwave"], "#ff7edb", "#262335", "#ffffff", 65, "#72f1b8", "#fe4450", "#36f9f6"),
  makeTheme("cyberpunk", "Cyberpunk", "synthwave", "dark", "Editor", ["neon", "retro"], "#ff00ff", "#0d0221", "#00ff9f", 70, "#00ff00", "#ff0055", "#00ffff"),
  makeTheme("shades-of-purple", "Shades of Purple", "shades-of-purple", "dark", "Editor", ["purple", "vibrant"], "#fad000", "#2d2b55", "#e0def4", 60, "#a5ff90", "#ec3a37", "#9effff"),
  makeTheme("slack-ochin", "Slack Ochin", "slack", "dark", "Editor", ["neutral", "corporate"], "#4a9ade", "#232528", "#e1e1e1", 55, "#4ec28a", "#e26060", "#4a9ade"),
  makeTheme("palenight", "Palenight", "palenight", "dark", "Editor", ["purple", "material"], "#82aaff", "#292d3e", "#bfc7d5", 55, "#c3e88d", "#f07178", "#82aaff"),
  makeTheme("cobalt2", "Cobalt2", "cobalt2", "dark", "Editor", ["blue", "classic"], "#ffc600", "#193549", "#e1efff", 62, "#a5ff90", "#ff628c", "#80fcff"),
  makeTheme("horizon", "Horizon", "horizon", "dark", "Editor", ["warm", "sunset"], "#e95678", "#1c1e26", "#d5d8da", 58, "#09f7a0", "#e95678", "#25b0bc"),
  makeTheme("winter-is-coming-dark", "Winter is Coming", "winter", "dark", "Editor", ["blue", "cool"], "#89ddff", "#011627", "#d6deeb", 58, "#c3e88d", "#ef5350", "#89ddff"),
  makeTheme("andromeda", "Andromeda", "andromeda", "dark", "Editor", ["space", "purple"], "#ee5d43", "#23262e", "#d5ced9", 58, "#96e072", "#ee5d43", "#7cb7ff"),
  makeTheme("darcula", "Darcula", "darcula", "dark", "Editor", ["jetbrains", "classic"], "#6897bb", "#2b2b2b", "#a9b7c6", 55, "#629755", "#cc7832", "#6897bb"),
  makeTheme("intellij-light", "IntelliJ Light", "intellij", "light", "Editor", ["jetbrains", "classic"], "#0070c0", "#ffffff", "#000000", 38, "#007f00", "#a31515", "#0070c0"),
  makeTheme("sublime-monokai", "Sublime Monokai", "monokai", "dark", "Editor", ["classic", "warm"], "#a6e22e", "#272822", "#f8f8f2", 62, "#a6e22e", "#f92672", "#66d9ef"),
  makeTheme("vim-dark", "Vim Dark", "vim", "dark", "Editor", ["classic", "terminal"], "#87ceeb", "#000000", "#ffffff", 65, "#00ff00", "#ff0000", "#87ceeb"),
  makeTheme("emacs-dark", "Emacs Dark", "emacs", "dark", "Editor", ["classic", "terminal"], "#96cbfe", "#000000", "#f6f3e8", 62, "#a8ff60", "#ff6c60", "#96cbfe"),
  makeTheme("xcode-dark", "Xcode Dark", "xcode", "dark", "Editor", ["apple", "classic"], "#fc5fa3", "#1f1f24", "#dfdfe0", 58, "#67b7a4", "#ff8170", "#6c99ff"),
  makeTheme("xcode-light", "Xcode Light", "xcode", "light", "Editor", ["apple", "classic"], "#9b2393", "#ffffff", "#262626", 38, "#326d74", "#d12f1b", "#2f5dab"),
  makeTheme("fleet-dark", "Fleet Dark", "fleet", "dark", "Editor", ["jetbrains", "modern"], "#87c3ff", "#181818", "#bcbec4", 58, "#6aab73", "#f75464", "#87c3ff"),
  makeTheme("zed-dark", "Zed Dark", "zed", "dark", "Editor", ["modern", "rust"], "#0d9de5", "#1e2024", "#c8c8c8", 55, "#8dbd6c", "#f06a67", "#0d9de5"),
  makeTheme("zed-light", "Zed Light", "zed", "light", "Editor", ["modern", "rust"], "#0969da", "#f2f2f2", "#3b3b3b", 40, "#2da44e", "#cf222e", "#0969da"),
  makeTheme("helix-dark", "Helix Dark", "helix", "dark", "Editor", ["terminal", "modern"], "#a6adc8", "#1e1e2e", "#cdd6f4", 55, "#a6e3a1", "#f38ba8", "#89b4fa"),
  makeTheme("lapce", "Lapce", "lapce", "dark", "Editor", ["modern", "rust"], "#569cd6", "#1e1e1e", "#d4d4d4", 55, "#6a9955", "#f44747", "#569cd6"),
  makeTheme("windsurf", "Windsurf", "windsurf", "dark", "Editor", ["ai", "blue"], "#48b9ff", "#111827", "#e5e7eb", 58, "#34d399", "#f87171", "#48b9ff"),
  makeTheme("cursor", "Cursor", "cursor", "dark", "Editor", ["ai", "popular"], "#22d3ee", "#111111", "#e5e5e5", 60, "#34d399", "#ef4444", "#22d3ee"),
  makeTheme("cursor-light", "Cursor Light", "cursor", "light", "Editor", ["ai", "popular"], "#0891b2", "#ffffff", "#1a1a1a", 38, "#059669", "#dc2626", "#0891b2"),
  makeTheme("nova", "Nova", "nova", "dark", "Editor", ["cool", "teal"], "#7fc1ca", "#3c4c55", "#c5d4dd", 50, "#a8ce93", "#df8c8c", "#6a9fb5"),
  makeTheme("paper-color", "PaperColor", "papercolor", "light", "Editor", ["classic", "clean"], "#5f8700", "#eeeeee", "#444444", 38, "#5f8700", "#af0000", "#0087af"),
  makeTheme("iceberg-dark", "Iceberg Dark", "iceberg", "dark", "Editor", ["cool", "blue"], "#84a0c6", "#161821", "#c6c8d1", 52, "#b4be82", "#e27878", "#84a0c6"),
  makeTheme("iceberg-light", "Iceberg Light", "iceberg", "light", "Editor", ["cool", "blue"], "#2d539e", "#e8e9ec", "#33374c", 40, "#668e3d", "#cc517a", "#2d539e"),
  makeTheme("modus-vivendi", "Modus Vivendi", "modus", "dark", "Editor", ["accessibility", "emacs"], "#2fafff", "#000000", "#ffffff", 70, "#44bc44", "#ff5f59", "#2fafff"),
  makeTheme("modus-operandi", "Modus Operandi", "modus", "light", "Editor", ["accessibility", "emacs"], "#0031a9", "#ffffff", "#000000", 70, "#006800", "#a60000", "#0031a9"),
  makeTheme("zenburn", "Zenburn", "zenburn", "dark", "Editor", ["low-contrast", "warm"], "#f0dfaf", "#3f3f3f", "#dcdccc", 45, "#7f9f7f", "#cc9393", "#8cd0d3"),
  makeTheme("spacemacs-dark", "Spacemacs Dark", "spacemacs", "dark", "Editor", ["emacs", "purple"], "#b2b2b2", "#292b2e", "#b2b2b2", 52, "#67b11d", "#f2241f", "#4f97d7"),
  makeTheme("spacemacs-light", "Spacemacs Light", "spacemacs", "light", "Editor", ["emacs", "purple"], "#655370", "#fbf8ef", "#655370", 40, "#67b11d", "#f2241f", "#4f97d7"),
];

// ── Brand-inspired themes ────────────────────────────────────────
const brandThemes: CodexTheme[] = [
  makeTheme("notion", "Notion", "notion", "light", "Brand", ["popular", "clean", "productivity"], "#3183d8", "#ffffff", "#37352f", 45, "#008000", "#a31515", "#0000ff"),
  makeTheme("notion-dark", "Notion Dark", "notion", "dark", "Brand", ["clean", "productivity"], "#529cca", "#191919", "#e3e2e0", 58, "#4dab9a", "#c4554d", "#529cca"),
  makeTheme("linear", "Linear", "linear", "dark", "Brand", ["popular", "purple", "corporate"], "#5e6ad2", "#1a1a2e", "#e8e8f0", 60, "#4da672", "#d94848", "#5e6ad2"),
  makeTheme("linear-light", "Linear Light", "linear", "light", "Brand", ["purple", "corporate"], "#5e6ad2", "#f9f9fb", "#222326", 40, "#4da672", "#d94848", "#5e6ad2"),
  makeTheme("vercel", "Vercel", "vercel", "dark", "Brand", ["popular", "minimal", "monochrome"], "#ffffff", "#000000", "#ededed", 70, "#50e3c2", "#ee0000", "#0070f3"),
  makeTheme("vercel-light", "Vercel Light", "vercel", "light", "Brand", ["minimal", "monochrome"], "#000000", "#ffffff", "#111111", 40, "#0070f3", "#ee0000", "#0070f3"),
  makeTheme("stripe", "Stripe", "stripe", "light", "Brand", ["corporate", "clean"], "#635bff", "#ffffff", "#425466", 42, "#30b864", "#df1b41", "#635bff"),
  makeTheme("stripe-dark", "Stripe Dark", "stripe", "dark", "Brand", ["corporate", "clean"], "#635bff", "#0a2540", "#c1c9d2", 58, "#30b864", "#df1b41", "#635bff"),
  makeTheme("figma", "Figma", "figma", "light", "Brand", ["design", "clean"], "#a259ff", "#ffffff", "#333333", 40, "#14ae5c", "#f24e1e", "#a259ff"),
  makeTheme("figma-dark", "Figma Dark", "figma", "dark", "Brand", ["design", "clean"], "#a259ff", "#2c2c2c", "#e5e5e5", 58, "#14ae5c", "#f24e1e", "#a259ff"),
  makeTheme("slack", "Slack", "slack", "light", "Brand", ["corporate", "purple"], "#611f69", "#ffffff", "#1d1c1d", 42, "#2bac76", "#e01e5a", "#36c5f0"),
  makeTheme("discord", "Discord", "discord", "dark", "Brand", ["gaming", "popular"], "#5865f2", "#313338", "#dbdee1", 58, "#57f287", "#ed4245", "#5865f2"),
  makeTheme("spotify", "Spotify", "spotify", "dark", "Brand", ["music", "green"], "#1db954", "#121212", "#ffffff", 62, "#1db954", "#f15e6c", "#509bf5"),
  makeTheme("twitter-x", "X (Twitter)", "twitter", "dark", "Brand", ["social", "minimal"], "#1d9bf0", "#000000", "#e7e9ea", 65, "#00ba7c", "#f4212e", "#1d9bf0"),
  makeTheme("obsidian", "Obsidian", "obsidian", "dark", "Brand", ["notes", "purple"], "#7c3aed", "#1e1e1e", "#dcddde", 58, "#4ade80", "#ef4444", "#7c3aed"),
  makeTheme("arc", "Arc Browser", "arc", "light", "Brand", ["browser", "playful"], "#5856d6", "#f5f0ec", "#222222", 42, "#34c759", "#ff3b30", "#5856d6"),
  makeTheme("tailwind", "Tailwind", "tailwind", "dark", "Brand", ["css", "blue"], "#38bdf8", "#0f172a", "#e2e8f0", 58, "#4ade80", "#f43f5e", "#38bdf8"),
  makeTheme("supabase", "Supabase", "supabase", "dark", "Brand", ["database", "green"], "#3ecf8e", "#1c1c1c", "#ededed", 60, "#3ecf8e", "#f56565", "#6366f1"),
  makeTheme("prisma", "Prisma", "prisma", "dark", "Brand", ["database", "teal"], "#2d3748", "#1a202c", "#e2e8f0", 55, "#48bb78", "#fc8181", "#63b3ed"),
  makeTheme("openai", "OpenAI", "openai", "dark", "Brand", ["ai", "minimal"], "#10a37f", "#0d0d0d", "#ececec", 62, "#10a37f", "#ef4146", "#5a9cf5"),
  makeTheme("openai-light", "OpenAI Light", "openai", "light", "Brand", ["ai", "minimal"], "#10a37f", "#ffffff", "#202123", 40, "#10a37f", "#ef4146", "#5a9cf5"),
  makeTheme("anthropic", "Anthropic", "anthropic", "light", "Brand", ["ai", "warm"], "#cc785c", "#f8f0e8", "#2a1f1a", 42, "#5e9e6d", "#c0392b", "#2980b9"),
  makeTheme("raycast", "Raycast", "raycast", "dark", "Brand", ["productivity", "clean"], "#ff6363", "#1a1a1a", "#eeeeee", 60, "#30d158", "#ff453a", "#ff6363"),
  makeTheme("warp", "Warp", "warp", "dark", "Brand", ["terminal", "modern"], "#01a4ef", "#14161a", "#e5e7eb", 58, "#0be881", "#ff3838", "#01a4ef"),
  makeTheme("vscode-dark", "VS Code Dark+", "vscode", "dark", "Editor", ["popular", "classic"], "#569cd6", "#1e1e1e", "#d4d4d4", 58, "#6a9955", "#f44747", "#569cd6"),
  makeTheme("vscode-light", "VS Code Light+", "vscode", "light", "Editor", ["classic"], "#0070c1", "#ffffff", "#000000", 38, "#098658", "#cd3131", "#0070c1"),
];

// ── Color Family Generators ──────────────────────────────────────
function generateColorFamilyThemes(): CodexTheme[] {
  const families: { name: string; hue: number; category: string }[] = [
    { name: "Ruby", hue: 350, category: "Red" },
    { name: "Crimson", hue: 348, category: "Red" },
    { name: "Scarlet", hue: 4, category: "Red" },
    { name: "Rose", hue: 340, category: "Red" },
    { name: "Cherry", hue: 355, category: "Red" },
    { name: "Burgundy", hue: 345, category: "Red" },
    { name: "Coral", hue: 16, category: "Red" },
    { name: "Vermillion", hue: 8, category: "Red" },
    { name: "Garnet", hue: 0, category: "Red" },
    { name: "Maroon", hue: 338, category: "Red" },

    { name: "Tangerine", hue: 30, category: "Orange" },
    { name: "Amber", hue: 38, category: "Orange" },
    { name: "Apricot", hue: 24, category: "Orange" },
    { name: "Peach", hue: 20, category: "Orange" },
    { name: "Rust", hue: 15, category: "Orange" },
    { name: "Copper", hue: 25, category: "Orange" },
    { name: "Sienna", hue: 18, category: "Orange" },
    { name: "Terracotta", hue: 12, category: "Orange" },
    { name: "Pumpkin", hue: 28, category: "Orange" },
    { name: "Marigold", hue: 35, category: "Orange" },

    { name: "Sunflower", hue: 48, category: "Yellow" },
    { name: "Honey", hue: 42, category: "Yellow" },
    { name: "Gold", hue: 45, category: "Yellow" },
    { name: "Lemon", hue: 54, category: "Yellow" },
    { name: "Canary", hue: 56, category: "Yellow" },
    { name: "Saffron", hue: 40, category: "Yellow" },
    { name: "Butter", hue: 50, category: "Yellow" },
    { name: "Champagne", hue: 46, category: "Yellow" },

    { name: "Emerald", hue: 145, category: "Green" },
    { name: "Forest", hue: 130, category: "Green" },
    { name: "Sage", hue: 135, category: "Green" },
    { name: "Mint", hue: 155, category: "Green" },
    { name: "Lime", hue: 90, category: "Green" },
    { name: "Jade", hue: 160, category: "Green" },
    { name: "Olive", hue: 80, category: "Green" },
    { name: "Pine", hue: 150, category: "Green" },
    { name: "Fern", hue: 115, category: "Green" },
    { name: "Pistachio", hue: 100, category: "Green" },
    { name: "Moss", hue: 120, category: "Green" },
    { name: "Juniper", hue: 170, category: "Green" },

    { name: "Teal", hue: 175, category: "Cyan" },
    { name: "Turquoise", hue: 180, category: "Cyan" },
    { name: "Aqua", hue: 185, category: "Cyan" },
    { name: "Cyan", hue: 190, category: "Cyan" },
    { name: "Azure", hue: 195, category: "Cyan" },
    { name: "Seafoam", hue: 168, category: "Cyan" },
    { name: "Lagoon", hue: 188, category: "Cyan" },
    { name: "Arctic", hue: 192, category: "Cyan" },

    { name: "Cobalt", hue: 215, category: "Blue" },
    { name: "Navy", hue: 230, category: "Blue" },
    { name: "Royal", hue: 225, category: "Blue" },
    { name: "Sapphire", hue: 220, category: "Blue" },
    { name: "Steel", hue: 210, category: "Blue" },
    { name: "Cerulean", hue: 200, category: "Blue" },
    { name: "Indigo", hue: 240, category: "Blue" },
    { name: "Denim", hue: 218, category: "Blue" },
    { name: "Ocean", hue: 205, category: "Blue" },
    { name: "Periwinkle", hue: 235, category: "Blue" },
    { name: "Ice", hue: 198, category: "Blue" },
    { name: "Powder", hue: 202, category: "Blue" },

    { name: "Violet", hue: 270, category: "Purple" },
    { name: "Amethyst", hue: 280, category: "Purple" },
    { name: "Lavender", hue: 265, category: "Purple" },
    { name: "Orchid", hue: 290, category: "Purple" },
    { name: "Plum", hue: 295, category: "Purple" },
    { name: "Grape", hue: 275, category: "Purple" },
    { name: "Iris", hue: 260, category: "Purple" },
    { name: "Lilac", hue: 285, category: "Purple" },
    { name: "Mauve", hue: 300, category: "Purple" },
    { name: "Wisteria", hue: 255, category: "Purple" },

    { name: "Magenta", hue: 315, category: "Pink" },
    { name: "Fuchsia", hue: 320, category: "Pink" },
    { name: "Blush", hue: 340, category: "Pink" },
    { name: "Salmon", hue: 10, category: "Pink" },
    { name: "Flamingo", hue: 330, category: "Pink" },
    { name: "Bubblegum", hue: 325, category: "Pink" },
    { name: "Hot Pink", hue: 335, category: "Pink" },
    { name: "Cerise", hue: 345, category: "Pink" },
  ];

  const themes: CodexTheme[] = [];

  for (const f of families) {
    const id = f.name.toLowerCase().replace(/\s+/g, "-");
    themes.push(
      makeTheme(
        `${id}-dark`, `${f.name} Dark`, id, "dark", f.category,
        ["color-family", f.category.toLowerCase()],
        hsl(f.hue, 70, 60), hsl(f.hue, 15, 12), hsl(f.hue, 10, 88), 58,
        hsl((f.hue + 120) % 360, 50, 45), hsl((f.hue + 180) % 360, 60, 50),
        hsl((f.hue + 60) % 360, 55, 55)
      ),
      makeTheme(
        `${id}-light`, `${f.name} Light`, id, "light", f.category,
        ["color-family", f.category.toLowerCase()],
        hsl(f.hue, 75, 45), hsl(f.hue, 15, 97), hsl(f.hue, 20, 18), 40,
        hsl((f.hue + 120) % 360, 50, 35), hsl((f.hue + 180) % 360, 60, 40),
        hsl((f.hue + 60) % 360, 55, 40)
      ),
      makeTheme(
        `${id}-deep`, `${f.name} Deep`, id, "dark", f.category,
        ["color-family", "deep", f.category.toLowerCase()],
        hsl(f.hue, 85, 55), hsl(f.hue, 30, 8), hsl(f.hue, 8, 80), 65,
        hsl((f.hue + 120) % 360, 55, 50), hsl((f.hue + 180) % 360, 65, 45),
        hsl((f.hue + 60) % 360, 60, 50)
      ),
      makeTheme(
        `${id}-muted`, `${f.name} Muted`, id, "dark", f.category,
        ["color-family", "muted", f.category.toLowerCase()],
        hsl(f.hue, 35, 55), hsl(f.hue, 8, 16), hsl(f.hue, 6, 75), 48,
        hsl((f.hue + 120) % 360, 30, 45), hsl((f.hue + 180) % 360, 35, 45),
        hsl((f.hue + 60) % 360, 30, 50)
      ),
      makeTheme(
        `${id}-pastel`, `${f.name} Pastel`, id, "light", f.category,
        ["color-family", "pastel", f.category.toLowerCase()],
        hsl(f.hue, 55, 55), hsl(f.hue, 30, 95), hsl(f.hue, 25, 25), 38,
        hsl((f.hue + 120) % 360, 40, 40), hsl((f.hue + 180) % 360, 45, 40),
        hsl((f.hue + 60) % 360, 40, 45)
      )
    );
  }
  return themes;
}

// ── Monochrome & neutral themes ──────────────────────────────────
function generateNeutralThemes(): CodexTheme[] {
  const neutrals = [
    { name: "Graphite", s: 5, warmth: 0 },
    { name: "Charcoal", s: 3, warmth: 0 },
    { name: "Slate", s: 8, warmth: 215 },
    { name: "Stone", s: 6, warmth: 30 },
    { name: "Zinc", s: 4, warmth: 240 },
    { name: "Iron", s: 3, warmth: 210 },
    { name: "Silver", s: 5, warmth: 0 },
    { name: "Ash", s: 4, warmth: 20 },
    { name: "Smoke", s: 6, warmth: 210 },
    { name: "Fog", s: 5, warmth: 200 },
    { name: "Concrete", s: 3, warmth: 30 },
    { name: "Pewter", s: 5, warmth: 180 },
    { name: "Lead", s: 4, warmth: 220 },
    { name: "Obsidian Mono", s: 2, warmth: 0 },
    { name: "Onyx", s: 3, warmth: 240 },
  ];

  const themes: CodexTheme[] = [];
  const accents = [210, 180, 340, 35, 260, 150, 0, 45, 290, 120, 200, 170, 330, 55, 250];

  neutrals.forEach((n, i) => {
    const id = n.name.toLowerCase().replace(/\s+/g, "-");
    const ah = accents[i % accents.length];
    themes.push(
      makeTheme(
        `${id}-dark`, `${n.name} Dark`, id, "dark", "Neutral",
        ["neutral", "monochrome"],
        hsl(ah, 50, 60), hsl(n.warmth, n.s, 10), hsl(n.warmth, n.s, 85), 58,
        hsl(140, 40, 45), hsl(0, 50, 50), hsl(ah, 50, 60)
      ),
      makeTheme(
        `${id}-light`, `${n.name} Light`, id, "light", "Neutral",
        ["neutral", "monochrome"],
        hsl(ah, 55, 42), hsl(n.warmth, n.s + 5, 97), hsl(n.warmth, n.s, 15), 40,
        hsl(140, 40, 35), hsl(0, 50, 42), hsl(ah, 55, 42)
      )
    );
  });
  return themes;
}

// ── Nature / Seasonal themes ─────────────────────────────────────
const seasonalThemes: CodexTheme[] = [
  makeTheme("aurora-borealis", "Aurora Borealis", "aurora", "dark", "Nature", ["nature", "cold", "vibrant"], "#00ffaa", "#0a0f1a", "#d0f0e0", 60, "#00ff88", "#ff4466", "#00ccff"),
  makeTheme("autumn-harvest", "Autumn Harvest", "autumn", "dark", "Nature", ["nature", "warm", "fall"], "#d4770b", "#1a1008", "#e8d5b0", 55, "#8b9a2b", "#c44d2e", "#d4770b"),
  makeTheme("spring-bloom", "Spring Bloom", "spring", "light", "Nature", ["nature", "fresh", "spring"], "#e8569a", "#fef6f0", "#3a2d2d", 40, "#4caf50", "#e8569a", "#5c8db5"),
  makeTheme("summer-sun", "Summer Sun", "summer", "light", "Nature", ["nature", "warm", "summer"], "#f5a623", "#fffcf2", "#3d3019", 42, "#7cb342", "#d32f2f", "#1976d2"),
  makeTheme("winter-frost", "Winter Frost", "winter", "dark", "Nature", ["nature", "cold", "winter"], "#a0d2db", "#0d1b2a", "#c8dce0", 52, "#8ec07c", "#cc6666", "#a0d2db"),
  makeTheme("midnight-forest", "Midnight Forest", "forest", "dark", "Nature", ["nature", "green", "deep"], "#3d9970", "#0a120a", "#b0ccb0", 58, "#3d9970", "#c0392b", "#2980b9"),
  makeTheme("desert-sand", "Desert Sand", "desert", "light", "Nature", ["nature", "warm", "earth"], "#c2785c", "#faf0e4", "#5a3e2b", 42, "#8d9440", "#c0392b", "#c2785c"),
  makeTheme("ocean-depth", "Ocean Depth", "ocean", "dark", "Nature", ["nature", "blue", "deep"], "#1abc9c", "#0a1628", "#a0c4d8", 58, "#1abc9c", "#e74c3c", "#3498db"),
  makeTheme("volcanic", "Volcanic", "volcanic", "dark", "Nature", ["nature", "warm", "dramatic"], "#ff4500", "#1a0a00", "#e0c8b0", 65, "#cc7722", "#ff2200", "#ff6600"),
  makeTheme("cherry-blossom", "Cherry Blossom", "sakura", "light", "Nature", ["nature", "pink", "japanese"], "#d4619c", "#fdf0f5", "#4a2838", 38, "#5ea87e", "#d4619c", "#7e6eaa"),
  makeTheme("rainforest", "Rainforest", "rainforest", "dark", "Nature", ["nature", "green", "lush"], "#2ecc71", "#0a1a0a", "#b8d8b0", 58, "#2ecc71", "#e74c3c", "#3498db"),
  makeTheme("arctic-ice", "Arctic Ice", "arctic", "light", "Nature", ["nature", "cold", "blue"], "#4fc3f7", "#f0f8ff", "#1a3a4a", 38, "#4caf50", "#ef5350", "#4fc3f7"),
  makeTheme("dusk", "Dusk", "dusk", "dark", "Nature", ["nature", "sunset", "warm"], "#e06070", "#1a1028", "#d0b8c8", 55, "#7eb87e", "#e06070", "#8080c0"),
  makeTheme("dawn", "Dawn", "dawn", "light", "Nature", ["nature", "sunrise", "warm"], "#e87040", "#fef8f0", "#3a2820", 40, "#5ea050", "#e87040", "#5088b0"),
  makeTheme("storm", "Storm", "storm", "dark", "Nature", ["nature", "dramatic", "dark"], "#7090b0", "#0a0e14", "#90a0b0", 62, "#5080a0", "#c05050", "#7090b0"),
  makeTheme("glacier", "Glacier", "glacier", "light", "Nature", ["nature", "cold", "blue"], "#0097a7", "#f0f9fa", "#1a3d45", 40, "#43a047", "#e53935", "#0097a7"),
  makeTheme("meadow", "Meadow", "meadow", "light", "Nature", ["nature", "green", "fresh"], "#66bb6a", "#f0f8f0", "#2a3a2a", 38, "#66bb6a", "#ef5350", "#42a5f5"),
  makeTheme("nebula", "Nebula", "nebula", "dark", "Nature", ["space", "purple", "cosmic"], "#9c27b0", "#0a0014", "#d0b0e0", 60, "#7e57c2", "#e91e63", "#7c4dff"),
  makeTheme("cosmos", "Cosmos", "cosmos", "dark", "Nature", ["space", "deep", "cosmic"], "#651fff", "#050010", "#b0a0d0", 65, "#00e676", "#ff1744", "#651fff"),
  makeTheme("starlight", "Starlight", "starlight", "dark", "Nature", ["space", "cold"], "#b0c4de", "#0a0a1a", "#c0c8d8", 52, "#90c090", "#d07070", "#b0c4de"),
];

// ── Mood / Aesthetic themes ──────────────────────────────────────
const moodThemes: CodexTheme[] = [
  makeTheme("zen", "Zen", "zen", "light", "Mood", ["minimal", "calm", "japanese"], "#708090", "#f8f8f0", "#3a3a3a", 35, "#6b8e6b", "#a05050", "#708090"),
  makeTheme("noir", "Noir", "noir", "dark", "Mood", ["dark", "dramatic", "cinema"], "#d4d4d4", "#0a0a0a", "#d0d0d0", 68, "#808080", "#cc0000", "#d4d4d4"),
  makeTheme("retro-terminal", "Retro Terminal", "retro", "dark", "Mood", ["retro", "terminal", "green"], "#00ff00", "#0a0a0a", "#00ff00", 70, "#00ff00", "#ff0000", "#00ffff"),
  makeTheme("paper", "Paper", "paper", "light", "Mood", ["minimal", "clean", "warm"], "#5c5c5c", "#f5f0e8", "#2c2c2c", 35, "#4a7c59", "#a05050", "#5c6c8c"),
  makeTheme("ink", "Ink", "ink", "light", "Mood", ["minimal", "clean", "cool"], "#3a3a5c", "#f0f0f8", "#1a1a2c", 38, "#3a6c3a", "#8c3a3a", "#3a3a5c"),
  makeTheme("midnight", "Midnight", "midnight", "dark", "Mood", ["dark", "deep", "blue"], "#4488cc", "#080810", "#a0b0c8", 62, "#4488aa", "#cc4444", "#4488cc"),
  makeTheme("sepia", "Sepia", "sepia", "light", "Mood", ["warm", "vintage", "classic"], "#8b7355", "#f5eedc", "#3c3222", 40, "#6b8e4e", "#a0522d", "#8b7355"),
  makeTheme("neon-city", "Neon City", "neon", "dark", "Mood", ["neon", "cyberpunk", "vibrant"], "#ff00ff", "#0a0020", "#e0d0ff", 68, "#00ff88", "#ff0044", "#00ffff"),
  makeTheme("lo-fi", "Lo-Fi", "lofi", "dark", "Mood", ["chill", "muted", "cozy"], "#c8a882", "#1a1614", "#c8c0b4", 48, "#8caa6c", "#c07060", "#7090a0"),
  makeTheme("vaporwave", "Vaporwave", "vaporwave", "dark", "Mood", ["retro", "aesthetic", "pink"], "#ff71ce", "#0a001a", "#e0c0ff", 60, "#00ff9f", "#ff6b6b", "#01cdfe"),
  makeTheme("brutalist", "Brutalist", "brutalist", "light", "Mood", ["bold", "raw", "industrial"], "#000000", "#f0f0f0", "#000000", 50, "#006400", "#8b0000", "#000080"),
  makeTheme("hacker", "Hacker", "hacker", "dark", "Mood", ["terminal", "green", "matrix"], "#33ff33", "#000800", "#33ff33", 72, "#33ff33", "#ff3333", "#33ff33"),
  makeTheme("cozy-cabin", "Cozy Cabin", "cozy", "dark", "Mood", ["warm", "cozy", "brown"], "#c49a6c", "#1a1410", "#d8c8b0", 50, "#7b9b5a", "#c07050", "#8090a0"),
  makeTheme("pastel-dream", "Pastel Dream", "pastel", "light", "Mood", ["soft", "pastel", "dreamy"], "#b39ddb", "#faf0ff", "#4a3a5a", 35, "#81c784", "#e57373", "#64b5f6"),
  makeTheme("high-contrast", "High Contrast", "high-contrast", "dark", "Mood", ["accessibility", "bold"], "#ffffff", "#000000", "#ffffff", 80, "#00ff00", "#ff0000", "#ffff00"),
  makeTheme("high-contrast-light", "High Contrast Light", "high-contrast", "light", "Mood", ["accessibility", "bold"], "#000000", "#ffffff", "#000000", 80, "#006400", "#8b0000", "#00008b"),
  makeTheme("soft-dark", "Soft Dark", "soft", "dark", "Mood", ["gentle", "easy-on-eyes"], "#9ab0c8", "#1c1e22", "#c0c8d0", 48, "#7cb07c", "#c88080", "#8090c0"),
  makeTheme("warm-dark", "Warm Dark", "warm", "dark", "Mood", ["warm", "cozy", "brown"], "#d4a06a", "#1a1410", "#d8ccb8", 52, "#8ca070", "#c87060", "#a09060"),
  makeTheme("cool-dark", "Cool Dark", "cool", "dark", "Mood", ["cool", "blue", "calm"], "#6888b0", "#0e1218", "#b0c0d0", 55, "#68a080", "#c07080", "#6888b0"),
  makeTheme("nordic-winter", "Nordic Winter", "nordic", "dark", "Mood", ["cold", "scandinavian", "minimal"], "#88b0c8", "#161c24", "#c8d0d8", 50, "#80a888", "#b87070", "#88b0c8"),
  makeTheme("bauhaus", "Bauhaus", "bauhaus", "light", "Mood", ["design", "geometric", "bold"], "#1a1a1a", "#f5f0e0", "#1a1a1a", 45, "#2d5a27", "#c0392b", "#2980b9"),
  makeTheme("art-deco", "Art Deco", "artdeco", "dark", "Mood", ["luxury", "gold", "vintage"], "#d4af37", "#1a1a1a", "#d4c8a0", 60, "#228b22", "#cc0000", "#d4af37"),
];

// ── Accessibility-focused ────────────────────────────────────────
const accessibilityThemes: CodexTheme[] = [
  makeTheme("accessible-dark", "Accessible Dark", "accessible", "dark", "Accessibility", ["a11y", "wcag"], "#48b9ff", "#1a1a2e", "#f0f0f0", 65, "#00c853", "#ff5252", "#448aff"),
  makeTheme("accessible-light", "Accessible Light", "accessible", "light", "Accessibility", ["a11y", "wcag"], "#0050b3", "#ffffff", "#1a1a1a", 50, "#1b5e20", "#b71c1c", "#0d47a1"),
  makeTheme("dyslexia-friendly", "Dyslexia Friendly", "dyslexia", "light", "Accessibility", ["a11y", "readability"], "#1565c0", "#faf8ef", "#333333", 42, "#2e7d32", "#c62828", "#1565c0"),
  makeTheme("low-blue-dark", "Low Blue Dark", "lowblue", "dark", "Accessibility", ["a11y", "eye-care", "night"], "#d4a06a", "#1a1612", "#d8ccb0", 48, "#8c9a60", "#c87060", "#b0906a"),
  makeTheme("protanopia", "Protanopia Friendly", "colorblind", "dark", "Accessibility", ["a11y", "colorblind"], "#648fff", "#1a1a2e", "#e0e0e0", 58, "#648fff", "#dc267f", "#ffb000"),
  makeTheme("deuteranopia", "Deuteranopia Friendly", "colorblind", "dark", "Accessibility", ["a11y", "colorblind"], "#785ef0", "#1a1a2e", "#e0e0e0", 58, "#785ef0", "#dc267f", "#fe6100"),
];

// ── Mono-accent hue sweep (36 hues x 4 styles = 144) ─────────────
function generateHueSweepThemes(): CodexTheme[] {
  const themes: CodexTheme[] = [];
  for (let h = 0; h < 360; h += 10) {
    const label = `${h}°`;
    const id = `hue-${h}`;
    themes.push(
      makeTheme(`${id}-dark`, `Hue ${label} Dark`, id, "dark", "Spectrum",
        ["spectrum", "generated"],
        hsl(h, 70, 60), hsl(h, 10, 10), hsl(h, 8, 85), 58,
        hsl((h + 120) % 360, 50, 45), hsl((h + 180) % 360, 55, 50),
        hsl((h + 60) % 360, 50, 55)),
      makeTheme(`${id}-light`, `Hue ${label} Light`, id, "light", "Spectrum",
        ["spectrum", "generated"],
        hsl(h, 75, 42), hsl(h, 12, 97), hsl(h, 15, 15), 40,
        hsl((h + 120) % 360, 50, 35), hsl((h + 180) % 360, 55, 42),
        hsl((h + 60) % 360, 50, 40)),
      makeTheme(`${id}-vibrant`, `Hue ${label} Vibrant`, id, "dark", "Spectrum",
        ["spectrum", "vibrant", "generated"],
        hsl(h, 95, 55), hsl(h, 20, 6), hsl(h, 5, 90), 65,
        hsl((h + 120) % 360, 60, 50), hsl((h + 180) % 360, 70, 45),
        hsl((h + 60) % 360, 65, 50)),
      makeTheme(`${id}-matte`, `Hue ${label} Matte`, id, "dark", "Spectrum",
        ["spectrum", "matte", "generated"],
        hsl(h, 40, 55), hsl(h, 6, 14), hsl(h, 5, 78), 48,
        hsl((h + 120) % 360, 35, 42), hsl((h + 180) % 360, 40, 45),
        hsl((h + 60) % 360, 35, 48))
    );
  }
  return themes;
}

// ── Duo-tone themes (complementary/split-comp pairs) ─────────────
function generateDuoToneThemes(): CodexTheme[] {
  const combos: { name: string; h1: number; h2: number }[] = [
    { name: "Fire & Ice", h1: 10, h2: 200 },
    { name: "Sunset & Ocean", h1: 30, h2: 220 },
    { name: "Spring & Dusk", h1: 100, h2: 280 },
    { name: "Tropical", h1: 160, h2: 340 },
    { name: "Earth & Sky", h1: 35, h2: 210 },
    { name: "Berry & Mint", h1: 310, h2: 165 },
    { name: "Gold & Violet", h1: 45, h2: 270 },
    { name: "Copper & Teal", h1: 20, h2: 180 },
    { name: "Crimson & Cyan", h1: 350, h2: 185 },
    { name: "Sage & Rose", h1: 130, h2: 340 },
    { name: "Amber & Indigo", h1: 40, h2: 245 },
    { name: "Coral & Sapphire", h1: 15, h2: 225 },
    { name: "Lime & Magenta", h1: 85, h2: 315 },
    { name: "Peach & Navy", h1: 25, h2: 230 },
    { name: "Olive & Plum", h1: 75, h2: 295 },
    { name: "Rust & Steel", h1: 12, h2: 210 },
    { name: "Honey & Lavender", h1: 42, h2: 265 },
    { name: "Pine & Burgundy", h1: 150, h2: 345 },
    { name: "Emerald & Ruby", h1: 145, h2: 350 },
    { name: "Dawn & Twilight", h1: 35, h2: 255 },
    { name: "Forest & Flame", h1: 130, h2: 5 },
    { name: "Cobalt & Coral", h1: 215, h2: 16 },
    { name: "Violet & Gold", h1: 270, h2: 45 },
    { name: "Jade & Scarlet", h1: 160, h2: 4 },
    { name: "Seafoam & Plum", h1: 168, h2: 295 },
    { name: "Amber & Azure", h1: 38, h2: 195 },
    { name: "Crimson & Teal", h1: 348, h2: 175 },
    { name: "Saffron & Iris", h1: 40, h2: 260 },
    { name: "Moss & Cherry", h1: 120, h2: 355 },
    { name: "Bronze & Slate", h1: 25, h2: 215 },
    { name: "Fern & Orchid", h1: 115, h2: 290 },
    { name: "Lemon & Violet", h1: 54, h2: 270 },
    { name: "Apricot & Navy", h1: 24, h2: 230 },
    { name: "Glacier & Ember", h1: 192, h2: 10 },
    { name: "Sage & Garnet", h1: 135, h2: 0 },
    { name: "Ivory & Onyx", h1: 45, h2: 0 },
    { name: "Sunflower & Dusk", h1: 48, h2: 280 },
    { name: "Lagoon & Rose", h1: 188, h2: 340 },
    { name: "Tangerine & Ice", h1: 30, h2: 198 },
  ];

  const themes: CodexTheme[] = [];
  for (const c of combos) {
    const id = c.name.toLowerCase().replace(/[&\s]+/g, "-");
    themes.push(
      makeTheme(`${id}-dark`, `${c.name} Dark`, id, "dark", "Duo-tone",
        ["duo-tone", "contrast"],
        hsl(c.h1, 70, 60), hsl(c.h2, 20, 10), hsl(c.h1, 10, 88), 58,
        hsl(c.h1, 50, 45), hsl(c.h2, 55, 50), hsl(c.h1, 55, 55)),
      makeTheme(`${id}-light`, `${c.name} Light`, id, "light", "Duo-tone",
        ["duo-tone", "contrast"],
        hsl(c.h2, 70, 42), hsl(c.h1, 12, 97), hsl(c.h2, 15, 18), 40,
        hsl(c.h1, 50, 38), hsl(c.h2, 55, 42), hsl(c.h2, 55, 40))
    );
  }
  return themes;
}

// ── Framework / Tool themes ──────────────────────────────────────
const frameworkThemes: CodexTheme[] = [
  makeTheme("react", "React", "react", "dark", "Framework", ["js", "popular"], "#61dafb", "#20232a", "#e0e0e0", 58, "#61dafb", "#ff6b6b", "#61dafb"),
  makeTheme("vue", "Vue", "vue", "dark", "Framework", ["js", "green"], "#42b883", "#1a1a2e", "#e0e0e0", 58, "#42b883", "#ff6b6b", "#42b883"),
  makeTheme("angular", "Angular", "angular", "dark", "Framework", ["ts", "red"], "#dd0031", "#1a1a2e", "#e0e0e0", 60, "#4caf50", "#dd0031", "#2196f3"),
  makeTheme("svelte", "Svelte", "svelte", "dark", "Framework", ["js", "orange"], "#ff3e00", "#1a1a2e", "#e0e0e0", 60, "#4caf50", "#ff3e00", "#2196f3"),
  makeTheme("nextjs", "Next.js", "nextjs", "dark", "Framework", ["react", "popular"], "#ffffff", "#000000", "#ededed", 68, "#50e3c2", "#ee0000", "#0070f3"),
  makeTheme("nuxt", "Nuxt", "nuxt", "dark", "Framework", ["vue", "green"], "#00dc82", "#0b1120", "#e0e0e0", 58, "#00dc82", "#ff6b6b", "#0077ff"),
  makeTheme("astro", "Astro", "astro", "dark", "Framework", ["js", "purple"], "#bc52ee", "#0d0b14", "#e0e0e0", 60, "#4caf50", "#ff6b6b", "#bc52ee"),
  makeTheme("rust", "Rust", "rust", "dark", "Framework", ["systems", "orange"], "#dea584", "#1a1a2e", "#e0e0e0", 58, "#a3be8c", "#bf616a", "#dea584"),
  makeTheme("go", "Go", "go", "light", "Framework", ["systems", "blue"], "#00add8", "#ffffff", "#222222", 40, "#00add8", "#ce3262", "#00add8"),
  makeTheme("python", "Python", "python", "dark", "Framework", ["scripting", "blue"], "#3776ab", "#1a1a2e", "#e0e0e0", 55, "#4caf50", "#ff6b6b", "#ffd43b"),
  makeTheme("elixir", "Elixir", "elixir", "dark", "Framework", ["functional", "purple"], "#6e4a7e", "#1a1a2e", "#e0e0e0", 55, "#4caf50", "#ff6b6b", "#6e4a7e"),
  makeTheme("haskell", "Haskell", "haskell", "dark", "Framework", ["functional", "purple"], "#5e5086", "#1a1a2e", "#e0e0e0", 55, "#4caf50", "#ff6b6b", "#5e5086"),
  makeTheme("docker", "Docker", "docker", "dark", "Framework", ["devops", "blue"], "#2496ed", "#1a1a2e", "#e0e0e0", 58, "#4caf50", "#ff6b6b", "#2496ed"),
  makeTheme("kubernetes", "Kubernetes", "k8s", "dark", "Framework", ["devops", "blue"], "#326ce5", "#1a1a2e", "#e0e0e0", 58, "#4caf50", "#ff6b6b", "#326ce5"),
  makeTheme("terraform", "Terraform", "terraform", "dark", "Framework", ["devops", "purple"], "#844fba", "#1a1a2e", "#e0e0e0", 55, "#4caf50", "#ff6b6b", "#844fba"),
  makeTheme("swift", "Swift", "swift", "dark", "Framework", ["apple", "orange"], "#f05138", "#1a1a2e", "#e0e0e0", 60, "#4caf50", "#f05138", "#2196f3"),
  makeTheme("ruby-lang", "Ruby", "ruby", "dark", "Framework", ["scripting", "red"], "#cc342d", "#1a1a2e", "#e0e0e0", 58, "#4caf50", "#cc342d", "#2196f3"),
  makeTheme("php", "PHP", "php", "dark", "Framework", ["scripting", "purple"], "#777bb4", "#1a1a2e", "#e0e0e0", 55, "#4caf50", "#ff6b6b", "#777bb4"),
  makeTheme("kotlin", "Kotlin", "kotlin", "dark", "Framework", ["jvm", "purple"], "#7f52ff", "#1a1a2e", "#e0e0e0", 58, "#4caf50", "#ff6b6b", "#7f52ff"),
  makeTheme("typescript-blue", "TypeScript", "typescript", "dark", "Framework", ["js", "blue"], "#3178c6", "#1a1a2e", "#e0e0e0", 58, "#4caf50", "#ff6b6b", "#3178c6"),
  makeTheme("clojure", "Clojure", "clojure", "dark", "Framework", ["functional", "green"], "#5881d8", "#1a1a2e", "#e0e0e0", 55, "#63b132", "#ff6b6b", "#5881d8"),
  makeTheme("zig", "Zig", "zig", "dark", "Framework", ["systems", "orange"], "#f7a41d", "#1a1a2e", "#e0e0e0", 58, "#4caf50", "#ff6b6b", "#f7a41d"),
  makeTheme("deno", "Deno", "deno", "dark", "Framework", ["js", "blue"], "#70ffaf", "#0b1015", "#e0e0e0", 58, "#70ffaf", "#ff6b6b", "#3b82f6"),
  makeTheme("bun", "Bun", "bun", "dark", "Framework", ["js", "warm"], "#fbf0df", "#14110f", "#fbf0df", 55, "#f472b6", "#ff6b6b", "#fbf0df"),
  makeTheme("tailwind-light", "Tailwind Light", "tailwind", "light", "Framework", ["css", "blue"], "#0ea5e9", "#f8fafc", "#0f172a", 40, "#22c55e", "#ef4444", "#0ea5e9"),
  makeTheme("redis", "Redis", "redis", "dark", "Framework", ["database", "red"], "#d82c20", "#1a1a2e", "#e0e0e0", 60, "#4caf50", "#d82c20", "#2196f3"),
  makeTheme("postgres", "PostgreSQL", "postgres", "dark", "Framework", ["database", "blue"], "#336791", "#1a1a2e", "#e0e0e0", 55, "#4caf50", "#ff6b6b", "#336791"),
  makeTheme("mongodb", "MongoDB", "mongodb", "dark", "Framework", ["database", "green"], "#47a248", "#1a1a2e", "#e0e0e0", 55, "#47a248", "#ff6b6b", "#2196f3"),
  makeTheme("graphql", "GraphQL", "graphql", "dark", "Framework", ["api", "pink"], "#e10098", "#1a1a2e", "#e0e0e0", 58, "#4caf50", "#e10098", "#2196f3"),
  makeTheme("remix", "Remix", "remix", "dark", "Framework", ["react", "blue"], "#121212", "#1a1a2e", "#e0e0e0", 58, "#4caf50", "#ff6b6b", "#3992ff"),
  makeTheme("solid", "SolidJS", "solid", "dark", "Framework", ["js", "blue"], "#2c4f7c", "#1a1a2e", "#e0e0e0", 55, "#4caf50", "#ff6b6b", "#76b3e1"),
  makeTheme("neovim", "Neovim", "neovim", "dark", "Framework", ["editor", "green"], "#57a143", "#1a1a2e", "#e0e0e0", 55, "#57a143", "#ff6b6b", "#2196f3"),
  makeTheme("vim-light", "Vim Light", "vim", "light", "Framework", ["editor", "classic"], "#019833", "#ffffff", "#000000", 40, "#019833", "#e00000", "#0000e0"),
  makeTheme("emacs-light", "Emacs Light", "emacs", "light", "Framework", ["editor", "classic"], "#5f5faf", "#ffffff", "#000000", 38, "#228b22", "#b22222", "#5f5faf"),
  makeTheme("latex", "LaTeX", "latex", "light", "Framework", ["academic", "clean"], "#008080", "#fffff8", "#333333", 38, "#228b22", "#b22222", "#008080"),
  makeTheme("jupyter", "Jupyter", "jupyter", "light", "Framework", ["data-science", "orange"], "#f37626", "#ffffff", "#333333", 40, "#4caf50", "#e53935", "#f37626"),
];

// ── City / Culture themes ────────────────────────────────────────
const cityThemes: CodexTheme[] = [
  makeTheme("tokyo-neon", "Tokyo Neon", "tokyo", "dark", "City", ["city", "neon", "japanese"], "#ff2d95", "#0d0015", "#f0e0ff", 65, "#00ff88", "#ff2d95", "#00e5ff"),
  makeTheme("kyoto-temple", "Kyoto Temple", "kyoto", "light", "City", ["city", "japanese", "zen"], "#b8860b", "#f5f0e0", "#3a3020", 40, "#6b8e4e", "#a0522d", "#b8860b"),
  makeTheme("paris-cafe", "Paris Café", "paris", "light", "City", ["city", "warm", "elegant"], "#8b4513", "#faf5ef", "#3c2a1a", 42, "#6b8e4e", "#8b0000", "#4682b4"),
  makeTheme("london-fog", "London Fog", "london", "dark", "City", ["city", "cool", "muted"], "#708090", "#1a1c20", "#c0c8d0", 50, "#5f9ea0", "#cd5c5c", "#708090"),
  makeTheme("new-york-midnight", "New York Midnight", "nyc", "dark", "City", ["city", "urban", "bold"], "#ffd700", "#0a0a0a", "#e0e0e0", 65, "#32cd32", "#ff4500", "#ffd700"),
  makeTheme("seoul-pop", "Seoul Pop", "seoul", "dark", "City", ["city", "pop", "vibrant"], "#e91e8c", "#110822", "#f0e0ff", 60, "#00e676", "#ff1744", "#00b0ff"),
  makeTheme("marrakech", "Marrakech", "marrakech", "light", "City", ["city", "warm", "earth"], "#d2691e", "#faf0e0", "#4a2c0a", 42, "#8b7355", "#cd5c5c", "#d2691e"),
  makeTheme("copenhagen-clean", "Copenhagen", "copenhagen", "light", "City", ["city", "minimal", "scandinavian"], "#4a90d9", "#f8f8f8", "#2a2a3a", 38, "#4a9a5a", "#d05050", "#4a90d9"),
  makeTheme("berlin-industrial", "Berlin Industrial", "berlin", "dark", "City", ["city", "industrial", "raw"], "#b0b0b0", "#0e0e0e", "#c8c8c8", 60, "#808080", "#cd5c5c", "#b0b0b0"),
  makeTheme("miami-vice", "Miami Vice", "miami", "dark", "City", ["city", "neon", "retro"], "#ff6ec7", "#0a0028", "#f0d0ff", 62, "#00ff7f", "#ff1493", "#00ffff"),
  makeTheme("istanbul-bazaar", "Istanbul Bazaar", "istanbul", "dark", "City", ["city", "warm", "rich"], "#c49a6c", "#1a120a", "#d8c8a8", 55, "#8baa5a", "#c05a30", "#5a8aaa"),
  makeTheme("amsterdam-canal", "Amsterdam Canal", "amsterdam", "dark", "City", ["city", "green", "water"], "#4ea88a", "#0a1a14", "#b8d8c8", 52, "#4ea88a", "#c06050", "#5a90c0"),
  makeTheme("singapore-garden", "Singapore Garden", "singapore", "dark", "City", ["city", "green", "tropical"], "#00c896", "#0a140a", "#c0e8d0", 55, "#00c896", "#e06050", "#40a0d0"),
  makeTheme("barcelona-sun", "Barcelona Sun", "barcelona", "light", "City", ["city", "warm", "vibrant"], "#e07020", "#fff8f0", "#3a2010", 42, "#60a030", "#d04040", "#3080c0"),
  makeTheme("vienna-classical", "Vienna Classical", "vienna", "dark", "City", ["city", "elegant", "gold"], "#d4a840", "#141018", "#d0c8b8", 55, "#6a9a5a", "#b06050", "#8090b0"),
  makeTheme("stockholm-winter", "Stockholm Winter", "stockholm", "light", "City", ["city", "cold", "clean"], "#5a8ab0", "#f0f4f8", "#2a3040", 40, "#5a9a6a", "#c05050", "#5a8ab0"),
  makeTheme("cairo-desert", "Cairo Desert", "cairo", "light", "City", ["city", "warm", "sand"], "#c8963c", "#f8f0e0", "#4a3820", 42, "#7a9048", "#b05040", "#6a88a0"),
  makeTheme("sydney-harbour", "Sydney Harbour", "sydney", "light", "City", ["city", "blue", "bright"], "#0088cc", "#f0f8ff", "#1a2a3a", 40, "#4aaa5a", "#d04848", "#0088cc"),
  makeTheme("lisbon-tile", "Lisbon Tile", "lisbon", "light", "City", ["city", "blue", "ceramic"], "#2060a0", "#f8f4f0", "#2a2830", 40, "#509050", "#c04848", "#2060a0"),
  makeTheme("prague-gothic", "Prague Gothic", "prague", "dark", "City", ["city", "dark", "gothic"], "#8070a0", "#0e0a14", "#b0a8c0", 58, "#608068", "#a05058", "#8070a0"),
];

// ── Gradient-stop themes (tri-accent) ────────────────────────────
function generateGradientThemes(): CodexTheme[] {
  const gradients: { name: string; h1: number; h2: number; h3: number }[] = [
    { name: "Sunrise", h1: 350, h2: 30, h3: 55 },
    { name: "Sunset Boulevard", h1: 15, h2: 280, h3: 240 },
    { name: "Northern Lights", h1: 120, h2: 180, h3: 280 },
    { name: "Tropical Storm", h1: 180, h2: 140, h3: 45 },
    { name: "Candy Crush", h1: 340, h2: 290, h3: 195 },
    { name: "Ocean Breeze", h1: 190, h2: 210, h3: 170 },
    { name: "Autumn Fade", h1: 30, h2: 15, h3: 350 },
    { name: "Spring Garden", h1: 100, h2: 60, h3: 150 },
    { name: "Midnight Jazz", h1: 250, h2: 310, h3: 200 },
    { name: "Desert Rose", h1: 340, h2: 25, h3: 45 },
    { name: "Frosted Berry", h1: 280, h2: 330, h3: 0 },
    { name: "Electric Storm", h1: 210, h2: 270, h3: 45 },
    { name: "Coral Reef", h1: 15, h2: 170, h3: 200 },
    { name: "Lavender Field", h1: 265, h2: 290, h3: 100 },
    { name: "Golden Hour", h1: 40, h2: 20, h3: 350 },
    { name: "Deep Sea", h1: 200, h2: 230, h3: 180 },
    { name: "Cherry Cola", h1: 350, h2: 30, h3: 340 },
    { name: "Mojito", h1: 130, h2: 80, h3: 50 },
    { name: "Twilight Zone", h1: 240, h2: 280, h3: 320 },
    { name: "Sahara Night", h1: 35, h2: 15, h3: 240 },
    { name: "Arctic Fox", h1: 195, h2: 210, h3: 230 },
    { name: "Volcano", h1: 5, h2: 25, h3: 45 },
    { name: "Rainforest Mist", h1: 140, h2: 170, h3: 195 },
    { name: "Neon Dreams", h1: 300, h2: 180, h3: 60 },
    { name: "Blueberry", h1: 240, h2: 260, h3: 280 },
  ];

  const themes: CodexTheme[] = [];
  for (const g of gradients) {
    const id = g.name.toLowerCase().replace(/\s+/g, "-");
    themes.push(
      makeTheme(`${id}-dark`, `${g.name} Dark`, id, "dark", "Gradient",
        ["gradient", "creative"],
        hsl(g.h1, 70, 60), hsl(g.h2, 18, 10), hsl(g.h3, 8, 88), 58,
        hsl(g.h2, 50, 45), hsl(g.h3, 55, 50), hsl(g.h1, 55, 55)),
      makeTheme(`${id}-light`, `${g.name} Light`, id, "light", "Gradient",
        ["gradient", "creative"],
        hsl(g.h1, 72, 45), hsl(g.h3, 14, 97), hsl(g.h2, 18, 18), 40,
        hsl(g.h2, 50, 35), hsl(g.h3, 55, 42), hsl(g.h1, 55, 40))
    );
  }
  return themes;
}

// ── Extra variety: contrast variants for popular themes ──────────
function generateContrastVariants(): CodexTheme[] {
  const bases: { name: string; accent: string; surface: string; ink: string; codeId: string }[] = [
    { name: "Dracula", accent: "#bd93f9", surface: "#282a36", ink: "#f8f8f2", codeId: "dracula" },
    { name: "Nord", accent: "#88c0d0", surface: "#2e3440", ink: "#d8dee9", codeId: "nord" },
    { name: "Tokyo Night", accent: "#7aa2f7", surface: "#1a1b26", ink: "#a9b1d6", codeId: "tokyonight" },
    { name: "Catppuccin", accent: "#cba6f7", surface: "#1e1e2e", ink: "#cdd6f4", codeId: "catppuccin" },
    { name: "Gruvbox", accent: "#d79921", surface: "#282828", ink: "#ebdbb2", codeId: "gruvbox" },
    { name: "Rosé Pine", accent: "#c4a7e7", surface: "#191724", ink: "#e0def4", codeId: "rose-pine" },
    { name: "One Dark", accent: "#61afef", surface: "#282c34", ink: "#abb2bf", codeId: "one-dark" },
    { name: "Monokai", accent: "#f92672", surface: "#272822", ink: "#f8f8f2", codeId: "monokai" },
    { name: "GitHub", accent: "#58a6ff", surface: "#0d1117", ink: "#c9d1d9", codeId: "github" },
    { name: "Material", accent: "#82aaff", surface: "#212121", ink: "#eeffff", codeId: "material" },
  ];

  const themes: CodexTheme[] = [];
  const contrasts = [
    { suffix: "Low Contrast", contrast: 35 },
    { suffix: "Medium", contrast: 50 },
    { suffix: "High Contrast", contrast: 75 },
    { suffix: "Ultra", contrast: 85 },
  ];

  for (const b of bases) {
    for (const c of contrasts) {
      const id = `${b.name.toLowerCase().replace(/\s+/g, "-")}-${c.suffix.toLowerCase().replace(/\s+/g, "-")}`;
      themes.push(
        makeTheme(id, `${b.name} ${c.suffix}`, b.codeId, "dark", "Contrast",
          ["contrast-variant", b.name.toLowerCase()],
          b.accent, b.surface, b.ink, c.contrast)
      );
    }
  }
  return themes;
}

// ── Pastel/Soft light themes for each major hue ──────────────────
function generateSoftLightThemes(): CodexTheme[] {
  const themes: CodexTheme[] = [];
  for (let h = 0; h < 360; h += 12) {
    const id = `soft-${h}`;
    themes.push(
      makeTheme(`${id}-cream`, `Soft ${h}° Cream`, id, "light", "Soft",
        ["soft", "light", "pastel"],
        hsl(h, 55, 50), hsl(h, 20, 96), hsl(h, 18, 20), 36,
        hsl((h + 120) % 360, 40, 38), hsl((h + 180) % 360, 45, 42),
        hsl((h + 60) % 360, 40, 42)),
      makeTheme(`${id}-warm`, `Soft ${h}° Warm`, id, "light", "Soft",
        ["soft", "warm", "pastel"],
        hsl(h, 50, 48), hsl((h + 20) % 360, 18, 95), hsl(h, 15, 22), 38,
        hsl((h + 120) % 360, 38, 36), hsl((h + 180) % 360, 42, 40),
        hsl((h + 60) % 360, 38, 40))
    );
  }
  return themes;
}

// ── Assemble everything ──────────────────────────────────────────
let _allThemes: CodexTheme[] | null = null;

/**
 * Returns all generated themes (cached). Combines editor, brand, color-family,
 * neutral, seasonal, mood, accessibility, hue-sweep, duotone, framework,
 * city, gradient, contrast, and soft-light themes.
 * @returns Array of all Codex themes
 */
export function getAllThemes(): CodexTheme[] {
  if (_allThemes) return _allThemes;

  _allThemes = [
    ...editorThemes,
    ...brandThemes,
    ...generateColorFamilyThemes(),
    ...generateNeutralThemes(),
    ...seasonalThemes,
    ...moodThemes,
    ...accessibilityThemes,
    ...generateHueSweepThemes(),
    ...generateDuoToneThemes(),
    ...frameworkThemes,
    ...cityThemes,
    ...generateGradientThemes(),
    ...generateContrastVariants(),
    ...generateSoftLightThemes(),
  ];
  return _allThemes;
}

/**
 * Returns category metadata with theme counts for sidebar filtering.
 * @returns Sorted list of categories (All Themes first, then by count descending)
 */
export function getCategories(): { id: string; name: string; count: number }[] {
  const themes = getAllThemes();
  const map = new Map<string, number>();
  for (const t of themes) {
    map.set(t.category, (map.get(t.category) || 0) + 1);
  }
  return [
    { id: "all", name: "All Themes", count: themes.length },
    ...Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ id: name.toLowerCase(), name, count })),
  ];
}

/**
 * Encodes a theme into a portable config string for Codex import.
 * @param theme - Theme to encode
 * @returns Config string (codex-theme-v1:...) for pasting in Codex Settings → Appearance
 */
export function encodeThemeConfig(theme: CodexTheme): string {
  return `codex-theme-v1:${JSON.stringify({
    codeThemeId: "notion",
    theme: theme.theme,
    variant: theme.variant,
  })}`;
}
