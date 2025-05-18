import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSubscriberSchema, 
  contactFormSchema 
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const category = req.query.category as string;
      const posts = await storage.getPosts(category);
      
      // Fix image paths on posts before sending response
      const fixedPosts = posts.map(post => {
        // Get date from publishedAt
        const date = new Date(post.publishedAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // Create date-formatted image path based on the post slug
        const formattedDate = `${year}_${month}_${day}`;
        post.coverImage = `/images/blog/${formattedDate}-${post.slug}.jpg`;
        
        return post;
      });
      
      res.json(fixedPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/featured", async (req, res) => {
    try {
      const featuredPosts = await storage.getFeaturedPosts();
      
      // Fix image paths on featured posts
      const fixedPosts = featuredPosts.map(post => {
        // Get date from publishedAt
        const date = new Date(post.publishedAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // Create date-formatted image path
        const formattedDate = `${year}_${month}_${day}`;
        post.coverImage = `/images/blog/${formattedDate}-${post.slug}.jpg`;
        
        return post;
      });
      
      res.json(fixedPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured posts" });
    }
  });

  app.get("/api/posts/featured/main", async (req, res) => {
    try {
      const posts = await storage.getFeaturedPosts(1);
      
      if (posts.length > 0) {
        const post = posts[0];
        
        // Fix image path on main featured post
        const date = new Date(post.publishedAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // Create date-formatted image path
        const formattedDate = `${year}_${month}_${day}`;
        post.coverImage = `/images/blog/${formattedDate}-${post.slug}.jpg`;
        
        res.json(post);
      } else {
        res.json(null);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured post" });
    }
  });

  app.get("/api/posts/recent", async (req, res) => {
    try {
      const recentPosts = await storage.getRecentPosts(3);
      
      // Fix image paths on recent posts
      const fixedPosts = recentPosts.map(post => {
        // Get date from publishedAt
        const date = new Date(post.publishedAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // Create date-formatted image path
        const formattedDate = `${year}_${month}_${day}`;
        post.coverImage = `/images/blog/${formattedDate}-${post.slug}.jpg`;
        
        return post;
      });
      
      res.json(fixedPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent posts" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      
      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Fix the image path for the individual blog post
      const date = new Date(post.publishedAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      // Create date-formatted image path
      const formattedDate = `${year}_${month}_${day}`;
      post.coverImage = `/images/blog/${formattedDate}-${post.slug}.jpg`;
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // Comments routes have been removed to simplify the application

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const galleryImages = await storage.getGalleryImages();
      res.json(galleryImages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  app.get("/api/gallery/featured", async (req, res) => {
    try {
      const featuredImages = await storage.getFeaturedGalleryImages();
      res.json(featuredImages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured gallery images" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      const subscriber = await storage.createSubscriber(validatedData);
      res.status(201).json({ success: true, message: "Successfully subscribed" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid email", 
          errors: fromZodError(error).message 
        });
      }
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store submission in our database/storage
      const submission = await storage.createContactSubmission(validatedData);
      
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
