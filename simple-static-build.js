import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_DIR = 'static-site';

// Main build function
async function build() {
  try {
    console.log('Building simple static website...');
    
    // 1. Create the build directory
    if (!fs.existsSync(BUILD_DIR)) {
      fs.mkdirSync(BUILD_DIR, { recursive: true });
    }
    
    // 2. Copy .htaccess with proper configuration
    const htaccessContent = `Options -MultiViews
RewriteEngine On
RewriteBase /

# Serve HTML files without .html extension
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

# If the page doesn't exist, serve 404.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /404.html [L]

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
    
    // 3. Create assets directory
    fs.mkdirSync(path.join(BUILD_DIR, 'assets', 'css'), { recursive: true });
    fs.mkdirSync(path.join(BUILD_DIR, 'assets', 'js'), { recursive: true });
    
    // 4. Copy all images
    fs.mkdirSync(path.join(BUILD_DIR, 'images'), { recursive: true });
    copyDirectory('images', path.join(BUILD_DIR, 'images'));
    console.log('Copied all images');
    
    // 5. Create CSS file
    const cssContent = `
/* Basic styles for static site */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');

:root {
  --color-accent: #9D8F68;
  --color-charcoal: #333333;
  --color-white: #FFFFFF;
  --color-light: #F5F5F5;
}

* {
  box-sizing: border-box;
}

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

img {
  max-width: 100%;
  height: auto;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
header {
  background-color: var(--color-white);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  padding: 20px 0;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--color-charcoal);
  text-decoration: none;
}

.logo span {
  color: var(--color-accent);
}

nav ul {
  display: flex;
  list-style: none;
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

/* Hero */
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

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin: 60px 0;
}

/* Card */
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

.card-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 20px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.card h3 {
  margin-top: 0;
  font-size: 22px;
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

/* Contact Form */
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

/* Footer */
footer {
  background-color: var(--color-charcoal);
  color: var(--color-white);
  padding: 60px 0;
  text-align: center;
  margin-top: 60px;
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
  nav {
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
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
}`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'assets', 'css', 'main.css'), cssContent);
    console.log('Created CSS file');
    
    // 6. Create JS file
    const jsContent = `
// Simple JavaScript for the static site
document.addEventListener('DOMContentLoaded', function() {
  // Make all card images clickable
  document.querySelectorAll('.card-image img').forEach(function(img) {
    img.addEventListener('click', function() {
      const link = this.closest('.card').querySelector('a.read-more');
      if (link) {
        window.location.href = link.href;
      }
    });
  });
  
  // Add form submission handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message. I will get back to you soon.');
      this.reset();
    });
  }
});

// Format dates
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'assets', 'js', 'main.js'), jsContent);
    console.log('Created JS file');
    
    // 7. Fetch API data
    console.log('Fetching API data...');
    const [featuredPosts, allPosts] = await Promise.all([
      fetch('http://localhost:5000/api/posts/featured').then(res => res.json()),
      fetch('http://localhost:5000/api/posts').then(res => res.json())
    ]);
    
    // 8. Fetch individual blog posts
    console.log('Fetching individual blog posts...');
    
    // Get all post IDs 
    const allPostIds = new Set();
    featuredPosts.forEach(post => allPostIds.add(post.id));
    
    // Create an object to store individual posts
    const individualPosts = {};
    
    // Fetch each post individually
    for (const id of allPostIds) {
      console.log(`  - Fetching post ID ${id}`);
      const post = await fetch(`http://localhost:5000/api/posts/${id}`).then(res => res.json());
      individualPosts[id] = post;
    }
    
    // 9. Create index.html
    let indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blaire Delanné | Hospitality & Wedding Design Expert</title>
  <meta name="description" content="Blaire Delanné - Hospitality, Wedding Design, Travel & Fashion Expert in Martinborough, New Zealand. Discover professional consulting services and inspiration.">
  <link rel="stylesheet" href="/assets/css/main.css">
  <script src="/assets/js/main.js"></script>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <a href="/" class="logo">Blaire <span>Delanné</span></a>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/experience">Experience</a></li>
          <li><a href="/blog">Journal</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Hospitality & Wine Expert</h1>
      <p>With over a decade of experience in luxury hospitality and wine across three continents, I bring a unique perspective to every project.</p>
      <a href="/contact" class="btn">Get in Touch</a>
    </div>
  </section>

  <section class="container">
    <h2>Latest Journal Entries</h2>
    <div class="grid">`;
    
    // Add featured posts to index.html
    featuredPosts.forEach(post => {
      const date = new Date(post.publishedAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      
      indexHtml += `
      <div class="card">
        <div class="card-image">
          <img src="${post.coverImage}" alt="${post.title}">
        </div>
        <div class="card-content">
          <div class="card-meta">
            <span>${post.category}</span>
            <span>${date}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt.substring(0, 120)}...</p>
          <a href="/blog/${post.id}" class="read-more">Read More</a>
        </div>
      </div>`;
    });
    
    // Complete index.html
    indexHtml += `
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Blaire Delanné. All rights reserved.</p>
      <div class="social-links">
        <a href="https://instagram.com/blairedelanne">Instagram</a>
        <a href="mailto:info@blairedelanne.com">Email</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), indexHtml);
    console.log('Created index.html');
    
    // 10. Create blog.html
    let blogHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Journal | Blaire Delanné</title>
  <meta name="description" content="Read about Blaire Delanné's adventures in hospitality, wedding design, travel, and fashion.">
  <link rel="stylesheet" href="/assets/css/main.css">
  <script src="/assets/js/main.js"></script>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <a href="/" class="logo">Blaire <span>Delanné</span></a>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/experience">Experience</a></li>
          <li><a href="/blog">Journal</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="container">
    <h1 style="margin-top: 40px;">Journal</h1>
    <div class="grid">`;
    
    // Add all posts to blog.html
    allPosts.forEach(post => {
      const date = new Date(post.publishedAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      
      blogHtml += `
      <div class="card">
        <div class="card-image">
          <img src="${post.coverImage}" alt="${post.title}">
        </div>
        <div class="card-content">
          <div class="card-meta">
            <span>${post.category}</span>
            <span>${date}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt.substring(0, 120)}...</p>
          <a href="/blog/${post.id}" class="read-more">Read More</a>
        </div>
      </div>`;
    });
    
    // Complete blog.html
    blogHtml += `
    </div>
  </div>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Blaire Delanné. All rights reserved.</p>
      <div class="social-links">
        <a href="https://instagram.com/blairedelanne">Instagram</a>
        <a href="mailto:info@blairedelanne.com">Email</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'blog.html'), blogHtml);
    console.log('Created blog.html');
    
    // 11. Create individual blog posts
    fs.mkdirSync(path.join(BUILD_DIR, 'blog'), { recursive: true });
    
    for (const id in individualPosts) {
      const post = individualPosts[id];
      const date = new Date(post.publishedAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const postHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} | Blaire Delanné</title>
  <meta name="description" content="${post.excerpt}">
  <link rel="stylesheet" href="/assets/css/main.css">
  <script src="/assets/js/main.js"></script>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <a href="/" class="logo">Blaire <span>Delanné</span></a>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/experience">Experience</a></li>
          <li><a href="/blog">Journal</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <article class="blog-post">
    <div class="blog-header">
      <h1>${post.title}</h1>
      <div class="blog-meta">
        <span>${date}</span>
        ${post.location ? `<span> · ${post.location}</span>` : ''}
        ${post.category ? `<span> · ${post.category}</span>` : ''}
      </div>
    </div>
    <div class="blog-content">
      <img src="${post.coverImage}" alt="${post.title}">
      ${post.content}
    </div>
  </article>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Blaire Delanné. All rights reserved.</p>
      <div class="social-links">
        <a href="https://instagram.com/blairedelanne">Instagram</a>
        <a href="mailto:info@blairedelanne.com">Email</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
      
      fs.mkdirSync(path.join(BUILD_DIR, 'blog', id), { recursive: true });
      fs.writeFileSync(path.join(BUILD_DIR, 'blog', id, 'index.html'), postHtml);
    }
    console.log('Created individual blog posts');
    
    // 12. Create contact.html
    const contactHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact | Blaire Delanné</title>
  <meta name="description" content="Get in touch with Blaire Delanné for hospitality consulting, wedding design, or creative collaborations.">
  <link rel="stylesheet" href="/assets/css/main.css">
  <script src="/assets/js/main.js"></script>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <a href="/" class="logo">Blaire <span>Delanné</span></a>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/experience">Experience</a></li>
          <li><a href="/blog">Journal</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <section class="container">
    <h1 style="margin-top: 40px;">Contact Me</h1>
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
        <div class="social-links" style="text-align: left;">
          <a href="https://instagram.com/blairedelanne" style="margin-left: 0;">Instagram</a>
          <a href="mailto:info@blairedelanne.com">Email</a>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Blaire Delanné. All rights reserved.</p>
      <div class="social-links">
        <a href="https://instagram.com/blairedelanne">Instagram</a>
        <a href="mailto:info@blairedelanne.com">Email</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'contact.html'), contactHtml);
    console.log('Created contact.html');
    
    // 13. Create a 404 page
    const notFoundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | Blaire Delanné</title>
  <meta name="description" content="The page you are looking for could not be found.">
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <a href="/" class="logo">Blaire <span>Delanné</span></a>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/experience">Experience</a></li>
          <li><a href="/blog">Journal</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <section class="container" style="text-align: center; padding: 100px 0;">
    <h1>Page Not Found</h1>
    <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
    <a href="/" class="btn">Return to Homepage</a>
  </section>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Blaire Delanné. All rights reserved.</p>
      <div class="social-links">
        <a href="https://instagram.com/blairedelanne">Instagram</a>
        <a href="mailto:info@blairedelanne.com">Email</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
    
    fs.writeFileSync(path.join(BUILD_DIR, '404.html'), notFoundHtml);
    console.log('Created 404.html');
    
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