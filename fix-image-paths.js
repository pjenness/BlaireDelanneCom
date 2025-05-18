// Script to fix image paths in blog posts to match the newly created image files
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const IMAGES_DIR = path.join(process.cwd(), 'images/blog');

// Get list of all blog post files
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.json'));

console.log(`Found ${blogFiles.length} blog post files to process`);

// Process each blog post file
let fixedCount = 0;
for (const file of blogFiles) {
  const filePath = path.join(BLOG_DIR, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const post = JSON.parse(fileContent);
  
  // Get the filename without extension
  const baseName = file.replace('.json', '');
  
  // Expected image path based on the filename
  const expectedImagePath = `/images/blog/${baseName}.jpg`;
  
  // Check if the post's coverImage doesn't match expected path
  if (post.coverImage !== expectedImagePath) {
    console.log(`Fixing image path in ${file}`);
    console.log(`  From: ${post.coverImage}`);
    console.log(`  To:   ${expectedImagePath}`);
    
    // Update the coverImage path
    post.coverImage = expectedImagePath;
    
    // Write the updated post back to the file
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
    fixedCount++;
  }
}

console.log(`Fixed image paths in ${fixedCount} blog post files`);
console.log('Done!');