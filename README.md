# Codex Themes Gallery

**Interactive theme gallery with 1000+ customizable themes for Codex editor**

[![Built with React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![Powered by Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)](https://vitejs.dev)
[![Deployed on Cloudflare](https://img.shields.io/badge/Cloudflare%20Pages-deployed-F38020?logo=cloudflare)](https://cloudflare.com)
[![MIT License](https://img.shields.io/badge/License-MIT-green)]()

> Browse, preview, customize, and export themes for your Codex editor in seconds

## ✨ Features

- **1000+ Curated Themes** — Editor presets (Dracula, Nord, Tokyo Night, GitHub), brand palettes (Vercel, Stripe, Linear), color families, accessibility variants, and more
- **Live Preview** — See theme changes in real-time with a miniature Codex UI component
- **Theme Editor** — Customize accent color, background, foreground, fonts, contrast, and more
- **Smart Search & Filtering** — Filter by category, variant (light/dark), or search by theme name and tags
- **Responsive Design** — Works seamlessly on desktop and mobile with virtualized scrolling
- **One-Click Export** — Copy theme config string and paste directly into Codex Settings
- **Accessibility First** — High contrast theme variants, WCAG compliant UI
- **Zero Dependencies for Themes** — Pure theme data generation, no external API calls

## 🚀 Getting Started

### Visit the Gallery

Open the [Codex Themes Gallery](https://codex.instantlandingpages.xyz) to browse and explore themes instantly.

### Quick Start (5 minutes)

1. **Browse** — Navigate through 1000+ themes by category or search
2. **Preview** — Live preview shows exactly how the theme looks in Codex
3. **Customize** (optional) — Click "Customize Theme" to adjust colors, contrast, and fonts
4. **Copy** — Click "Copy Theme Config" or copy the config string
5. **Apply** — Open Codex → Settings → Appearance → Import → Paste config string

See [Getting Started Guide](./docs/getting-started.md) for detailed instructions.

## 📚 Theme Categories

Our collection spans 15+ carefully curated categories:

| Category | Description | Count |
|----------|-------------|-------|
| **Editor** | Classic editor themes (Dracula, Monokai, VS Code, etc.) | 50+ |
| **Brand** | Company & platform themes (Vercel, GitHub, Stripe, LinearApp, etc.) | 25+ |
| **Color Family** | Organized by hue (Red, Blue, Purple, Green, etc.) | 400+ |
| **Neutral** | Monochrome & grayscale with accent colors | 30+ |
| **Nature** | Seasonal & earth-inspired themes | 20+ |
| **Mood** | Aesthetic themes (Zen, Noir, Brutalist, Vaporwave, etc.) | 20+ |
| **Accessibility** | A11Y-optimized, colorblind-friendly, high contrast | 10+ |
| **Spectrum** | Full hue sweep (0-360°) with 4 styles each | 144+ |
| **Duo-tone** | Complementary color pair themes | 80+ |
| **Framework** | Tech stacks (React, Vue, Rust, Python, Go, etc.) | 35+ |
| **City** | City-inspired themes (Tokyo, Paris, NYC, Seoul, etc.) | 20+ |
| **Gradient** | Multi-color gradient themes | 50+ |
| **Contrast** | High/low/ultra contrast variants | 40+ |
| **Soft** | Pastel & gentle soft-light themes | 60+ |

Browse all categories in the [Themes Overview](./docs/themes-overview.md).

## 💡 Use Cases

- **Dark / Light Switching** — Export two versions (dark & light) and toggle based on time of day
- **Client Branding** — Create custom theme with client colors and export for distribution
- **Accessibility** — Use high-contrast or colorblind-friendly themes for better eye comfort
- **Team Consistency** — Share theme config strings with your team for unified editor appearance
- **Mood Theming** — Switch themes based on project or time of day (productive, creative, zen modes)
- **Framework Matching** — Use framework-specific themes that match your tech stack aesthetics

## 🎨 Popular Themes

Quick copy-paste for the most requested themes:

```bash
# Dracula (Dark)
codex-theme-v1:{"codeThemeId":"notion","theme":{"accent":"#bd93f9","contrast":60,"fonts":{"code":null,"ui":null},"ink":"#f8f8f2","opaqueWindows":false,"semanticColors":{"diffAdded":"#50fa7b","diffRemoved":"#ff5555","skill":"#8be9fd"},"surface":"#282a36"},"variant":"dark"}

# Nord (Dark)
codex-theme-v1:{"codeThemeId":"notion","theme":{"accent":"#88c0d0","contrast":55,"fonts":{"code":null,"ui":null},"ink":"#d8dee9","opaqueWindows":false,"semanticColors":{"diffAdded":"#a3be8c","diffRemoved":"#bf616a","skill":"#81a1c1"},"surface":"#2e3440"},"variant":"dark"}

# Tokyo Night (Dark)
codex-theme-v1:{"codeThemeId":"notion","theme":{"accent":"#7aa2f7","contrast":58,"fonts":{"code":null,"ui":null},"ink":"#a9b1d6","opaqueWindows":false,"semanticColors":{"diffAdded":"#9ece6a","diffRemoved":"#f7768e","skill":"#7dcfff"},"surface":"#1a1b26"},"variant":"dark"}

# GitHub Light
codex-theme-v1:{"codeThemeId":"notion","theme":{"accent":"#0969da","contrast":38,"fonts":{"code":null,"ui":null},"ink":"#24292f","opaqueWindows":true,"semanticColors":{"diffAdded":"#1a7f37","diffRemoved":"#cf222e","skill":"#0969da"},"surface":"#ffffff"},"variant":"light"}

# Vercel (Dark)
codex-theme-v1:{"codeThemeId":"notion","theme":{"accent":"#ffffff","contrast":70,"fonts":{"code":null,"ui":null},"ink":"#ededed","opaqueWindows":false,"semanticColors":{"diffAdded":"#50e3c2","diffRemoved":"#ee0000","skill":"#0070f3"},"surface":"#000000"},"variant":"dark"}
```

More theme snippets available in [Theme Snippets & Code](./docs/theme-snippets.md).

## 🎯 How It Works

### Architecture

```
┌─────────────────────────────────────────┐
│       Codex Themes Gallery              │
├─────────────────────────────────────────┤
│  Theme Generator (1000+ themes)         │
│  ├─ Editor Presets (50+ themes)         │
│  ├─ Brand Palettes (25+ themes)         │
│  ├─ Color Families (400+ themes)        │
│  ├─ Neutral/Seasonal/Mood (50+)         │
│  ├─ Spectrum Sweep (144+ hues)          │
│  ├─ Duo-tone Combos (80+)               │
│  └─ Framework/City/Gradient (145+)      │
└──────────────┬──────────────────────────┘
               │
       ┌───────▼────────┐
       │  Interactive   │
       │  Gallery       │
       ├────────────────┤
       │ • Search       │
       │ • Filter       │
       │ • Preview      │
       │ • Customize    │
       │ • Export       │
       └────────────────┘
```

### Theme Data Structure

Each theme includes:

```typescript
interface CodexTheme {
  id: string;           // Unique identifier
  name: string;         // Display name
  category: string;     // Category (Editor, Brand, etc.)
  variant: "light" | "dark"; // Theme variant
  tags: string[];       // Searchable tags
  theme: {
    accent: string;     // Primary accent color (#rrggbb)
    surface: string;    // Background color
    ink: string;        // Foreground/text color
    contrast: number;   // 0-100 contrast level
    opaqueWindows: boolean; // Window opacity
    fonts: {
      ui: string | null;      // UI font family
      code: string | null;    // Code font family
    };
    semanticColors: {
      diffAdded: string;      // Diff addition color
      diffRemoved: string;    // Diff removal color
      skill: string;          // Skill highlight color
    };
  };
}
```

## 📖 Documentation

- [Getting Started](./docs/getting-started.md) — Step-by-step setup guide
- [Themes Overview](./docs/themes-overview.md) — Detailed category descriptions
- [Customization Guide](./docs/customization-guide.md) — How to create custom themes
- [Theme Snippets](./docs/theme-snippets.md) — Copy-paste ready theme configs
- [FAQ](./docs/faq.md) — Common questions answered

## 💻 Development

### Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:5174

# Build for production
npm run build

# Preview production build
npm run preview
```

### Tech Stack

- **React 19** — Component framework
- **Vite 8** — Build tool
- **Tailwind CSS 4** — Utility-first CSS
- **Framer Motion** — Animations
- **React Virtual** — Virtual scrolling (1000+ themes)
- **Lucide Icons** — Icon library
- **TypeScript** — Type safety
- **Cloudflare Pages** — Deployment

### Project Structure

```
src/
├── components/
│   ├── ThemeGrid.tsx        # Main gallery layout
│   ├── CodexPreview.tsx     # Theme preview components
│   ├── ThemeEditor.tsx      # Customizer panel
│   └── ThemeGrid.tsx        # Search, filters, virtual grid
├── lib/
│   ├── theme-generator.ts   # Generate 1000+ themes
│   └── types.ts             # TypeScript interfaces
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── index.css                # Global styles + Tailwind
```

## 🚀 Deployment

### Deploy to Cloudflare Pages

```bash
# Install Wrangler CLI
npm install -g wrangler

# Deploy
npm run deploy
# or
wrangler deploy
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🎓 Creating Your Own Themes

### How to Add Custom Themes

Edit [`src/lib/theme-generator.ts`](./src/lib/theme-generator.ts) and add to the appropriate array:

```typescript
// Add to editorThemes array
makeTheme(
  "my-theme",           // id
  "My Theme",           // name
  "my-theme",           // codeThemeId
  "dark",               // variant
  "Custom",             // category
  ["custom", "dark"],   // tags
  "#a78bfa",            // accent
  "#18181b",            // surface
  "#f8f8f2",            // ink
  60,                   // contrast
  "#3fb950",            // diffAdded
  "#f85149",            // diffRemoved
  "#58a6ff"             // skill
),
```

Then rebuild:

```bash
npm run build
```

## 🤝 Contributing

Contributions welcome! To add themes or improve the gallery:

1. Fork the repository
2. Create a branch: `git checkout -b feature/add-themes`
3. Add themes to [`src/lib/theme-generator.ts`](./src/lib/theme-generator.ts)
4. Test locally with `npm run dev`
5. Submit a pull request

## 📝 License

MIT © 2026 — Free to use and modify

## 🙋 FAQ

**Q: Can I customize themes directly in the gallery?**  
A: Yes! Click "Customize Theme" on any theme card to modify colors, fonts, and contrast in real-time.

**Q: How do I apply a theme to Codex?**  
A: Copy the config string, open Codex → Settings → Appearance → click "Import" → paste the string.

**Q: Can I use these themes in other editors?**  
A: These themes are specifically designed for Codex. You can adapt the colors for other editors by manually recreating the theme.

**Q: Are there accessibility-optimized themes?**  
A: Yes! Check the "Accessibility" category for WCAG-compliant, high-contrast, and colorblind-friendly themes.

**Q: Can I export multiple themes at once?**  
A: Currently, you can export one at a time. We're working on batch export functionality.

See [Full FAQ](./docs/faq.md) for more questions.

## 🔗 Links

- [Codex Editor](https://codex.instantlandingpages.xyz)
- [Gallery Live Demo](https://codex.instantlandingpages.xyz/themes)
- [GitHub Repository](https://github.com/yourusername/codex-themes)
- [Report a Bug](https://github.com/yourusername/codex-themes/issues)

---

Made with 💜 for code lovers. Happy theming! 🎨
