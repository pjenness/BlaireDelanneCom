// Script to debug image path issues
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const IMAGES_DIR = path.join(process.cwd(), 'images/blog');

// Get list of all blog post files
console.log("Checking all blog posts for image links...");

const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.json'));

console.log(`Found ${blogFiles.length} blog post files`);

// Check each post
for (const file of blogFiles) {
  const filePath = path.join(BLOG_DIR, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  let post;
  
  try {
    post = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error parsing ${file}: ${error.message}`);
    continue;
  }
  
  // Log the image information
  console.log(`\nPost: ${file}`);
  console.log(`Title: ${post.title}`);
  console.log(`Image path: ${post.coverImage}`);
  
  // Check if the image file exists physically
  const imageName = post.coverImage.split('/').pop();
  const imagePath = path.join(IMAGES_DIR, imageName);
  const imageExists = fs.existsSync(imagePath);
  
  if (!imageExists) {
    console.log(`ERROR: Image file "${imageName}" does not exist!`);
  } else {
    const stats = fs.statSync(imagePath);
    console.log(`Image size: ${stats.size} bytes`);
    if (stats.size < 1000) {
      console.log(`WARNING: Image file is too small (${stats.size} bytes)`);
    }
  }
}