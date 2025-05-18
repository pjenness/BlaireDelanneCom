// Script to rename blog post and image files to a more cache-friendly format
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const IMAGES_DIR = path.join(process.cwd(), 'images/blog');

// Process blog post files
console.log("Processing blog post files...");
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.json'));

console.log(`Found ${blogFiles.length} blog post files`);

// Process each blog post file
let blogRenameCount = 0;
const blogMappings = {};

for (const file of blogFiles) {
  const filePath = path.join(BLOG_DIR, file);
  
  // Create new filename with underscores in date
  const newFilename = file.replace(/^(\d{4})-(\d{2})-(\d{2})/, '$1_$2_$3');
  
  if (newFilename !== file) {
    const newFilePath = path.join(BLOG_DIR, newFilename);
    
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(content);
    
    // Update the coverImage path
    const oldImagePath = post.coverImage;
    const newImageName = oldImagePath.replace(/\/images\/blog\/(\d{4})-(\d{2})-(\d{2})/, '/images/blog/$1_$2_$3');
    post.coverImage = newImageName;
    
    // Write the file with updated content
    fs.writeFileSync(newFilePath, JSON.stringify(post, null, 2));
    
    // Keep track of the rename mapping
    blogMappings[file] = newFilename;
    blogRenameCount++;
    
    // Delete the old file
    fs.unlinkSync(filePath);
    
    console.log(`Renamed: ${file} -> ${newFilename}`);
  }
}

console.log(`\nRenamed ${blogRenameCount} blog post files`);

// Process image files
console.log("\nProcessing image files...");
const imageFiles = fs.readdirSync(IMAGES_DIR)
  .filter(file => file.endsWith('.jpg') && !file.match(/^[\d]+\.jpg$/));

console.log(`Found ${imageFiles.length} image files`);

// Process each image file
let imageRenameCount = 0;

for (const file of imageFiles) {
  const filePath = path.join(IMAGES_DIR, file);
  
  // Create new filename with underscores in date
  const newFilename = file.replace(/^(\d{4})-(\d{2})-(\d{2})/, '$1_$2_$3');
  
  if (newFilename !== file) {
    const newFilePath = path.join(IMAGES_DIR, newFilename);
    
    // Copy the file to the new name
    fs.copyFileSync(filePath, newFilePath);
    
    // We'll keep the old files for backward compatibility
    imageRenameCount++;
    
    console.log(`Created: ${newFilename}`);
  }
}

console.log(`\nCreated ${imageRenameCount} new image files`);
console.log('Done!');