// Script to check that image files exist for all blog posts
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const IMAGES_DIR = path.join(process.cwd(), 'images/blog');

// Get list of all image files
const imageFiles = fs.readdirSync(IMAGES_DIR)
  .filter(file => file.endsWith('.jpg'))
  .map(file => file.replace('.jpg', ''));

console.log(`Found ${imageFiles.length} image files`);

// Get list of all blog post files
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.json'))
  .map(file => file.replace('.json', ''));

console.log(`Found ${blogFiles.length} blog post files`);

// Find missing images
const missingImages = blogFiles.filter(blogFile => 
  !imageFiles.includes(blogFile));

console.log(`\nMissing images (${missingImages.length}):`);
missingImages.forEach(file => console.log(`- ${file}.jpg`));

// Now check the actual image paths in each post
console.log("\nChecking image paths in blog posts...");
let wrongPaths = 0;

for (const file of blogFiles) {
  const filePath = path.join(BLOG_DIR, `${file}.json`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const post = JSON.parse(fileContent);
  
  // Expected image path
  const expectedPath = `/images/blog/${file}.jpg`;
  
  // Check if image path is correct
  if (post.coverImage !== expectedPath) {
    console.log(`\nWrong image path in: ${file}.json`);
    console.log(`  Current path: ${post.coverImage}`);
    console.log(`  Expected path: ${expectedPath}`);
    wrongPaths++;
  }
}

console.log(`\nFound ${wrongPaths} posts with incorrect image paths`);

// Check if the changes were correctly applied by the fix-image-paths.js script
console.log("\nVerifying files exist for all paths...");
const contentFiles = fs.readdirSync(BLOG_DIR);
let missingFilesCount = 0;

for (const jsonFile of contentFiles) {
  try {
    const content = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, jsonFile), 'utf8'));
    const imagePath = content.coverImage;
    
    // Extract just the filename
    const imageFilename = imagePath.split('/').pop();
    
    // Check if the image file exists
    const imageExists = fs.existsSync(path.join(IMAGES_DIR, imageFilename));
    
    if (!imageExists) {
      console.log(`Image missing: ${imagePath} referenced in ${jsonFile}`);
      missingFilesCount++;
    }
  } catch (error) {
    console.error(`Error reading ${jsonFile}:`, error.message);
  }
}

console.log(`\nFound ${missingFilesCount} references to missing image files`);