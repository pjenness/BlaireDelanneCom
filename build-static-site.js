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
    
    // 3. Create asset directories
    const assetsDir = path.join(BUILD_DIR, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
      fs.mkdirSync(path.join(assetsDir, 'css'), { recursive: true });
      fs.mkdirSync(path.join(assetsDir, 'js'), { recursive: true });
    }
    
    // 4. Copy all images
    const imagesDir = path.join(BUILD_DIR, 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    copyDirectory('images', imagesDir);
    console.log('Copied all images');
    
    // 5. Create CSS file
    const cssContent = `
/* Main Styles for the Static Site */
:root {
  --color-accent: #9D8F68;
  --color-charcoal: #333333;
  --color-white: #FFFFFF;
  --color-light: #F5F5F5;
}

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');

body {
  font-family: 'Raleway', sans-serif;
  color: var(--color-charcoal);
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
}

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #86794f;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
header {
  background-color: var(--color-white);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--color-charcoal);
}

.logo span {
  color: var(--color-accent);
}

nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin-left: 30px;
}

nav ul li a {
  color: var(--color-charcoal);
  font-weight: 500;
}

nav ul li a:hover {
  color: var(--color-accent);
}

/* Hero Section */
.hero {
  background-color: var(--color-accent);
  color: var(--color-white);
  padding: 80px 0;
  text-align: center;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto 30px;
}

.btn {
  display: inline-block;
  background-color: var(--color-charcoal);
  color: var(--color-white);
  padding: 12px 30px;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #444;
  color: var(--color-white);
}

/* Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin: 60px 0;
}

/* Cards */
.card {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
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

.card h3 {
  margin-top: 0;
  font-size: 22px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

/* Blog Post */
.blog-post {
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;
}

.blog-header {
  text-align: center;
  margin-bottom: 40px;
}

.blog-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.blog-meta {
  color: #777;
  font-size: 14px;
}

.blog-content {
  font-size: 18px;
  line-height: 1.8;
}

.blog-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 30px 0;
}

/* Footer */
footer {
  background-color: var(--color-charcoal);
  color: var(--color-white);
  padding: 60px 0;
  text-align: center;
}

.social-links {
  margin-top: 20px;
}

.social-links a {
  display: inline-block;
  margin: 0 10px;
  color: var(--color-white);
}

.social-links a:hover {
  color: var(--color-accent);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
  }
  
  nav ul {
    margin-top: 20px;
  }
  
  nav ul li {
    margin-left: 15px;
    margin-right: 15px;
  }
  
  .hero h1 {
    font-size: 36px;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'assets', 'css', 'main.css'), cssContent);
    console.log('Created CSS file');
    
    // 6. Create JS file
    const jsContent = `
// Main JavaScript for the static site
document.addEventListener('DOMContentLoaded', function() {
  // Make all card images clickable
  document.querySelectorAll('.card img').forEach(function(img) {
    img.addEventListener('click', function() {
      const link = this.closest('.card').querySelector('a');
      if (link) {
        window.location.href = link.href;
      }
    });
  });

  // Handle URL params for blog posts
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  
  if (postId && document.getElementById('blog-container')) {
    renderBlogPost(postId);
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const navMenu = document.getElementById('nav-menu');
      navMenu.classList.toggle('show');
    });
  }
});

// Function to render a blog post based on ID
function renderBlogPost(id) {
  const post = postsData.find(p => p.id.toString() === id.toString());
  
  if (!post) {
    document.getElementById('blog-container').innerHTML = '<div class="blog-post"><h1>Post not found</h1><p>Sorry, the requested blog post could not be found.</p></div>';
    return;
  }
  
  const blogHTML = \`
    <article class="blog-post">
      <div class="blog-header">
        <h1>\${post.title}</h1>
        <div class="blog-meta">
          <span>\${formatDate(post.publishedAt)}</span>
          \${post.location ? \`<span> · \${post.location}</span>\` : ''}
          \${post.category ? \`<span> · \${post.category}</span>\` : ''}
        </div>
      </div>
      <div class="blog-content">
        <img src="\${post.coverImage}" alt="\${post.title}">
        \${post.content}
      </div>
    </article>
  \`;
  
  document.getElementById('blog-container').innerHTML = blogHTML;
}

// Helper function to format dates
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'assets', 'js', 'main.js'), jsContent);
    console.log('Created JS file');
    
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
    
    // 9. Create the index.html file with featured posts
    let indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blaire Delanné | Hospitality & Wedding Design Expert</title>
  <meta name="description" content="Blaire Delanné - Hospitality, Wedding Design, Travel & Fashion Expert in Martinborough, New Zealand. Discover professional consulting services and inspiration.">
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap">
</head>
<body>
  <header>
    <div class="container nav-container">
      <a href="index.html" class="logo">Blaire <span>Delanné</span></a>
      <nav>
        <ul id="nav-menu">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="experience.html">Experience</a></li>
          <li><a href="blog.html">Journal</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <button id="menu-toggle" class="menu-toggle">Menu</button>
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
    <div class="grid">`;
    
    // Add featured posts to index.html
    featuredPosts.forEach(post => {
      indexHtml += `
      <div class="card">
        <img src="${post.coverImage}" alt="${post.title}">
        <div class="card-content">
          <div class="card-meta">
            <span>${post.category}</span>
            <span>${new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt.substring(0, 120)}...</p>
          <a href="blog.html?id=${post.id}">Read More</a>
        </div>
      </div>`;
    });
    
    // Complete the index.html
    indexHtml += `
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Blaire Delanné. All rights reserved.</p>
      <div class="social-links">
        <a href="https://instagram.com/blairedelanne" aria-label="Instagram">Instagram</a>
        <a href="mailto:info@blairedelanne.com" aria-label="Email">Email</a>
      </div>
    </div>
  </footer>

  <script>
    // Store posts data for client-side use
    const postsData = ${JSON.stringify(allPosts)};
  </script>
  <script src="assets/js/main.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), indexHtml);
    console.log('Created index.html');
    
    // 10. Create the blog.html file for individual blog posts
    let blogHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog | Blaire Delanné</title>
  <meta name="description" content="Read Blaire Delanné's journal about hospitality, wedding design, travel, and fashion experiences.">
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap">
</head>
<body>
  <header>
    <div class="container nav-container">
      <a href="index.html" class="logo">Blaire <span>Delanné</span></a>
      <nav>
        <ul id="nav-menu">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="experience.html">Experience</a></li>
          <li><a href="blog.html">Journal</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <button id="menu-toggle" class="menu-toggle">Menu</button>
      </nav>
    </div>
  </header>

  <div id="blog-container" class="container">
    <h1>Journal</h1>
    <div class="grid">`;
    
    // Add all posts to blog.html
    allPosts.forEach(post => {
      blogHtml += `
      <div class="card">
        <img src="${post.coverImage}" alt="${post.title}">
        <div class="card-content">
          <div class="card-meta">
            <span>${post.category}</span>
            <span>${new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt.substring(0, 120)}...</p>
          <a href="blog.html?id=${post.id}">Read More</a>
        </div>
      </div>`;
    });
    
    // Complete the blog.html
    blogHtml += `
    </div>
  </div>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Blaire Delanné. All rights reserved.</p>
      <div class="social-links">
        <a href="https://instagram.com/blairedelanne" aria-label="Instagram">Instagram</a>
        <a href="mailto:info@blairedelanne.com" aria-label="Email">Email</a>
      </div>
    </div>
  </footer>

  <script>
    // Store posts data for client-side use
    const postsData = ${JSON.stringify(individualPosts)};
  </script>
  <script src="assets/js/main.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'blog.html'), blogHtml);
    console.log('Created blog.html');
    
    // 11. Create a basic contact.html without the telephone link
    let contactHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact | Blaire Delanné</title>
  <meta name="description" content="Get in touch with Blaire Delanné for hospitality consulting, wedding design, or speaking engagements.">
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap">
  <style>
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin: 60px 0;
    }
    
    .contact-form input,
    .contact-form textarea {
      width: 100%;
      padding: 12px;
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: 'Raleway', sans-serif;
    }
    
    .contact-form textarea {
      height: 150px;
    }
    
    .contact-info {
      background-color: var(--color-light);
      padding: 30px;
      border-radius: 8px;
    }
    
    .contact-info h3 {
      margin-top: 0;
    }
    
    .contact-info p {
      margin-bottom: 20px;
    }
    
    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container nav-container">
      <a href="index.html" class="logo">Blaire <span>Delanné</span></a>
      <nav>
        <ul id="nav-menu">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="experience.html">Experience</a></li>
          <li><a href="blog.html">Journal</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <button id="menu-toggle" class="menu-toggle">Menu</button>
      </nav>
    </div>
  </header>

  <section class="container">
    <h1>Contact Me</h1>
    <p>Please fill out the form below, and I'll get back to you as soon as possible.</p>
    
    <div class="contact-grid">
      <div class="contact-form">
        <form id="contact-form">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
          
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
          
          <label for="subject">Subject</label>
          <input type="text" id="subject" name="subject" required>
          
          <label for="message">Message</label>
          <textarea id="message" name="message" required></textarea>
          
          <button type="submit" class="btn">Send Message</button>
        </form>
      </div>
      
      <div class="contact-info">
        <h3>Get in Touch</h3>
        <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
        
        <h4>Email</h4>
        <p><a href="mailto:info@blairedelanne.com">info@blairedelanne.com</a></p>
        
        <h4>Location</h4>
        <p>Martinborough, Wairarapa, New Zealand</p>
        
        <h4>Social Media</h4>
        <div class="social-links">
          <a href="https://instagram.com/blairedelanne" aria-label="Instagram">Instagram</a>
          <a href="mailto:info@blairedelanne.com" aria-label="Email">Email</a>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Blaire Delanné. All rights reserved.</p>
      <div class="social-links">
        <a href="https://instagram.com/blairedelanne" aria-label="Instagram">Instagram</a>
        <a href="mailto:info@blairedelanne.com" aria-label="Email">Email</a>
      </div>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
  <script>
    // Simple form handler
    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message. I will get back to you soon.');
      this.reset();
    });
  </script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'contact.html'), contactHtml);
    console.log('Created contact.html');
    
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