// Script to update blog post cover images to use date-based filenames
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Get all blog post files
const files = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.json'));

console.log(`Found ${files.length} blog post files to process`);

let updatedCount = 0;

// Process each file
files.forEach(filename => {
  const filePath = path.join(BLOG_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const post = JSON.parse(fileContent);
  
  // Extract date from filename (format: YYYY_MM_DD-slug.json)
  const fileMatch = filename.match(/^(\d{4}_\d{2}_\d{2})-(.+)\.json$/);
  if (!fileMatch) {
    console.log(`Skipping ${filename} - does not match expected format`);
    return;
  }
  
  // Get the date part and slug from filename
  const datePrefix = fileMatch[1];
  const slug = fileMatch[2];
  
  // Create the correct image path using the same date-based format
  const correctImagePath = `/images/blog/${datePrefix}-${slug}.jpg`;
  
  // Check if the current image path is already correct
  if (post.coverImage === correctImagePath) {
    console.log(`Image path already correct for ${filename}`);
    return;
  }
  
  // Update the cover image path
  const oldPath = post.coverImage;
  post.coverImage = correctImagePath;
  
  // Save the updated file
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
  updatedCount++;
  
  console.log(`Updated ${filename}: ${oldPath} -> ${correctImagePath}`);
});

console.log(`\nUpdated ${updatedCount} blog post files`);