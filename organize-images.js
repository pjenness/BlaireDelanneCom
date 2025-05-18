import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import fetch from 'node-fetch';

const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Create folders
async function createFolders() {
  console.log('Creating organized image folders...');
  
  // Main folders
  await mkdir('images-organized', { recursive: true });
  await mkdir('images-organized/blog', { recursive: true });
  await mkdir('images-organized/gallery', { recursive: true });
  await mkdir('images-organized/about', { recursive: true });
  await mkdir('images-organized/hero', { recursive: true });
  await mkdir('images-organized/photoAlbum', { recursive: true });
  
  console.log('Folders created successfully');
}

// Get blog post data to use for image names
async function getBlogPostData() {
  console.log('Fetching blog post data...');
  
  const response = await fetch('http://localhost:5000/api/posts');
  const posts = await response.json();
  
  return posts;
}

// Format date for filenames: YYYY-MM-DD
function formatDate(dateString) {
  if (!dateString) return 'no-date';
  
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

// Clean title for filenames
function cleanTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Organize blog images with dates
async function organizeBlogImages(posts) {
  console.log('Organizing blog images...');
  
  for (const post of posts) {
    if (!post.coverImage) continue;
    
    const originalPath = '.' + post.coverImage;
    const originalFileName = path.basename(post.coverImage);
    const fileExt = path.extname(originalFileName);
    
    // Format the new filename with date and title
    const dateStr = post.publishedAt ? formatDate(post.publishedAt) : 'no-date';
    const cleanedTitle = cleanTitle(post.title);
    const newFileName = `${dateStr}-${cleanedTitle}${fileExt}`;
    
    // Copy the file with the new name
    try {
      if (fs.existsSync(originalPath)) {
        await copyFile(
          originalPath,
          `images-organized/blog/${newFileName}`
        );
        console.log(`  - Renamed: ${originalFileName} -> ${newFileName}`);
      } else {
        console.log(`  - Warning: Original file not found: ${originalPath}`);
      }
    } catch (error) {
      console.error(`  - Error copying ${originalPath}: ${error.message}`);
    }
  }
}

// Copy other images to their respective folders
async function copyOtherImages() {
  console.log('Copying other images...');
  
  // Define folders to copy
  const foldersToCopy = ['about', 'gallery', 'hero'];
  
  for (const folder of foldersToCopy) {
    try {
      const files = await readdir(`images/${folder}`);
      
      for (const file of files) {
        const srcPath = `images/${folder}/${file}`;
        const destPath = `images-organized/${folder}/${file}`;
        
        try {
          const fileStat = await stat(srcPath);
          if (fileStat.isFile()) {
            await copyFile(srcPath, destPath);
            console.log(`  - Copied: ${folder}/${file}`);
          }
        } catch (error) {
          console.error(`  - Error copying ${srcPath}: ${error.message}`);
        }
      }
    } catch (error) {
      console.error(`  - Error reading directory images/${folder}: ${error.message}`);
    }
  }
}

// Create sample structure for photoAlbum
async function createPhotoAlbumSample() {
  console.log('Creating photoAlbum sample structure...');
  
  // Create photo album categories
  await mkdir('images-organized/photoAlbum/travel', { recursive: true });
  await mkdir('images-organized/photoAlbum/fashion', { recursive: true });
  await mkdir('images-organized/photoAlbum/weddings', { recursive: true });
  await mkdir('images-organized/photoAlbum/hospitality', { recursive: true });
  
  console.log('Created photoAlbum category folders');
}

// Main function
async function main() {
  try {
    // Create organized folder structure
    await createFolders();
    
    // Get blog post data
    const posts = await getBlogPostData();
    
    // Organize blog images with dates in filenames
    await organizeBlogImages(posts);
    
    // Copy other images
    await copyOtherImages();
    
    // Create photoAlbum structure
    await createPhotoAlbumSample();
    
    console.log('\nImage organization complete!');
    console.log('The organized images are in the "images-organized" folder.');
    console.log('You can now replace the original "images" folder with this new structure.');
    
  } catch (error) {
    console.error('Error during image organization:', error);
  }
}

main();