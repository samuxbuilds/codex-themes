import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
// @ts-ignore - this is a worker file but we just want its functions
import { THEMES, buildOgSvg } from '../src/worker';

const OUT_DIR = path.resolve(process.cwd(), 'public/og');

async function generate() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const themes = Object.entries(THEMES);
  console.log(`Generating OG PNG images for ${themes.length} themes...`);

  let count = 0;
  for (const [id, theme] of themes) {
    const svg = buildOgSvg(theme, id);
    // Convert SVG to PNG
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(OUT_DIR, `${id}.png`));
    count++;
  }
  
  // Generate a fallback for unknown themes
  const defaultSvg = buildOgSvg(null, "codex-themes");
  const defaultImage = sharp(Buffer.from(defaultSvg)).png();
  
  await defaultImage.toFile(path.join(OUT_DIR, 'default.png'));
  await defaultImage.toFile(path.resolve(process.cwd(), 'public/og-image.png'));

  console.log(`Successfully generated ${count + 1} PNGs and updated public/og-image.png`);
}

generate().catch(console.error);
