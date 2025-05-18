import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

// Get current file directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    
    // 4. Create a basic CSS file for styling
    const cssDir = path.join(BUILD_DIR, 'assets', 'css');
    await mkdir(cssDir, { recursive: true });
    
    // Create a basic CSS file with essential styles
    const basicCss = `
/* Basic styling for the static site */
:root {
  --font-sans: 'Raleway', system-ui, sans-serif;
  --font-serif: 'Playfair Display', serif;
  --color-accent: #9D8F68;
  --color-charcoal: #333333;
  --color-light: #F5F5F5;
  --color-white: #FFFFFF;
}

body {
  font-family: var(--font-sans);
  color: var(--color-charcoal);
  line-height: 1.6;
  background-color: var(--color-light);
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  font-weight: 600;
}

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--color-accent-dark);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Navigation */
nav {
  background-color: var(--color-white);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  padding: 1rem 0;
}

/* Hero section */
.hero {
  background-color: var(--color-accent);
  color: var(--color-white);
  padding: 4rem 0;
  text-align: center;
}

/* Cards and blog posts */
.card {
  background-color: var(--color-white);
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

article img {
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

article img:hover {
  transform: scale(1.05);
}

/* Footer */
footer {
  background-color: var(--color-charcoal);
  color: var(--color-white);
  padding: 3rem 0;
}
`;
    
    await writeFile(path.join(cssDir, 'main.css'), basicCss);
    console.log('Created basic CSS assets');
    
    // 4.2 Create a basic JS file for functionality
    const jsDir = path.join(BUILD_DIR, 'assets', 'js');
    await mkdir(jsDir, { recursive: true });
    
    // Create a basic JS file with essential functionality
    const basicJs = `
// Basic functionality for the static site
document.addEventListener('DOMContentLoaded', function() {
  // Make all article images clickable
  const makeImagesClickable = function() {
    const articleImages = document.querySelectorAll('article img');
    articleImages.forEach(function(img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        const article = img.closest('article');
        if (article) {
          const links = article.querySelectorAll('a');
          for (let i = 0; i < links.length; i++) {
            const href = links[i].getAttribute('href');
            if (href && (href.includes('/blog/') || href.includes('/journal/'))) {
              window.location.href = href;
              break;
            }
          }
        }
      });
    });
  };
  
  makeImagesClickable();
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
`;
    
    await writeFile(path.join(jsDir, 'main.js'), basicJs);
    console.log('Created basic JS assets');
    
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
    
    // 6. Create a completely standalone index.html file for the static site
    // Read the client index.html template
    const clientIndexPath = path.join(__dirname, 'client', 'index.html');
    let indexContent = await readFile(clientIndexPath, 'utf8');
    
    // Insert our CSS and JS
    indexContent = indexContent.replace('</head>', `
  <link rel="stylesheet" href="assets/css/main.css">
  <script src="assets/js/main.js"></script>
  <script src="static-data/site-data.js"></script>
  <style>
    article img {
      cursor: pointer !important;
      transition: transform 0.3s ease;
    }
    article img:hover {
      transform: scale(1.05);
    }
    .hover-up {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .hover-up:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
  </style>
</head>`);
    
    // Add a direct HTML fallback instead of trying to load React dynamically
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blaire Delanné | Hospitality & Wedding Design Expert</title>
  <meta name="description" content="Blaire Delanné - Hospitality, Wedding Design, Travel & Fashion Expert in Martinborough, New Zealand. Discover professional consulting services and inspiration." />
  <link rel="stylesheet" href="assets/css/main.css">
  <style>
    body {
      font-family: 'Playfair Display', 'Raleway', system-ui, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    header {
      background-color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 20px 0;
    }
    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      font-weight: bold;
      color: #333;
      text-decoration: none;
    }
    .accent {
      color: #9D8F68;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    nav ul li {
      margin-left: 20px;
    }
    nav ul li a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s;
    }
    nav ul li a:hover {
      color: #9D8F68;
    }
    .hero {
      background-color: #9D8F68;
      color: white;
      padding: 80px 0;
      text-align: center;
    }
    .hero h1 {
      font-size: 48px;
      margin-bottom: 20px;
    }
    .hero p {
      font-size: 18px;
      max-width: 700px;
      margin: 0 auto 30px;
    }
    .btn {
      display: inline-block;
      padding: 12px 30px;
      background-color: #333;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    .btn:hover {
      background-color: #444;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
      margin: 60px 0;
    }
    .card {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
    .card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      cursor: pointer;
    }
    .card-content {
      padding: 20px;
    }
    .card-content h3 {
      margin-top: 0;
      font-size: 22px;
    }
    .card-content p {
      margin-bottom: 15px;
      color: #666;
    }
    .card-content a {
      color: #9D8F68;
      text-decoration: none;
      font-weight: 500;
    }
    footer {
      background-color: #333;
      color: white;
      padding: 60px 0;
      text-align: center;
    }
    footer a {
      color: #9D8F68;
      text-decoration: none;
    }
    .social-links {
      margin-top: 20px;
    }
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      font-size: 20px;
    }
  </style>
</head>`;

    // Replace the entire HTML with our static template
    indexContent = htmlTemplate;
    
    // Now add the body content with real data
    let bodyContent = `
<body>
  <header>
    <div class="container">
      <nav>
        <a href="index.html" class="logo">Blaire <span class="accent">Delanné</span></a>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="experience.html">Experience</a></li>
          <li><a href="blog.html">Journal</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Hospitality & Wine Expert</h1>
      <p>With over a decade of experience in luxury hospitality and wine across three continents, I bring a unique perspective to every project.</p>
      <a href="contact.html" class="btn">Get in Touch</a>
    </div>
  </section>

  <section class="container">
    <h2>Latest Journal Entries</h2>
    <div class="grid">
`;

    // Add featured posts data to the body content
    const staticData = JSON.parse(staticDataContent.replace('window.STATIC_DATA = ', '').replace(';', ''));
    const featuredPosts = staticData.featuredPosts;
    
    featuredPosts.forEach(post => {
      bodyContent += `
      <div class="card">
        <img src="${post.coverImage}" alt="${post.title}" onclick="window.location.href='blog.html?id=${post.id}'">
        <div class="card-content">
          <h3>${post.title}</h3>
          <p>${post.excerpt.substring(0, 120)}...</p>
          <a href="blog.html?id=${post.id}">Read More</a>
        </div>
      </div>`;
    });

    // Complete the body content
    bodyContent += `
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Blaire Delanné. All rights reserved.</p>
      <div class="social-links">
        <a href="https://instagram.com/blairedelanne" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
        <a href="mailto:info@blairedelanne.com" aria-label="Email"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
      </div>
    </div>
  </footer>

  <!-- Add JavaScript for handling basic navigation -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Make all card images clickable (already handled by onclick in the HTML)

      // Handle URL parameters for blog view
      const getUrlParameter = function(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
      };

      // Set up smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });
    });
  </script>
</body>
</html>`;

    // Add the body content to our template
    indexContent += bodyContent;

    // Add script to store data in a traditional way (not relying on fetch API overrides)
    const scriptContent = `
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
                window.location.href = blogPath;
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

    // Add script before closing body tag
    indexContent = indexContent.replace('</body>', scriptContent + '\n</body>');
    
    // Write the index.html file
    await writeFile(path.join(BUILD_DIR, 'index.html'), indexContent);
    console.log('Created modified index.html with static data and API overrides');
    
    console.log('\nBuild completed! Upload the contents of the "static-site" folder to your Apache server.');
  } catch (error) {
    console.error('Error:', error);
  }
}

build();