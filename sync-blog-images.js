// Script to ensure every blog post has a matching image
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const IMAGES_DIR = path.join(process.cwd(), 'images/blog');

// Get list of all blog post files
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.json'))
  .map(file => file.replace('.json', ''));

// Get list of all image files
const imageFiles = fs.readdirSync(IMAGES_DIR)
  .filter(file => file.endsWith('.jpg'))
  .map(file => file.replace('.jpg', ''));

// Find missing images
const missingImages = blogFiles.filter(blogFile => 
  !imageFiles.includes(blogFile));

console.log(`Found ${missingImages.length} blog posts without matching images`);

// Use existing images as sources for the missing ones
const sourceImages = fs.readdirSync(IMAGES_DIR)
  .filter(file => file.endsWith('.jpg'));

if (sourceImages.length === 0) {
  console.error('No source images available to copy');
  process.exit(1);
}

// Create missing images by copying from existing ones
let index = 0;
for (const missingImage of missingImages) {
  // Cycle through source images to distribute them
  const sourceImage = sourceImages[index % sourceImages.length];
  const targetPath = path.join(IMAGES_DIR, `${missingImage}.jpg`);
  
  fs.copyFileSync(
    path.join(IMAGES_DIR, sourceImage),
    targetPath
  );
  
  console.log(`Created: ${missingImage}.jpg`);
  index++;
}

console.log('All done! Every blog post now has a matching image.');
console.log('You can replace these with proper images later.');