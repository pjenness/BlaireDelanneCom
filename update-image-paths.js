// Script to update all blog post cover images to use our category-based images
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Category-based image mapping
const CATEGORY_IMAGES = {
  'Fashion': '/images/blog/fashion-category.jpg',
  'Wedding': '/images/blog/wedding-category.jpg',
  'Travel': '/images/blog/travel-category.jpg',
  'Hospitality': '/images/blog/hospitality-category.jpg',
  'Personal': '/images/blog/personal-category.jpg'
};

// Get all blog posts
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.json'));

console.log(`Found ${blogFiles.length} blog post files`);

// Process each blog post
let updateCount = 0;
for (const file of blogFiles) {
  try {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(content);
    
    // Get the appropriate category image
    const categoryImage = CATEGORY_IMAGES[post.category] || CATEGORY_IMAGES.Personal;
    
    // Update the post's coverImage property
    if (post.coverImage !== categoryImage) {
      post.coverImage = categoryImage;
      fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
      updateCount++;
      console.log(`Updated ${file} to use ${categoryImage}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
}

console.log(`\nUpdated ${updateCount} blog post files with category images`);
console.log('Done!');