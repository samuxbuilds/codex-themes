# Getting Started with Codex Themes

Complete guide to browsing, selecting, and applying themes from the Codex Themes Gallery.

## 📋 Table of Contents

1. [Visiting the Gallery](#visiting-the-gallery)
2. [Browsing Themes](#browsing-themes)
3. [Searching & Filtering](#searching--filtering)
4. [Previewing Themes](#previewing-themes)
5. [Applying a Theme](#applying-a-theme)
6. [Customizing Themes](#customizing-themes)
7. [Tips & Tricks](#tips--tricks)

---

## Visiting the Gallery

### Online

Simply visit: **[Codex Themes Gallery](https://codex.instantlandingpages.xyz)**

No sign-up required. The gallery works in all modern browsers (Chrome, Firefox, Safari, Edge).

### Locally

Want to run the gallery on your machine?

```bash
git clone https://github.com/yourusername/codex-themes.git
cd codex-themes

npm install
npm run dev

# Open http://localhost:5174 in your browser
```

---

## Browsing Themes

### Category Navigation

The left sidebar shows all available categories. Click any category to filter themes:

- **All Themes** — Shows all 1000+ themes
- **Editor** — Classic editor themes (Dracula, Monokai, VS Code, etc.)
- **Brand** — Company & platform themes (Vercel, GitHub, Stripe, Linear)
- **Color Family** — Grouped by hue (Red Dark, Blue Light, Purple Muted, etc.)
- **Neutral** — Monochrome & grayscale variations
- **Nature** — Seasonal & earth-inspired themes
- **Mood** — Aesthetic themes (Zen, Noir, Brutalist, etc.)
- **Accessibility** — WCAG-optimized, high-contrast, colorblind-friendly
- **Spectrum** — Full 360° hue sweep
- **Duo-tone** — Complementary color pairs
- **Framework** — Tech stacks (React, Vue, Python, Go, Rust, etc.)
- **City** — City-inspired themes (Tokyo, Paris, NYC, Seoul)
- **Gradient** — Multi-color gradient combinations
- **Contrast** — Variants optimized for contrast levels
- **Soft** — Pastel & gentle light themes

### Mobile

On mobile devices, tap the **≡ Menu** button to open categories.

---

## Searching & Filtering

### Search Bar

Use the search box at the top to find themes by:

- **Name** — e.g., "Dracula", "Tokyo Night"
- **Category** — e.g., "Editor", "Brand", "Framework"
- **Tags** — e.g., "dark", "popular", "blue", "neon"

Example searches:
- `dracula` → Find Dracula variants
- `dark blue` → Find dark themes with blue tones
- `accessibility` → Find accessible themes
- `javascript` → Find JavaScript framework themes

### Variant Filter

Filter by light/dark mode using the toggle at the top:

- **All** — Show both light and dark themes
- **Light** ☀️ — Show only light themes
- **Dark** 🌙 — Show only dark themes

### View Mode

Switch between two viewing modes:

- **Grid View** — Large preview cards (default)
- **Compact View** — Minimal color swatches and names

---

## Previewing Themes

### Live Preview Card

Each theme card shows a miniature Codex UI with:

- **Title bar** — Window controls and title
- **Sidebar** — Navigation with accent highlight
- **Messages** — Sample chat messages
- **Diff block** — Code changes in diff colors
- **Input area** — Message input field

This preview gives you an accurate look at how the theme appears in the actual Codex editor.

### Full Preview Panel

Click any theme to open the full preview panel on the right side. This shows:

1. **Large preview** — Full-size Codex interface mockup
2. **Theme metadata** — Name, variant, category, tags
3. **Color swatches** — All theme colors with hex codes
4. **Contrast meter** — Visual contrast level indicator

---

## Applying a Theme

### Step-by-Step

#### 1. Copy Theme Config

In the preview panel, click **"Copy Theme Config"** button or scroll down to copy the config string.

The config string looks like:
```
codex-theme-v1:{"codeThemeId":"notion","theme":{"accent":"#bd93f9",...},"variant":"dark"}
```

#### 2. Open Codex Settings

In your Codex editor:
- Click your **profile icon** (bottom left)
- Select **Settings**
- Go to **Appearance**

#### 3. Import Theme

- Click the **"Import Custom Theme"** button
- Paste the config string you copied
- Click **"Apply"**

#### 4. Enjoy!

Your Codex editor now uses the new theme. Switch themes anytime by repeating these steps.

### Exporting Multiple Themes

To test themes before deciding:

1. Visit the gallery
2. Find each theme you like
3. Copy the config string for each
4. Save them in a text file for quick access
5. Import each one in Codex to compare

---

## Customizing Themes

Not happy with a theme? Customize it!

### How to Customize

1. Click any theme card
2. In the preview panel, click **"Customize Theme"**
3. The customizer panel opens with live preview

### Customizer Options

#### Accent Color
Your primary highlight color. Used for:
- Highlight on scroll
- Focus/hover states
- Accent buttons

#### Background (Surface)
The main editor background color.

#### Foreground (Ink)
The text/foreground color for readability.

#### Contrast
Adjust 0-100 to control color contrast. Higher = more contrast, better for accessibility.

#### Fonts
Optionally specify custom UI and code fonts:
- **UI Font** — Menu & UI elements (e.g., system fonts)
- **Code Font** — Monospace font for code (e.g., "Monaco", "Fira Code")

#### Variant
Switch between:
- **Light** — Light background, dark text
- **Dark** — Dark background, light text

#### Translucent Sidebar
Toggle window opacity on/off.

#### Semantic Colors
Fine-tune diff and skill highlighting:
- **Diff Added** — Green (for additions)
- **Diff Removed** — Red (for deletions)
- **Skill** — Blue (for skill tags)

### Copy Customized Config

Once satisfied:

1. Scroll down in the customizer
2. Click **"Copy Custom Config"**
3. The custom config is copied
4. Paste it into Codex Settings → Appearance → Import

---

## Tips & Tricks

### 🎯 Finding Themes

- **New to the gallery?** Start with "All Themes" to see everything
- **Love dark mode?** Filter to "Dark" variant
- **Accessibility needs?** Browse the "Accessibility" category
- **Match your editor?** Search by editor name (e.g., "vim dark", "vscode")

### 🔄 Quick Comparisons

1. Open a theme in the preview panel
2. Right-click "Customize Theme" → open in new tab (if available)
3. Compare two themes side-by-side in separate windows

### 💾 Saving Favorites

Create a bookmark folder in your browser:
- Bookmark the gallery main page
- Keep a text file with your favorite theme config strings

### 🌈 Creating Color Schemes

When customizing:
- Use a **color picker tool** (like [Coolors.co](https://coolors.co)) to find complementary colors
- Test colors in the live preview before applying
- Export your custom theme config for backup

### ⚡ Performance

- The gallery uses **virtual scrolling** for smooth performance with 1000+ themes
- **Virtualization** only renders visible themes, so scrolling is instant

### 🎨 Creating Consistent Themes

Want themes for your whole team?
1. Find a base theme
2. Customize it (colors, fonts, contrast)
3. Copy the config string
4. Share with your team
5. They can paste it directly in Codex

---

## Common Questions

**Q: Does the gallery work offline?**  
A: No, the gallery requires internet connection. However, you can download all theme configs locally.

**Q: Can I undo a theme change?**  
A: Yes! Just apply a different theme or your previous theme again.

**Q: Are themes automatically synced across devices?**  
A: Not yet. Each device needs the config string applied manually.

**Q: Can I create themes for other editors?**  
A: These themes are Codex-specific, but you can adapt the hex codes for other editors.

---

## Next Steps

- Browse the [**Themes Overview**](./themes-overview.md) for detailed category descriptions
- Learn [**How to Customize Themes**](./customization-guide.md) in depth
- Check [**Theme Snippets**](./theme-snippets.md) for ready-to-use configs
- Read the [**FAQ**](./faq.md) for more questions

---

**Happy theming! 🎨**
