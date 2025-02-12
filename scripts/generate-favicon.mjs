import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicons() {
  console.log('Generating favicons...');
  try {
    // Read the source image from public folder
    const sourceImage = path.join(__dirname, '..', 'public', 'epwery-favicon-gradient.png');
    const buffer = await fs.readFile(sourceImage);

    // Define favicon sizes
    const sizes = [16, 32, 48, 64, 128, 256];

    // Generate favicon.ico (multiple PNG files)
    for (const size of sizes) {
      await sharp(buffer)
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, '..', 'public', `favicon-${size}x${size}.png`));
    }

    // Generate icon.png (512x512)
    await sharp(buffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(__dirname, '..', 'public', 'icon.png'));

    // Generate apple-icon.png (180x180)
    await sharp(buffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(__dirname, '..', 'public', 'apple-icon.png'));

    console.log('✅ Favicon files generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons().catch(console.error);

