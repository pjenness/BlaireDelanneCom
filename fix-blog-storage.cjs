// Script to completely recreate the storage.ts file with dynamic loading from files
const fs = require('fs');
const path = require('path');

// Load blog posts from files
const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const files = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.json'));

// Process each file and gather replacement code
const blogPosts = [];
for (const file of files) {
  try {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(fileContent);
    
    // Add to our collection
    blogPosts.push(post);
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
}

// Sort posts by date (newest first)
blogPosts.sort((a, b) => {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
});

// Generate the initializeData method replacement
let initDataCode = `  private initializeData() {
    // Initialize posts from file data
    const posts = ${JSON.stringify(blogPosts, null, 2)};
    
    // Add each post to storage with proper IDs
    posts.forEach((post, index) => {
      // Convert the date string back to a Date object
      post.publishedAt = new Date(post.publishedAt);
      // Add to storage with ID matching array index + 1
      this.postsData.set(post.id || index + 1, post);
    });

    // Initialize gallery images
`;

// Now search for the gallery initialization code
const storageFile = fs.readFileSync(path.join(process.cwd(), 'server/storage.ts'), 'utf8');

// Extract the gallery initialization code
const galleryMatch = storageFile.match(/this\.createGalleryImage\({[\s\S]+?\}\);/g);
if (galleryMatch) {
  // Add all the gallery initialization code
  galleryMatch.forEach(match => {
    initDataCode += `    ${match}\n`;
  });
}

initDataCode += `  }`;

// Write out the code to a file for reference
fs.writeFileSync('storage-init-replacement.txt', initDataCode);
console.log(`Generated replacement code for storage.ts in storage-init-replacement.txt`);
console.log(`Processed ${blogPosts.length} blog posts`);

// Show some sample data for verification
console.log('\nSample blog post data:');
console.log(JSON.stringify(blogPosts[0], null, 2).substring(0, 300) + '...');