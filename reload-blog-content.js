const fs = require('fs');
const path = require('path');

// Define the path to the blog directory
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Function to read and load a blog post
function loadBlogPost(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Main function to process blog posts
function processBlogPosts() {
  // Check if the directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`Blog directory not found: ${BLOG_DIR}`);
    return;
  }

  // Get list of blog post files
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.json'));
  console.log(`Found ${files.length} blog post files`);

  // Process each file
  files.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);
    const post = loadBlogPost(filePath);
    
    if (post) {
      // We're just verifying that the content can be loaded correctly
      console.log(`Successfully loaded: ${post.title} (ID: ${post.id})`);
      
      // Output content length to verify we're getting the updated content
      console.log(`Content length: ${post.content.length} characters`);
      
      // Check if the post contains new images (look for _img02)
      if (post.content.includes('_img02')) {
        console.log(`✅ Post contains secondary images`);
      }
    }
  });
}

// Run the process
processBlogPosts();