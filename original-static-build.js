import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

// Get current file directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_DIR = 'static-site';

// Main build function
async function build() {
  try {
    console.log('Building static website...');
    
    // 1. Create the build directory
    if (!fs.existsSync(BUILD_DIR)) {
      fs.mkdirSync(BUILD_DIR, { recursive: true });
    }
    
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
    
    fs.writeFileSync(path.join(BUILD_DIR, '.htaccess'), htaccessContent);
    console.log('Created .htaccess file');
    
    // 3. Copy public assets
    if (fs.existsSync('client/public')) {
      copyDirectory('client/public', BUILD_DIR);
      console.log('Copied public assets');
    }
    
    // 4. Copy all images
    if (fs.existsSync('images')) {
      copyDirectory('images', path.join(BUILD_DIR, 'images'));
      console.log('Copied all images');
    }
    
    // 5. Copy assets from dist if they exist
    if (fs.existsSync('dist/client/assets')) {
      copyDirectory('dist/client/assets', path.join(BUILD_DIR, 'assets'));
      console.log('Copied built assets');
    }
    
    // 6. Create a directory for static data
    if (!fs.existsSync(path.join(BUILD_DIR, 'static-data'))) {
      fs.mkdirSync(path.join(BUILD_DIR, 'static-data'), { recursive: true });
    }
    
    // 7. Fetch API data
    console.log('Fetching API data...');
    const [featuredPosts, recentPosts, allPosts] = await Promise.all([
      fetch('http://localhost:5000/api/posts/featured').then(res => res.json()),
      fetch('http://localhost:5000/api/posts/recent').then(res => res.json()),
      fetch('http://localhost:5000/api/posts').then(res => res.json())
    ]);
    
    // 8. Fetch individual blog posts
    console.log('Fetching individual blog posts...');
    
    // Get all post IDs from the posts we already have
    const allPostIds = new Set();
    featuredPosts.forEach(post => allPostIds.add(post.id));
    recentPosts.forEach(post => allPostIds.add(post.id));
    
    // Create an object to store individual posts
    const individualPosts = {};
    
    // Fetch each post individually
    for (const id of allPostIds) {
      console.log(`  - Fetching post ID ${id}`);
      const post = await fetch(`http://localhost:5000/api/posts/${id}`).then(res => res.json());
      individualPosts[id] = post;
    }
    
    // 9. Create the static data file
    const staticData = {
      featuredPosts,
      recentPosts,
      allPosts,
      individualPosts
    };
    
    fs.writeFileSync(
      path.join(BUILD_DIR, 'static-data', 'site-data.js'), 
      `window.STATIC_DATA = ${JSON.stringify(staticData)};`
    );
    console.log('Created static data file');
    
    // 10. Create the index.html file
    let indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blaire Delanné | Hospitality & Wedding Design Expert</title>
  <meta name="description" content="Blaire Delanné - Hospitality, Wedding Design, Travel & Fashion Expert in Martinborough, New Zealand. Discover professional consulting services and inspiration.">
  
  <!-- Include React -->
  <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
  
  <!-- Include Tailwind CSS -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2/dist/tailwind.min.css" rel="stylesheet">
  
  <!-- Include Site Data -->
  <script src="/static-data/site-data.js"></script>
  
  <style>
    /* Basic styles */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');
    
    :root {
      --font-sans: 'Raleway', sans-serif;
      --font-serif: 'Playfair Display', serif;
      --color-accent: #9D8F68;
      --color-charcoal: #333333;
    }
    
    body {
      font-family: var(--font-sans);
      color: var(--color-charcoal);
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-serif);
    }
    
    .hover-up {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .hover-up:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    
    /* Override for clickable images */
    article img {
      cursor: pointer !important;
      transition: transform 0.3s ease;
    }
    
    article img:hover {
      transform: scale(1.05);
    }
  </style>
  
  <!-- Script to handle API calls and routing -->
  <script>
    // Override fetch to use static data
    window.addEventListener('DOMContentLoaded', function() {
      const originalFetch = window.fetch;
      
      window.fetch = function(url, options) {
        if (typeof url === 'string') {
          // Handle API requests with static data
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
        
        // Fallback to original fetch for other requests
        return originalFetch.apply(this, arguments);
      };
      
      // Handle client-side routing
      document.addEventListener('click', function(e) {
        // Find closest anchor tag
        let target = e.target;
        while (target && target.tagName !== 'A') {
          target = target.parentNode;
          if (!target) return;
        }
        
        // If it's an internal link
        if (target && target.href && target.href.includes(window.location.hostname)) {
          // Extract the path
          const url = new URL(target.href);
          const path = url.pathname;
          
          // If it's a route we want to handle client-side
          if (path.startsWith('/blog/') || 
              path.startsWith('/journal/') || 
              path === '/about' || 
              path === '/experience' || 
              path === '/contact' || 
              path === '/specialties' || 
              path === '/gallery') {
            
            e.preventDefault();
            
            // Update URL without reload
            history.pushState(null, '', path);
            
            // Trigger router update
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
        }
      });
      
      // Make images clickable
      const makeImagesClickable = function() {
        document.querySelectorAll('article img').forEach(function(img) {
          img.style.cursor = 'pointer';
          
          const article = img.closest('article');
          if (article) {
            const links = article.querySelectorAll('a');
            let blogPath = '';
            
            for (let i = 0; i < links.length; i++) {
              const href = links[i].getAttribute('href');
              if (href && (href.startsWith('/blog/') || href.startsWith('/journal/'))) {
                blogPath = href;
                break;
              }
            }
            
            if (blogPath) {
              img.addEventListener('click', function() {
                window.location.href = blogPath;
              });
            }
          }
        });
      };
      
      // Run once and also set up observer
      setTimeout(makeImagesClickable, 1000);
      
      const observer = new MutationObserver(function() {
        setTimeout(makeImagesClickable, 100);
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  </script>
</head>
<body>
  <div id="root"></div>
  
  <!-- Include your bundled assets -->
  <script src="/assets/index.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), indexHtml);
    console.log('Created index.html');
    
    console.log('\nBuild completed! Upload the contents of the "static-site" folder to your Apache server.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Helper function to copy directories recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

build();