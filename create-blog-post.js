// Simple script to create a new blog post file
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Make sure directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// Generate a slug from title
function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// Format today's date as YYYY-MM-DD
function getFormattedDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Get the next available ID
function getNextId() {
  try {
    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.json'));
    
    if (files.length === 0) return 1;
    
    const ids = files.map(file => {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'));
        return content.id || 0;
      } catch {
        return 0;
      }
    });
    
    return Math.max(...ids) + 1;
  } catch (error) {
    console.error('Error getting next ID:', error);
    return 1;
  }
}

// Ask a question and get user input
function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

// Main function to create a new blog post
async function createBlogPost() {
  console.log('\n=== Create a New Blog Post ===\n');
  
  const title = await askQuestion('Title: ');
  const slug = generateSlug(title);
  const excerpt = await askQuestion('Excerpt (brief summary): ');
  const category = await askQuestion('Category (Fashion, Wedding, Travel, Hospitality, Personal): ');
  const location = await askQuestion('Location (New Zealand, Australia, New York): ');
  const readTime = await askQuestion('Read time in minutes: ');
  const featured = await askQuestion('Featured level (0 = not featured, 1-3 = featured, higher = more prominent): ');
  
  console.log('\nEnter content (HTML format). Type "END" on a new line when done:');
  let content = '';
  let contentLine = '';
  
  while (true) {
    contentLine = await askQuestion('');
    if (contentLine === 'END') break;
    content += contentLine + '\n';
  }
  
  const date = getFormattedDate();
  const id = getNextId();
  
  const blogPost = {
    id,
    title,
    slug,
    excerpt,
    content,
    coverImage: `/images/blog/${date}-${slug}.jpg`,
    publishedAt: new Date().toISOString(),
    category,
    location,
    featured: parseInt(featured || '0'),
    readTime: parseInt(readTime || '5'),
    prevPostId: null,
    nextPostId: null
  };
  
  const filename = `${date}-${slug}.json`;
  const filePath = path.join(BLOG_DIR, filename);
  
  fs.writeFileSync(filePath, JSON.stringify(blogPost, null, 2), 'utf8');
  
  console.log(`\nBlog post created successfully at: ${filePath}`);
  console.log(`\nRemember to add an image at: images/blog/${date}-${slug}.jpg`);
  
  rl.close();
}

createBlogPost().catch(error => {
  console.error('Error creating blog post:', error);
  rl.close();
});