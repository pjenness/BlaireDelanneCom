// Script to export all blog posts to individual files
import { storage } from './server/storage.js';
import { exportPostsToFiles } from './server/blog-files.js';

async function main() {
  try {
    console.log('Fetching all blog posts from storage...');
    const posts = await storage.getPosts();
    
    console.log(`Found ${posts.length} blog posts`);
    exportPostsToFiles(posts);
    
    console.log('\nAll done! Your blog posts have been exported to the content/blog directory.');
    console.log('You can now edit these files directly to update your site content.');
  } catch (error) {
    console.error('Error exporting blog posts:', error);
  }
}

main();