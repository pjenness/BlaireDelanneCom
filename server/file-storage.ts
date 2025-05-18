import fs from 'fs';
import path from 'path';
import { 
  type Post, 
  type InsertPost,
  type GalleryImage,
  type InsertGalleryImage,
  type Comment,
  type InsertComment,
  type Subscriber,
  type InsertSubscriber,
  type ContactFormData,
  type ContactSubmission
} from "@shared/schema";
import { IStorage } from './storage';

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

// File-based storage implementation
export class FileStorage implements IStorage {
  private postId: number;
  private galleryImageId: number;
  private commentId: number;
  private subscriberId: number;
  private contactSubmissionId: number;
  
  constructor() {
    this.postId = 1;
    this.galleryImageId = 1;
    this.commentId = 1;
    this.subscriberId = 1;
    this.contactSubmissionId = 1;
    
    // Load existing posts to determine the next ID
    this.initializeIds();
  }
  
  // Initialize the next IDs based on existing files
  private initializeIds(): void {
    try {
      const posts = this.loadAllPosts();
      if (posts.length > 0) {
        // Find the highest ID and add 1
        this.postId = Math.max(...posts.map(post => post.id)) + 1;
      }
    } catch (error) {
      console.error('Error initializing IDs:', error);
    }
  }
  
  // Load all posts from JSON files
  private loadAllPosts(): Post[] {
    try {
      const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.json'));
      const posts: Post[] = [];
      
      for (const file of files) {
        try {
          const filePath = path.join(BLOG_DIR, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const data = JSON.parse(content);
          
          posts.push({
            ...data,
            publishedAt: new Date(data.publishedAt)
          });
        } catch (error) {
          console.error(`Error loading post from ${file}:`, error);
        }
      }
      
      return posts;
    } catch (error) {
      console.error('Error loading posts:', error);
      return [];
    }
  }
  
  // Save a post to a JSON file
  private savePost(post: Post): void {
    try {
      // Generate filename based on publish date and slug
      const date = post.publishedAt.toISOString().split('T')[0].replace(/-/g, '_');
      const filename = `${date}-${post.slug}.json`;
      const filePath = path.join(BLOG_DIR, filename);
      
      // Convert date to string for storage
      const fileContent = {
        ...post,
        publishedAt: post.publishedAt.toISOString()
      };
      
      fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2), 'utf8');
      console.log(`Saved post to ${filePath}`);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  }
  
  // Post operations
  async getPosts(category?: string): Promise<Post[]> {
    const posts = this.loadAllPosts();
    
    if (category && category !== "all") {
      return posts
        .filter(post => post.category.toLowerCase() === category.toLowerCase())
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    }
    
    return posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }
  
  async getPost(id: number): Promise<Post | undefined> {
    const posts = this.loadAllPosts();
    return posts.find(post => post.id === id);
  }
  
  async getFeaturedPosts(limit?: number): Promise<Post[]> {
    const posts = this.loadAllPosts();
    const featuredPosts = posts
      .filter(post => post.featured !== null && post.featured > 0)
      .sort((a, b) => (b.featured ?? 0) - (a.featured ?? 0));
    
    return limit ? featuredPosts.slice(0, limit) : featuredPosts;
  }
  
  async getRecentPosts(limit?: number): Promise<Post[]> {
    const posts = this.loadAllPosts();
    const sortedPosts = posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    
    return limit ? sortedPosts.slice(0, limit) : sortedPosts;
  }
  
  async createPost(post: InsertPost): Promise<Post> {
    const newPost: Post = { 
      ...post,
      id: this.postId++,
      publishedAt: new Date(post.publishedAt || new Date()),
      featured: post.featured || 0,
      readTime: post.readTime || 5,
      prevPostId: post.prevPostId || null,
      nextPostId: post.nextPostId || null
    };
    
    this.savePost(newPost);
    return newPost;
  }
  
  // Gallery operations
  async getGalleryImages(): Promise<GalleryImage[]> {
    // For this example, we're not implementing gallery file storage
    // In a complete implementation, you would create similar file-based storage
    return [];
  }
  
  async getFeaturedGalleryImages(): Promise<GalleryImage[]> {
    return [];
  }
  
  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const newImage: GalleryImage = { 
      ...image,
      id: this.galleryImageId++,
      createdAt: new Date(),
      featured: image.featured || 0
    };
    
    return newImage;
  }
  
  // Comments operations
  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return [];
  }
  
  async createComment(comment: InsertComment): Promise<Comment> {
    const newComment: Comment = { 
      ...comment,
      id: this.commentId++,
      createdAt: new Date()
    };
    
    return newComment;
  }
  
  // Newsletter operations
  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const newSubscriber: Subscriber = { 
      ...subscriber,
      id: this.subscriberId++,
      createdAt: new Date(),
      status: 'active'
    };
    
    return newSubscriber;
  }
  
  // Contact operations
  async createContactSubmission(submission: ContactFormData): Promise<ContactSubmission> {
    const id = this.contactSubmissionId++;
    const newSubmission: ContactSubmission = { 
      ...submission,
      id,
      submittedAt: new Date(),
      read: 0
    };
    
    return newSubmission;
  }
}