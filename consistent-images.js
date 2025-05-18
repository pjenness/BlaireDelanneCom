// Script to standardize all blog post images to use a consistent set of images
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const IMAGES_DIR = path.join(process.cwd(), 'images/blog');

// Create a mapping of consistent image filenames by categories
const CATEGORY_IMAGES = {
  'Fashion': 'fashion-category.jpg',
  'Wedding': 'wedding-category.jpg',
  'Travel': 'travel-category.jpg',
  'Hospitality': 'hospitality-category.jpg',
  'Personal': 'personal-category.jpg'
};

// Create the category images if they don't exist
console.log("Creating category images...");
const existingImages = fs.readdirSync(IMAGES_DIR)
  .filter(file => file.endsWith('.jpg'))
  .slice(0, 5);  // Get the first 5 images to use as category images

// Copy existing images to category images
Object.values(CATEGORY_IMAGES).forEach((categoryImage, index) => {
  const categoryImagePath = path.join(IMAGES_DIR, categoryImage);
  if (!fs.existsSync(categoryImagePath)) {
    const sourceImage = path.join(IMAGES_DIR, existingImages[index % existingImages.length]);
    fs.copyFileSync(sourceImage, categoryImagePath);
    console.log(`Created category image: ${categoryImage}`);
  }
});

// Process each blog post file
console.log("\nUpdating blog post image references...");
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.json'));

console.log(`Found ${blogFiles.length} blog post files`);

let updateCount = 0;
for (const file of blogFiles) {
  const filePath = path.join(BLOG_DIR, file);
  
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(content);
    
    // Get the appropriate category image
    const categoryImage = CATEGORY_IMAGES[post.category] || CATEGORY_IMAGES.Personal;
    const categoryImagePath = `/images/blog/${categoryImage}`;
    
    // Update the image path only if necessary
    if (post.coverImage !== categoryImagePath) {
      post.coverImage = categoryImagePath;
      
      // Write the file back
      fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
      updateCount++;
      
      console.log(`Updated ${file} to use ${categoryImage}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}: ${error.message}`);
  }
}

console.log(`\nUpdated image paths in ${updateCount} blog post files`);
console.log('Done!');