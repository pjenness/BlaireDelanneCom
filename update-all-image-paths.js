// Script to fix all image paths in the blog post files to match their filenames
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const IMAGES_DIR = path.join(process.cwd(), 'images/blog');

// Create a map of valid images
const validImages = {};
fs.readdirSync(IMAGES_DIR)
  .filter(file => file.endsWith('.jpg') && file.length > 10)
  .forEach(file => {
    validImages[file.replace('.jpg', '')] = true;
  });

console.log(`Found ${Object.keys(validImages).length} valid image files`);

// Process each blog post file
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.json'));

console.log(`Processing ${blogFiles.length} blog post files`);

let updateCount = 0;
for (const file of blogFiles) {
  const filePath = path.join(BLOG_DIR, file);
  const baseName = file.replace('.json', '');
  
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(content);
    
    // Check if this base name exists as an image
    if (validImages[baseName]) {
      const correctImagePath = `/images/blog/${baseName}.jpg`;
      
      // Only update if the path is different
      if (post.coverImage !== correctImagePath) {
        console.log(`Updating image for ${file}:`);
        console.log(`  From: ${post.coverImage}`);
        console.log(`  To:   ${correctImagePath}`);
        
        // Update the image path
        post.coverImage = correctImagePath;
        
        // Write the file back
        fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
        updateCount++;
      }
    } else {
      console.log(`Warning: No matching image found for ${baseName}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}: ${error.message}`);
  }
}

console.log(`\nUpdated image paths in ${updateCount} blog post files`);
console.log('Done!');