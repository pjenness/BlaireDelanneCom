// Script to fix empty image files by copying good images to replace them
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'images/blog');

// Find all image files
const imageFiles = fs.readdirSync(IMAGES_DIR)
  .filter(file => file.endsWith('.jpg'));

// Find good source images (larger than 30KB)
const goodSourceImages = imageFiles.filter(file => {
  const stats = fs.statSync(path.join(IMAGES_DIR, file));
  return stats.size > 30000; // 30KB minimum
});

if (goodSourceImages.length === 0) {
  console.error('No good source images found!');
  process.exit(1);
}

console.log(`Found ${goodSourceImages.length} good source images to use`);

// Find problematic (tiny) images
let fixedCount = 0;
for (const file of imageFiles) {
  const filePath = path.join(IMAGES_DIR, file);
  const stats = fs.statSync(filePath);
  
  // If file is smaller than 1KB, it's likely broken
  if (stats.size < 1000) {
    // Pick a random good source image
    const sourceImage = goodSourceImages[Math.floor(Math.random() * goodSourceImages.length)];
    const sourcePath = path.join(IMAGES_DIR, sourceImage);
    
    console.log(`Fixing: ${file} (${stats.size} bytes)`);
    console.log(`  Copying from: ${sourceImage}`);
    
    // Copy the good image to replace the broken one
    fs.copyFileSync(sourcePath, filePath);
    fixedCount++;
  }
}

console.log(`\nFixed ${fixedCount} empty image files`);
console.log('Done!');