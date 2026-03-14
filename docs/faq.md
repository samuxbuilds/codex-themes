# Frequently Asked Questions (FAQ)

Common questions about the Codex Themes Gallery.

---

## 🎯 General Questions

### Q: What is Codex Themes Gallery?

A: It's an interactive web gallery featuring 1000+ customizable themes for the Codex editor. You can browse, preview, customize, and export themes to use in Codex.

### Q: Is it free?

A: Yes! Completely free to use. No sign-up, no ads, no limitations.

### Q: Do I need to install anything?

A: No. The gallery works in your browser. Just visit the link and start browsing.

### Q: Which browsers does it support?

A: All modern browsers:
- Chrome & Edge (v90+)
- Firefox (v88+)
- Safari (v14+)
- Any Chromium-based browser

---

## 🎨 Theme Questions

### Q: How many themes are there?

A: 1000+ themes across 15+ categories:
- Editor presets: 60+
- Brand themes: 25+
- Color families: 400+
- Generated variants: 500+

### Q: Can I customize themes?

A: Yes! Click any theme and choose "Customize Theme" to adjust:
- Accent color
- Background color
- Text color
- Contrast level
- Fonts
- Semantic colors (diff, skill)
- Light/dark variant

### Q: Can I create my own theme from scratch?

A: Currently, you can only customize existing themes in the gallery. To create entirely new themes, you'd need to edit the source code.

[See Customization Guide](./customization-guide.md) for detailed options.

### Q: How do I save my custom theme?

A: Copy the "Config String" from the customizer panel. Keep it in a safe place (notes app, bookmark file, etc.).

### Q: Can I export multiple themes at once?

A: Currently, you export one at a time. We're working on batch export functionality.

**Workaround**: Copy each theme config string and save in a text file.

### Q: Are themes updated regularly?

A: The gallery has 1000+ themes already. We add new categories and variations based on user feedback.

---

## 💾 Applying Themes

### Q: How do I apply a theme to Codex?

A: Five simple steps:

1. Find a theme in the gallery
2. Click it to preview
3. Click "Copy Theme Config" (or copy the config string)
4. Open Codex → Settings → Appearance
5. Click "Import Custom Theme" and paste the config string

### Q: Where exactly is the "Import" button in Codex?

A: In Codex:
1. Click **profile icon** (bottom left)
2. Select **Settings**
3. Go to **Appearance** tab
4. Look for **"Import Custom Theme"** button

### Q: Can I use these themes on other editors?

A: No, these themes are Codex-specific. However, you can manually adapt the hex color codes to other editors by recreating the theme manually.

### Q: Why isn't my theme applying?

A: Check:
1. Did you copy the entire config string?
2. Did you click "Import" AND "Apply"?
3. Try refreshing Codex
4. Try applying a different theme first to verify import works

### Q: Can themes sync across devices?

A: Not automatically. You need to apply the theme on each device separately. Save your favorite theme configs somewhere safe!

### Q: How do I switch between multiple themes?

A: Apply a new theme anytime by:
1. Finding another theme in the gallery
2. Copying its config
3. Going to Codex Settings → Appearance → Import
4. Pasting the new config

### Q: Can I have a keyboard shortcut to switch themes?

A: That depends on Codex's built-in features. Check Codex Settings → Keybindings for theme switching options.

---

## 🔧 Technical Questions

### Q: How are themes generated?

A: We have a theme generator algorithm in TypeScript that creates variants based on:
- Base hues (0-360° color spectrum)
- Color families (organized by hue)
- Contrast levels (0-100)
- Light/dark variants
- Style variations (muted, vibrant, pastel, deep, etc.)

[See theme-generator.ts](../src/lib/theme-generator.ts) in the GitHub repo.

### Q: Can I contribute new themes?

A: Yes! Fork the GitHub repo and:

1. Edit `src/lib/theme-generator.ts`
2. Add your theme(s) to the appropriate array
3. Submit a pull request

[See Contributing Guide](../README.md#🤝-contributing)

### Q: Is the gallery open-source?

A: Yes! Available at [GitHub](https://github.com/yourusername/codex-themes).

MIT License — you can use, modify, and distribute freely.

### Q: How does the search work?

A: Search finds themes by:
- **Name** — e.g., "Dracula"
- **Category** — e.g., "Editor", "Brand"
- **Tags** — keywords like "blue", "dark", "neon"

### Q: Why is the gallery so fast?

A: We use:
- React Virtual Scrolling (only renders visible themes)
- Code splitting
- Vite for fast builds
- Cloudflare Pages CDN for quick delivery

---

## 🎯 Customization Questions

### Q: What's the difference between "Contrast" levels?

A: **Contrast** (0-100) controls how different accent color is from background:

- **0-20**: Very soft, low visibility
- **20-40**: Soft, calm
- **40-60**: Balanced (good default)
- **60-80**: Bold, high visibility
- **80-100**: Maximum, accessibility-focused

### Q: What does "Translucent Sidebar" do?

A: Toggles transparency of the editor sidebar:
- **Enabled**: Sidebar shows background through it (modern glassmorphism)
- **Disabled**: Solid sidebar color (traditional, cleaner)

### Q: What are "Semantic Colors"?

A: Special colors for specific code elements:
- **Diff Added** — Green (for new code lines)
- **Diff Removed** — Red (for deleted code lines)
- **Skill** — Blue (for skill/tag highlights)

### Q: Can I set custom fonts?

A: Yes, in the customizer:
- **UI Font** — For menus and labels
- **Code Font** — For code blocks

Leave blank to use system defaults (recommended).

### Q: How do I find the perfect accent color?

A: Use a color palette tool:
- [Coolors.co](https://coolors.co) — Generate palettes
- [Color Hunt](https://colorhunt.co) — Discover trends
- [Brandcolors.net](https://brandcolors.net) — Official brand colors

Then test in the live preview before applying.

### Q: How do I ensure accessibility?

A: Check contrast ratio:
- **AA (Minimum)**: 4.5:1 for normal text
- **AAA (Enhanced)**: 7:1 for normal text

Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

Tip: Look for themes in the "Accessibility" category for pre-optimized options.

---

## 🌙 Special Features

### Q: Are there accessibility-optimized themes?

A: Yes! Browse the "Accessibility" category for:
- High contrast themes
- Dyslexia-friendly theme
- Low blue light themes (night coding)
- Colorblind-friendly themes

### Q: Can I create different themes for different times?

A: Yes! Create multiple versions:
- Day Mode (high contrast light)
- Evening (medium contrast)
- Night (low blue light, dark)
- Deep Work (minimal, monochrome)

Save each config string and apply as needed.

### Q: Are there themes for specific programming languages?

A: Yes! Check the "Framework" category for:
- JavaScript (React, Vue, Angular, Next.js, etc.)
- Python, Go, Rust, Ruby, PHP, Kotlin
- DevOps (Docker, Kubernetes, Terraform)
- Databases (PostgreSQL, MongoDB, Redis)
- Design tools (Figma, LaTeX, Jupyter)

### Q: Can I use these themes with other code editors?

A: These are Codex-specific. However, you can adapt the hex colors for other editors like VSCode, Sublime, etc. by manually recreating the theme.

---

## 📱 Mobile & Responsive

### Q: Does the gallery work on mobile?

A: Yes! Fully responsive:
- Touch-friendly interface
- Mobile-optimized layout
- Tap menu to open categories
- Pinch to zoom preview

### Q: Can I apply themes from mobile?

A: You can copy theme configs on mobile, but you need to apply them in Codex on your device where Codex is installed.

### Q: Why is scrolling smooth with 1000+ themes?

A: We use **React Virtual Scrolling** — only visible themes are rendered, making scrolling instant even with thousands of themes.

---

## 🤝 Community & Support

### Q: How do I report a bug?

A: Open an issue on [GitHub Issues](https://github.com/yourusername/codex-themes/issues) with:
- What you were trying to do
- What went wrong
- Browser and OS
- Screenshot if applicable

### Q: How do I suggest a new feature?

A: Create a discussion or issue on GitHub with:
- Feature idea
- Why you think it would be useful
- Any examples

### Q: Can I use these themes commercially?

A: Yes! MIT License means you can use freely for any purpose, including commercial projects.

### Q: How do I contact the team?

A: Open an issue on GitHub or check the README for contact info.

### Q: Can I contribute a new theme category?

A: Absolutely! Suggest new categories via:
- GitHub Issues (feature request)
- Pull request with new themes

See [Contributing Guide](../README.md#🤝-contributing).

---

## 📚 Documentation

### Q: Where can I find more help?

A: Check out:
- [Getting Started](./getting-started.md) — Step-by-step guide
- [Themes Overview](./themes-overview.md) — All themes explained
- [Customization Guide](./customization-guide.md) — Deep dive into customizing
- [Theme Snippets](./theme-snippets.md) — Copy-paste ready configs

### Q: Is there video documentation?

A: Not yet, but we're working on it! Stay tuned.

### Q: The gallery seems incomplete, where are my favorite themes?

A: We have 1000+ themes already! If your favorite is missing:
1. Check if it's under a different name
2. Check color families (might be "Indigo Deep" instead of theme name)
3. Suggest it on GitHub

---

## 🎁 Tips & Tricks

### Q: What's a good theme for daytime coding?

A: Try:
- GitHub Light (clean, professional)
- Solarized Light (easy on eyes)
- Notion Light (minimal)
- Rosé Pine Light (elegant)

### Q: What's a good theme for nighttime coding?

A: Try:
- Low Blue Dark (reduces blue light)
- Dracula (dark, warm purple)
- Nord (cool, easy on eyes)
- Accessible Dark (high contrast)

### Q: How do I choose between similar themes?

A: Use the preview to compare:
1. Open two themes side-by-side
2. Look at the Codex mockup
3. Check if text is readable
4. See if accent color is appealing
5. Test in a different browser if unsure

### Q: Can I share my custom theme with my team?

A: Yes! Copy the config string and share:
- Email
- Slack message
- Team wiki/documentation
- GitHub repository README

Then your team can import directly!

---

## 🆘 Troubleshooting

### My theme colors look wrong after applying

**Solution:**
- Colors may vary by screen/monitor
- Adjust contrast slider ±10 points
- Restart Codex
- Try applying the theme again

### Text is too hard to read

**Solution:**
- Increase contrast to 70+
- Choose colors with more difference
- Use an accessibility-optimized theme
- Check your screen brightness

### Theme resets when I restart Codex

**Solution:**
- Make sure you clicked "Apply" in Settings
- Try importing again
- Check if theme saved properly

### I can't find the Import button

**Solution:**
- Look in Settings → Appearance
- Make sure you're in the right section
- Restart Codex and try again
- Contact Codex support if persists

### The config string doesn't work

**Solution:**
- Copy the entire string (not just part of it)
- Make sure you copied from "Config String" section
- Check for typos or extra spaces
- Try a different theme to test if import works

---

## 📞 Still Have Questions?

- **GitHub Issues**: [Report bugs or suggest features](https://github.com/yourusername/codex-themes/issues)
- **Email**: contact@example.com
- **Twitter**: [@codexthemes](https://twitter.com)

We're here to help! 🎨
