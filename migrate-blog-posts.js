// Script to extract all blog posts from storage.ts and save as individual files
import fs from 'fs';
import path from 'path';

// Constants
const STORAGE_FILE = path.join(process.cwd(), 'server/storage.ts');
const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Make sure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// Read the storage.ts file
const storageContent = fs.readFileSync(STORAGE_FILE, 'utf8');

// Regular expression to match blog post entries
const postRegex = /this\.createPost\(\{([\s\S]*?)\}\);/g;

// Extract and process each post
const extractPosts = () => {
  const posts = [];
  let match;
  
  while ((match = postRegex.exec(storageContent)) !== null) {
    try {
      const postContent = match[1];
      
      // Extract post fields using regex
      const title = extractField(postContent, 'title');
      const slug = extractField(postContent, 'slug');
      const excerpt = extractField(postContent, 'excerpt');
      const content = extractField(postContent, 'content');
      const coverImage = extractField(postContent, 'coverImage');
      const publishedAtStr = extractField(postContent, 'publishedAt');
      const category = extractField(postContent, 'category');
      const location = extractField(postContent, 'location');
      const featured = extractNumber(postContent, 'featured');
      const readTime = extractNumber(postContent, 'readTime');
      
      // Parse date from publishedAt
      const publishedAt = publishedAtStr 
        ? publishedAtStr.match(/new Date\("([^"]+)"\)/) 
        : null;
      
      const dateStr = publishedAt ? publishedAt[1] : new Date().toISOString();
      
      // Create post object
      const post = {
        id: posts.length + 1,
        title,
        slug,
        excerpt,
        content,
        coverImage,
        publishedAt: dateStr,
        category,
        location,
        featured: parseInt(featured || '0'),
        readTime: parseInt(readTime || '5'),
        prevPostId: null,
        nextPostId: null
      };
      
      posts.push(post);
    } catch (error) {
      console.error('Error processing post:', error);
    }
  }
  
  return posts;
};

// Extract field value from post content
const extractField = (content, fieldName) => {
  const regex = new RegExp(`${fieldName}:\\s*\`?(.*?)\`?,\\s*(?=\\w+:|$)`, 's');
  const match = content.match(regex);
  
  if (!match) return '';
  
  // If field value is wrapped in template literals (backticks)
  if (content.includes(`${fieldName}: \``)) {
    const backticksRegex = new RegExp(`${fieldName}:\\s*\`([\\s\\S]*?)\`\\s*,\\s*(?=\\w+:|$)`);
    const backticksMatch = content.match(backticksRegex);
    return backticksMatch ? backticksMatch[1] : '';
  }
  
  return match[1].replace(/^["'`]|["'`],?$/g, '');
};

// Extract numeric field
const extractNumber = (content, fieldName) => {
  const regex = new RegExp(`${fieldName}:\\s*(\\d+)`);
  const match = content.match(regex);
  return match ? match[1] : '0';
};

// Generate filename from post data
const generateFilename = (post) => {
  const date = new Date(post.publishedAt).toISOString().split('T')[0];
  const slug = post.slug.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `${date}-${slug}.json`;
};

// Save post to file
const savePost = (post) => {
  const filename = generateFilename(post);
  const filePath = path.join(BLOG_DIR, filename);
  
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');
  console.log(`Saved post: ${filename}`);
};

// Main execution
console.log('Extracting blog posts from storage.ts...');
const posts = extractPosts();
console.log(`Found ${posts.length} posts`);

// Save all posts
posts.forEach(savePost);

console.log('\nMigration complete!');
console.log(`All blog posts have been exported to: ${BLOG_DIR}`);
console.log('You can now edit these files directly to update your blog content.');