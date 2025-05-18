// Script to clean up excess image files, keeping only the ones with underscores
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'images/blog');

// Get all image files
const imageFiles = fs.readdirSync(IMAGES_DIR)
  .filter(file => file.endsWith('.jpg'));

console.log(`Found ${imageFiles.length} total image files`);

// Group files by their base name (without date format)
const imageGroups = {};
for (const file of imageFiles) {
  // Skip the numbered fallback images
  if (/^\d+\.jpg$/.test(file)) {
    continue;
  }
  
  // Extract the base part of the filename after the date
  const basePart = file.replace(/^\d{4}[-_]\d{2}[-_]\d{2}-/, '');
  
  if (!imageGroups[basePart]) {
    imageGroups[basePart] = [];
  }
  imageGroups[basePart].push(file);
}

// Process each group
let deletedCount = 0;
for (const basePart in imageGroups) {
  const files = imageGroups[basePart];
  
  if (files.length > 1) {
    // Sort files to prefer underscored versions
    files.sort((a, b) => {
      const aHasUnderscore = a.includes('_');
      const bHasUnderscore = b.includes('_');
      
      // Keep files with underscores
      if (aHasUnderscore && !bHasUnderscore) return -1;
      if (!aHasUnderscore && bHasUnderscore) return 1;
      
      // Otherwise sort alphabetically
      return a.localeCompare(b);
    });
    
    // Keep the first file (preferred version) and delete others
    const keepFile = files[0];
    console.log(`Keeping: ${keepFile}`);
    
    for (let i = 1; i < files.length; i++) {
      const deleteFile = files[i];
      const deletePath = path.join(IMAGES_DIR, deleteFile);
      fs.unlinkSync(deletePath);
      console.log(`  Deleted: ${deleteFile}`);
      deletedCount++;
    }
  }
}

// Delete numbered files
const numberedFiles = imageFiles.filter(file => /^\d+\.jpg$/.test(file));
for (const file of numberedFiles) {
  const filePath = path.join(IMAGES_DIR, file);
  fs.unlinkSync(filePath);
  console.log(`Deleted numbered file: ${file}`);
  deletedCount++;
}

console.log(`\nDeleted ${deletedCount} excess image files`);
console.log('Done!');