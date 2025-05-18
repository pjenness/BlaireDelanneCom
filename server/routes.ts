import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from 'fs';
import path from 'path';
import { 
  insertSubscriberSchema, 
  contactFormSchema,
  type Post
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

// Constants for file storage
const CONTENT_DIR = path.join(process.cwd(), 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');

// Ensure directories exist
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// Helper function to load all blog posts
function loadAllBlogPosts(): Post[] {
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
      } catch (err) {
        console.error(`Error loading post from ${file}:`, err);
      }
    }
    
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Helper function to load a specific blog post by ID
function loadBlogPostById(id: number): Post | undefined {
  try {
    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.json'));
    
    for (const file of files) {
      try {
        const filePath = path.join(BLOG_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        if (data.id === id) {
          return {
            ...data,
            publishedAt: new Date(data.publishedAt)
          };
        }
      } catch (err) {
        console.error(`Error checking post in ${file}:`, err);
      }
    }
    
    return undefined;
  } catch (error) {
    console.error('Error loading blog post by ID:', error);
    return undefined;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const category = req.query.category as string;
      const allPosts = loadAllBlogPosts();
      
      // Filter by category if specified
      let posts = allPosts;
      if (category && category !== "all") {
        posts = allPosts.filter(post => 
          post.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Sort by date (newest first)
      posts = posts.sort((a, b) => 
        b.publishedAt.getTime() - a.publishedAt.getTime()
      );
      
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/featured", async (req, res) => {
    try {
      const allPosts = loadAllBlogPosts();
      
      // Filter featured posts and sort by featured value
      const featuredPosts = allPosts
        .filter(post => post.featured !== null && post.featured > 0)
        .sort((a, b) => (b.featured ?? 0) - (a.featured ?? 0));
      
      res.json(featuredPosts);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      res.status(500).json({ message: "Failed to fetch featured posts" });
    }
  });

  app.get("/api/posts/featured/main", async (req, res) => {
    try {
      const allPosts = loadAllBlogPosts();
      
      // Filter featured posts and sort by featured value
      const featuredPosts = allPosts
        .filter(post => post.featured !== null && post.featured > 0)
        .sort((a, b) => (b.featured ?? 0) - (a.featured ?? 0));
      
      if (featuredPosts.length > 0) {
        res.json(featuredPosts[0]);
      } else {
        res.json(null);
      }
    } catch (error) {
      console.error('Error fetching main featured post:', error);
      res.status(500).json({ message: "Failed to fetch featured post" });
    }
  });

  app.get("/api/posts/recent", async (req, res) => {
    try {
      const allPosts = loadAllBlogPosts();
      
      // Sort by date (newest first) and take the first 3
      const recentPosts = allPosts
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
        .slice(0, 3);
      
      res.json(recentPosts);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
      res.status(500).json({ message: "Failed to fetch recent posts" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      
      // Load post directly from file
      const post = loadBlogPostById(postId);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // Comments routes have been removed to simplify the application

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      // For simplicity, return an empty array for now
      // In a full implementation, this would load from gallery files
      res.json([]);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  app.get("/api/gallery/featured", async (req, res) => {
    try {
      // Sample gallery data for the featured gallery
      const featuredImages = [
        {
          id: 1,
          title: "Nature's Runway",
          imageUrl: "/images/gallery/natures-runway.jpg",
          description: "Outdoor wedding setup with natural elements",
          featured: 1,
          createdAt: new Date()
        },
        {
          id: 2,
          title: "Urban Elegance",
          imageUrl: "/images/gallery/urban-elegance.jpg",
          description: "City hotel event with modern design elements",
          featured: 1,
          createdAt: new Date()
        }
      ];
      
      res.json(featuredImages);
    } catch (error) {
      console.error('Error fetching featured gallery images:', error);
      res.status(500).json({ message: "Failed to fetch featured gallery images" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // In a full implementation, this would save to a file
      const subscriber = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...validatedData,
        subscribedAt: new Date(),
        active: 1
      };
      
      res.status(201).json({ success: true, message: "Successfully subscribed" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid email", 
          errors: fromZodError(error).message 
        });
      }
      console.error('Error creating subscription:', error);
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a full implementation, this would save to a file
      const submission = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...validatedData,
        submittedAt: new Date(),
        read: 0
      };
      
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully"
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Contact form error:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
