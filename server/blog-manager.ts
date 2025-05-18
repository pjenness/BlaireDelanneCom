import fs from 'fs';
import path from 'path';
import { Post, InsertPost } from '@shared/schema';

// Constants
const CONTENT_DIR = path.join(process.cwd(), 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');

// Make sure directories exist
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// Interface for blog post JSON files
interface BlogPostFile {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  category: string;
  location: string;
  featured: number;
  readTime: number;
  prevPostId: number | null;
  nextPostId: number | null;
}

// Convert Post to BlogPostFile format
function postToFileFormat(post: Post): BlogPostFile {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt.toISOString(),
    category: post.category,
    location: post.location,
    featured: post.featured,
    readTime: post.readTime,
    prevPostId: post.prevPostId,
    nextPostId: post.nextPostId
  };
}

// Convert BlogPostFile to Post format
function fileToPost(file: BlogPostFile): Post {
  return {
    id: file.id,
    title: file.title,
    slug: file.slug,
    excerpt: file.excerpt,
    content: file.content,
    coverImage: file.coverImage,
    publishedAt: new Date(file.publishedAt),
    category: file.category,
    location: file.location,
    featured: file.featured,
    readTime: file.readTime,
    prevPostId: file.prevPostId,
    nextPostId: file.nextPostId
  };
}

// Generate a filename for a blog post
function generateFilename(post: Post): string {
  // Extract date in YYYY-MM-DD format
  const date = post.publishedAt.toISOString().split('T')[0];
  
  // Create a slug from the title if not provided
  const slug = post.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  return `${date}-${slug}.json`;
}

// Save a single blog post to a file
export function saveBlogPost(post: Post): void {
  const filename = generateFilename(post);
  const filePath = path.join(BLOG_DIR, filename);
  const fileContent = postToFileFormat(post);
  
  fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2), 'utf8');
  console.log(`Saved blog post to ${filePath}`);
}

// Get a list of all blog post files
function getBlogPostFiles(): string[] {
  try {
    return fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.json'));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

// Load a single blog post from a file
function loadBlogPost(filename: string): Post | null {
  try {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const blogPostFile = JSON.parse(fileContent) as BlogPostFile;
    return fileToPost(blogPostFile);
  } catch (error) {
    console.error(`Error loading blog post from ${filename}:`, error);
    return null;
  }
}

// Load all blog posts from files
export function loadAllBlogPosts(): Post[] {
  const files = getBlogPostFiles();
  const posts: Post[] = [];
  
  for (const file of files) {
    const post = loadBlogPost(file);
    if (post) {
      posts.push(post);
    }
  }
  
  // Sort by publish date (newest first)
  return posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

// Export a function to migrate existing posts to files
export function exportPostsToFiles(posts: Post[]): void {
  console.log(`Exporting ${posts.length} posts to individual files...`);
  
  for (const post of posts) {
    saveBlogPost(post);
  }
  
  console.log('Export complete');
}