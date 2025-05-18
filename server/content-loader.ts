import fs from 'fs';
import path from 'path';
import { Post, InsertPost } from '@shared/schema';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');

// Interface for blog post file format
interface BlogPostFile {
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
}

// Load all blog posts from individual files
export async function loadBlogPosts(): Promise<BlogPostFile[]> {
  try {
    // Make sure the directory exists
    if (!fs.existsSync(BLOG_DIR)) {
      console.log(`Blog directory not found at ${BLOG_DIR}, returning empty array`);
      return [];
    }
    
    // Read all files in the blog directory
    const files = fs.readdirSync(BLOG_DIR);
    
    // Filter for JSON files
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    // Read and parse each file
    const posts = jsonFiles.map(file => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent) as BlogPostFile;
    });
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Convert BlogPostFile to Post with proper types
export function convertFileToPost(file: BlogPostFile, id: number): Post {
  return {
    id,
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
    prevPostId: null,
    nextPostId: null
  };
}

// Save a blog post to a file
export async function saveBlogPost(post: InsertPost, id: number): Promise<void> {
  try {
    // Generate a filename based on date and title
    const date = post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : 
      new Date().toISOString().split('T')[0];
    
    const slug = post.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const fileName = `${date}-${slug}.json`;
    const filePath = path.join(BLOG_DIR, fileName);
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    }
    
    // Default image path if none provided
    const defaultCoverImage = `/images/blog/${date}-${slug}.jpg`;
    
    // Prepare the file content
    const fileContent: BlogPostFile = {
      title: post.title,
      slug: post.slug ?? slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage ?? defaultCoverImage,
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
      category: post.category,
      location: post.location,
      featured: post.featured ?? 0,
      readTime: post.readTime ?? 5
    };
    
    // Write the file
    fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
    console.log(`Blog post saved to file: ${filePath}`);
  } catch (error) {
    console.error('Error saving blog post to file:', error);
    throw error;
  }
}