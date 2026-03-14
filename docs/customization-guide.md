# Theme Customization Guide

Learn how to customize themes to perfectly match your preferences.

## 🎨 Creating the Perfect Theme

The Codex Themes Gallery lets you customize any theme in real-time. No coding required!

---

## Getting Started with Customization

### Step 1: Open Theme Editor

1. Click any theme in the gallery
2. In the preview panel, click **"Customize Theme"**
3. The customizer panel opens with:
   - Live preview on the left
   - Customization options on the right

### Step 2: Make Changes

Adjust any of the options below. The preview updates instantly!

---

## Customization Options

### 1. Variant (Light / Dark)

Switch between light and dark mode themes.

- **Light** — Light background, dark text (daytime work)
- **Dark** — Dark background, light text (night work, reduced eye strain)

The customizer also adjusts semantic colors when switching variants.

**Pro Tip**: Create light AND dark versions of your theme for time-of-day switching.

---

### 2. Accent Color

Your primary highlight color used for:
- Selection/focus
- Links & interactive elements
- Highlights
- Accent buttons

#### How to Change

1. Click the color picker button
2. Select a color, or
3. Enter a hex code directly (e.g., `#a78bfa`)

#### Tips for Choosing

- **High contrast**: Pick a bright color if background is dark
- **Professional**: Use brand colors
- **Accessibility**: Ensure sufficient contrast with background
- **Use a palette tool**: [Coolors.co](https://coolors.co), [Color Hunt](https://colorhunt.co)

**Example Hex Codes:**
- Purples: `#a78bfa`, `#c4a7e7`, `#9580c2`
- Blues: `#3b82f6`, `#0ea5e9`, `#06b6d4`
- Greens: `#10b981`, `#34d399`, `#4ade80`
- Reds: `#ef4444`, `#f87171`, `#fb7185`
- Oranges: `#f97316`, `#fb923c`, `#fbbf24`

---

### 3. Background (Surface)

The main editor background color.

- **Dark backgrounds**: `#000000` to `#2a2a2a`
- **Light backgrounds**: `#ffffff` to `#f5f5f5`
- **Gray backgrounds**: `#1a1a1a` to `#e5e5e5`

#### Pro Tips

- Avoid pure white (`#ffffff`) on light themes — use off-white (`#faf8f3`, `#f9f7f4`)
- Avoid pure black (`#000000`) on dark themes — use near-black (`#0d0d0d`, `#1a1a1a`)
- This reduces eye strain and looks more professional

---

### 4. Foreground (Ink)

Text and symbol colors. Opposite of background.

- **Dark backgrounds need light text**: `#d0d0d0` to `#ffffff`
- **Light backgrounds need dark text**: `#1a1a1a` to `#4a4a4a`

#### WCAG Contrast Requirements

For accessibility, maintain contrast ratio:
- **AA (Minimum)**: 4.5:1 for normal text
- **AAA (Enhanced)**: 7:1 for normal text

Use free tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify.

---

### 5. Contrast Slider (0-100)

Controls the intensity of accent vs. background colors.

- **0** — Minimal contrast (soft, low energy)
- **50** — Balanced contrast (default)
- **100** — Maximum contrast (accessibility first, high energy)

#### Visual Guide

- `0-20`: Very soft, low contrast, might be hard to read
- `20-40`: Soft, calm, easy daytime coding
- `40-60`: Balanced, versatile, good for all conditions
- `60-80`: Bold, high energy, good for accessibility
- `80-100`: Maximum, high visibility, best for accessibility

**Recommendation**: Start at 50-60 for most people.

---

### 6. Fonts

Optionally specify custom fonts for UI and code.

#### UI Font

For menus, labels, buttons:
- Mac/iOS: `-apple-system, BlinkMacSystemFont, "Segoe UI"`
- Microsoft: `"Segoe UI", system-ui`
- Universal: `system-ui, sans-serif`
- Specific: `"Inter", "Helvetica Neue", Arial`

#### Code Font

For editor code blocks:
- Monospace: `"Fira Code", "Monaco", "Courier New"`
- Modern: `"Cascadia Code", "Consolas"`
- Classic: `"Source Code Pro", "Liberation Mono"`

**Pro Tip**: Leave blank to use system defaults. Most people prefer this.

---

### 7. Translucent Sidebar

Toggle window transparency on/off.

- **Enabled** — Sidebar shows background behind it (modern glassmorphism)
- **Disabled** — Solid sidebar color (traditional, cleaner)

**Recommendation**: Try enabled for modern looks, disabled for professional.

---

### 8. Semantic Colors

Fine-tune highlighting for specific code elements.

#### Diff Added (Green default)

Color for newly added code/lines.

Common choices:
- `#10b981` — Emerald green
- `#34d399` — Lighter green
- `#6ee7b7` — Very light green
- `#4ade80` — Lime green

#### Diff Removed (Red default)

Color for deleted code/lines.

Common choices:
- `#ef4444` — Bright red
- `#f87171` — Light red
- `#fca5a5` — Very light red
- `#dc2626` — Dark red

#### Skill (Blue default)

Color for skill/tag highlights.

Common choices:
- `#3b82f6` — Bright blue
- `#60a5fa` — Light blue
- `#93c5fd` — Very light blue
- `#2563eb` — Dark blue

**Accessibility**: Ensure these colors are distinct from your accent color for colorblind-friendly support.

---

## Presets & Templates

### Professional Theme Template

Perfect for work/business:

```
Variant: Dark
Accent: #0066cc (Corporate blue)
Background: #1a1a1a (Near black)
Foreground: #e0e0e0 (Light gray)
Contrast: 65
Diff Added: #10b981
Diff Removed: #ef4444
Skill: #0066cc
```

### Creative Theme Template

Perfect for design/creative work:

```
Variant: Dark
Accent: #d946ef (Vibrant magenta)
Background: #0f0f0f (Black)
Foreground: #f5f5f5 (Slightly off-white)
Contrast: 70
Diff Added: #84cc16
Diff Removed: #f43f5e
Skill: #d946ef
```

### Minimal Theme Template

Zen-like, distraction-free:

```
Variant: Light
Accent: #64748b (Slate)
Background: #f8f8f6 (Off-white)
Foreground: #333333 (Dark gray)
Contrast: 45
Diff Added: #6b7280
Diff Removed: #9ca3af
Skill: #64748b
```

### Neon Theme Template

Retro, energetic:

```
Variant: Dark
Accent: #00ffff (Cyan)
Background: #0a0a0a (Deep black)
Foreground: #ffffff (Bright white)
Contrast: 85
Diff Added: #00ff00 (Neon green)
Diff Removed: #ff0055 (Neon pink)
Skill: #0099ff (Neon blue)
```

---

## Advanced Tips

### 1. Using Color Theory

**Complementary Colors**: Colors opposite on the color wheel

```
Base: #0066cc (Blue)
Complementary: #cccc00 (Yellow) — Good for accent/diff
```

**Analogous Colors**: Colors next to each other

```
Base: #0066cc (Blue)
Analogous: #0099cc (Cyan) or #003399 (Purple)
```

### 2. Contrast Ratio Calculation

To verify accessibility:

1. Get RGB values of two colors
2. Calculate luminance of each
3. Ratio = (lighter + 0.05) / (darker + 0.05)
4. Target: ≥ 4.5 for AA, ≥ 7.0 for AAA

Use [WebAIM Checker](https://webaim.org/resources/contrastchecker/) instead of manual calculation.

### 3. Test in Real Conditions

- **Daytime**: Test in bright light
- **Nighttime**: Test with reduced blue light
- **Different screens**: Mac, Windows, Linux might display differently
- **Different times**: Your perception changes throughout the day

### 4. Create a Theme Family

Build multiple related themes:

```
My Brand - Day (high contrast, light)
My Brand - Evening (medium contrast, light)
My Brand - Night (low blue, dark)
My Brand - Deep Work (minimal color, monochrome)
```

Export all config strings and rotate as needed.

---

## Sharing Your Theme

### 1. Copy Config String

Once customized, scroll to **"Config String"** section and click **Copy**.

### 2. Share with Team

Send the config string to teammates:

```
Hey! Try this theme:

codex-theme-v1:{"codeThemeId":"notion","theme":...}
```

### 3. GitHub / Repository

Document your theme in your project README:

```markdown
## Recommended Theme

Our team uses a custom Codex theme. To use it:

1. Open Codex → Settings → Appearance
2. Click Import Custom Theme
3. Paste this config:

codex-theme-v1:{...}
```

### 4. Create Theme Variations

Same base theme, different contrast levels:

```
My Theme (Standard)
My Theme - High Contrast (for accessibility)
My Theme - Low Contrast (for nighttime)
```

---

## Troubleshooting

### Colors don't look right after applying

- Colors may display differently depending on your screen
- Try adjusting contrast ±10 points
- Restart Codex if colors seem cached

### Text is hard to read

- Increase contrast slider to 70+
- Choose more different colors for accent vs background
- Check hex codes for typos

### Theme resets when I restart Codex

- Make sure you clicked "Apply" in Codex Settings
- Try importing again if it didn't save

### Can't find "Import" button in Codex

- Look in Settings → Appearance
- Make sure you're looking in the right section
- Contact Codex support if you can't find it

---

## Resources

- [Coolors.co](https://coolors.co) — Color palette generator
- [Color Hunt](https://colorhunt.co) — Discover color trends
- [Brandcolors.net](https://brandcolors.net) — Official brand colors
- [WebAIM Contrast](https://webaim.org/resources/contrastchecker/) — Accessibility checker
- [ColorHexa](https://www.colorhexa.com/) — Color information & conversions

---

## Next Steps

- [Theme Snippets](./theme-snippets.md) — Copy-paste ready themes
- [Getting Started](./getting-started.md) — How to apply themes
- [FAQ](./faq.md) — Common questions
