import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import fetch from 'node-fetch';

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const copyFile = promisify(fs.copyFile);
const readdir = promisify(fs.readdir);

const BUILD_DIR = 'static-site';

// Copy directory recursively
async function copyDir(src, dest) {
  const entries = await readdir(src, { withFileTypes: true });
  await mkdir(dest, { recursive: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

// Main build function
async function build() {
  try {
    console.log('Building static website...');
    
    // 1. Create the build directory
    await mkdir(BUILD_DIR, { recursive: true });
    
    // 2. Copy .htaccess with proper configuration
    const htaccessContent = `Options -MultiViews
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(blog|journal|about|experience|contact|specialties|gallery)/(.*)$ /index.html [L]
RewriteRule ^(blog|journal|about|experience|contact|specialties|gallery)$ /index.html [L]

# Fallback rule - for any other paths, redirect to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Set MIME types
AddType text/html .html .htm
AddType text/css .css
AddType application/javascript .js
AddType image/svg+xml .svg
AddType image/jpeg .jpg .jpeg
AddType image/png .png
AddType image/gif .gif`;
    
    await writeFile(path.join(BUILD_DIR, '.htaccess'), htaccessContent);
    console.log('Created .htaccess file');
    
    // 3. Copy public assets (images)
    await copyDir('client/public', BUILD_DIR);
    console.log('Copied public assets');
    
    // 3.5. Copy all images from the images directory
    await copyDir('images', path.join(BUILD_DIR, 'images'));
    console.log('Copied all images');
    
    // 4. Copy assets from dist if they exist
    const assetsDir = 'dist/public/assets';
    if (fs.existsSync(assetsDir)) {
      await copyDir(assetsDir, path.join(BUILD_DIR, 'assets'));
      console.log('Copied built assets');
    }
    
    // 5. Create static data file that's embedded in our site
    // Fetch all the data we need
    console.log('Fetching API data...');
    const [featuredPosts, recentPosts, featuredMain, galleryFeatured, allPosts] = await Promise.all([
      fetch('http://localhost:5000/api/posts/featured').then(res => res.json()),
      fetch('http://localhost:5000/api/posts/recent').then(res => res.json()),
      fetch('http://localhost:5000/api/posts/featured/main').then(res => res.json()),
      fetch('http://localhost:5000/api/gallery/featured').then(res => res.json()),
      fetch('http://localhost:5000/api/posts').then(res => res.json())
    ]);
    
    // Also fetch all individual blog posts so they can be accessed directly
    console.log('Fetching individual blog posts...');
    
    // Get all post IDs from the posts we already have
    const allPostIds = new Set();
    featuredPosts.forEach(post => allPostIds.add(post.id));
    recentPosts.forEach(post => allPostIds.add(post.id));
    if (featuredMain) allPostIds.add(featuredMain.id);
    
    // Fetch each individual post
    const individualPosts = {};
    for (const id of allPostIds) {
      console.log(`  - Fetching post ID ${id}`);
      const postData = await fetch(`http://localhost:5000/api/posts/${id}`).then(res => res.json());
      individualPosts[id] = postData;
    }
    
    // Create a static data JavaScript file
    const staticDataContent = `// This file contains static data for the site
window.STATIC_DATA = {
  featuredPosts: ${JSON.stringify(featuredPosts, null, 2)},
  recentPosts: ${JSON.stringify(recentPosts, null, 2)},
  featuredMain: ${JSON.stringify(featuredMain, null, 2)},
  galleryFeatured: ${JSON.stringify(galleryFeatured, null, 2)},
  individualPosts: ${JSON.stringify(individualPosts, null, 2)},
  allPosts: ${JSON.stringify(allPosts, null, 2)}
};`;
    
    await mkdir(path.join(BUILD_DIR, 'static-data'), { recursive: true });
    await writeFile(path.join(BUILD_DIR, 'static-data', 'site-data.js'), staticDataContent);
    console.log('Created static data file');
    
    // 6. Copy and modify the index.html file
    if (fs.existsSync('dist/public/index.html')) {
      let indexContent = await readFile('dist/public/index.html', 'utf8');
      
      // Fix asset paths
      indexContent = indexContent.replace(/src="\/assets\//g, 'src="assets/');
      indexContent = indexContent.replace(/href="\/assets\//g, 'href="assets/');
      
      // Ensure image paths are correct
      indexContent = indexContent.replace(/src="\/images\//g, 'src="images/');
      indexContent = indexContent.replace(/href="\/images\//g, 'href="images/');
      
      // Fix any absolute paths in event handlers
      indexContent = indexContent.replace(/href="\/journal\//g, 'href="journal/');
      indexContent = indexContent.replace(/href="\/blog\//g, 'href="blog/');
      indexContent = indexContent.replace(/navigate\("\/journal\//g, 'navigate("journal/');
      indexContent = indexContent.replace(/navigate\("\/blog\//g, 'navigate("blog/');
      
      // Add our static data file and override for API calls
      const staticDataScript = `
  <script src="static-data/site-data.js"></script>
  <script>
    // Override fetch to use our static data when API calls are made
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
      if (typeof url === 'string') {
        // Handle API endpoints with static data
        if (url.includes('/api/posts/featured/main')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(window.STATIC_DATA.featuredMain)
          });
        }
        if (url.includes('/api/posts/featured')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(window.STATIC_DATA.featuredPosts)
          });
        }
        if (url.includes('/api/posts/recent')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(window.STATIC_DATA.recentPosts)
          });
        }
        if (url.includes('/api/gallery/featured')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(window.STATIC_DATA.galleryFeatured)
          });
        }
        
        // Main blog page posts (all posts)
        if (url === '/api/posts' || url.match(/\\/api\\/posts\\?/)) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(window.STATIC_DATA.allPosts)
          });
        }
        
        // Handle individual blog post requests
        const postMatch = url.match(/\\/api\\/posts\\/(\\d+)/);
        if (postMatch && postMatch[1]) {
          const postId = parseInt(postMatch[1], 10);
          if (window.STATIC_DATA.individualPosts[postId]) {
            return Promise.resolve({
              ok: true,
              json: () => Promise.resolve(window.STATIC_DATA.individualPosts[postId])
            });
          }
        }
      }
      // Use original fetch for anything else
      return originalFetch.apply(this, arguments);
    };

    // Fix for client-side routing in static site
    document.addEventListener('DOMContentLoaded', function() {
      // Make all article images clickable
      const makeImagesClickable = function() {
        // Find all images inside articles that should be clickable
        const articleImages = document.querySelectorAll('article img');
        articleImages.forEach(function(img) {
          // Find the article parent
          const article = img.closest('article');
          if (article) {
            // Find the blog post ID from nearby links
            const links = article.querySelectorAll('a');
            let blogPath = '';
            for (let i = 0; i < links.length; i++) {
              const href = links[i].getAttribute('href');
              if (href && (href.startsWith('/blog/') || href.startsWith('blog/') || 
                           href.startsWith('/journal/') || href.startsWith('journal/'))) {
                blogPath = href;
                break;
              }
            }
            
            if (blogPath) {
              // Make the image and its container clickable
              img.style.cursor = 'pointer';
              const imgContainer = img.parentNode;
              if (imgContainer) {
                imgContainer.style.cursor = 'pointer';
                
                // Add click event to navigate to the blog post
                img.addEventListener('click', function(e) {
                  e.preventDefault();
                  // Navigate to the blog post
                  history.pushState(null, '', blogPath);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                });
              }
            }
          }
        });
      };
      
      // Run initially and whenever the DOM changes
      makeImagesClickable();
      
      // Use a MutationObserver to detect when new content is added
      const observer = new MutationObserver(function(mutations) {
        makeImagesClickable();
      });
      
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
      
      // Make all links work with the static site structure
      document.addEventListener('click', function(e) {
        // Find closest anchor tag
        let target = e.target;
        while (target && target.tagName !== 'A') {
          target = target.parentNode;
          if (!target) return;
        }
        
        // If it's an internal link
        if (target && target.href && target.href.includes(window.location.hostname)) {
          // Extract the path from the href
          const url = new URL(target.href);
          const path = url.pathname;
          
          // If it's a path that should be handled by client-side routing
          if (path.startsWith('/journal/') || path.startsWith('/blog/') || 
              path === '/about' || path === '/experience' || path === '/contact' || 
              path === '/specialties' || path === '/gallery') {
            
            e.preventDefault();
            
            // Update browser history and trigger route change
            history.pushState(null, '', path);
            
            // Trigger a popstate event to make the router update
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
        }
      });
    });
  </script>`;
      
      indexContent = indexContent.replace('</head>', staticDataScript + '\n  </head>');
      
      await writeFile(path.join(BUILD_DIR, 'index.html'), indexContent);
      console.log('Created modified index.html with static data and API overrides');
    } else {
      console.log('No dist/public/index.html found - please run the Replit server first');
    }
    
    console.log('\nBuild completed! Upload the contents of the "static-site" folder to your Apache server.');
  } catch (error) {
    console.error('Error:', error);
  }
}

build();