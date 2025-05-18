// Tool to export all blog posts from the storage.ts file to individual JSON files
import { storage } from './server/storage.js';
import { exportPostsToFiles } from './server/blog-manager.js';

async function main() {
  try {
    // Get all posts from storage
    console.log('Fetching all blog posts from storage...');
    const posts = await storage.getPosts();
    
    // Export them to individual files
    exportPostsToFiles(posts);
    
    console.log(`\nSuccess! ${posts.length} blog posts have been exported to the content/blog directory.`);
    console.log('You can now edit these files individually to update your blog content.');
    
  } catch (error) {
    console.error('Error exporting blog posts:', error);
  }
}

main();