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
    console.log('Building static React website...');
    
    // 1. Create the build directory
    if (!fs.existsSync(BUILD_DIR)) {
      fs.mkdirSync(BUILD_DIR, { recursive: true });
    }
    
    // 2. Copy .htaccess with proper configuration
    const htaccessContent = `Options -MultiViews
RewriteEngine On
RewriteBase /

# Handle React routing
RewriteRule ^index\\.html$ - [L]
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
    
    // 3. Create directories for static assets
    fs.mkdirSync(path.join(BUILD_DIR, 'static', 'js'), { recursive: true });
    fs.mkdirSync(path.join(BUILD_DIR, 'static', 'css'), { recursive: true });
    fs.mkdirSync(path.join(BUILD_DIR, 'static', 'media'), { recursive: true });
    
    // 4. Copy all images
    copyDirectory('images', path.join(BUILD_DIR, 'images'));
    console.log('Copied all images');
    
    // 5. Fetch API data
    console.log('Fetching API data...');
    const [featuredPosts, recentPosts, allPosts] = await Promise.all([
      fetch('http://localhost:5000/api/posts/featured').then(res => res.json()),
      fetch('http://localhost:5000/api/posts/recent').then(res => res.json()),
      fetch('http://localhost:5000/api/posts').then(res => res.json())
    ]);
    
    // 6. Fetch individual blog posts
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
    
    // 7. Create CSS file with app styles
    const cssContent = `
/* Main CSS for the static build */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');

:root {
  --color-accent: #9D8F68;
  --color-charcoal: #333333;
  --color-white: #FFFFFF;
  --color-light: #F5F5F5;
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
  border: none;
  cursor: pointer;
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

/* Form Fields */
input, textarea, select {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Raleway', sans-serif;
}

textarea {
  height: 150px;
  resize: vertical;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
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
    
    fs.writeFileSync(path.join(BUILD_DIR, 'static', 'css', 'main.css'), cssContent);
    console.log('Created CSS file');
    
    // 8. Create a JavaScript bundle with React
    const jsContent = `
// This is a simple bundle of React code for the static site
// In a real project, you would use Webpack, Rollup, or a similar tool

// React code for the static site
(function() {
  // Store the data from the API
  window.siteData = {
    featuredPosts: ${JSON.stringify(featuredPosts)},
    recentPosts: ${JSON.stringify(recentPosts)},
    allPosts: ${JSON.stringify(allPosts)},
    individualPosts: ${JSON.stringify(individualPosts)}
  };

  // Utility functions
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // React Components
  const e = React.createElement;

  // Header Component
  const Header = () => {
    return e('header', null,
      e('div', { className: 'container nav-container' },
        e('a', { href: '/', className: 'logo' }, 
          'Blaire ', 
          e('span', null, 'Delanné')
        ),
        e('nav', null,
          e('ul', { id: 'nav-menu' },
            e('li', null, e('a', { href: '/' }, 'Home')),
            e('li', null, e('a', { href: '/about' }, 'About')),
            e('li', null, e('a', { href: '/experience' }, 'Experience')),
            e('li', null, e('a', { href: '/blog' }, 'Journal')),
            e('li', null, e('a', { href: '/contact' }, 'Contact'))
          )
        )
      )
    );
  };

  // Footer Component
  const Footer = () => {
    return e('footer', null,
      e('div', { className: 'container' },
        e('p', null, '© ' + new Date().getFullYear() + ' Blaire Delanné. All rights reserved.'),
        e('div', { className: 'social-links' },
          e('a', { href: 'https://instagram.com/blairedelanne', 'aria-label': 'Instagram' }, 'Instagram'),
          e('a', { href: 'mailto:info@blairedelanne.com', 'aria-label': 'Email' }, 'Email')
        )
      )
    );
  };

  // BlogCard Component
  const BlogCard = ({ post }) => {
    return e('div', { className: 'card' },
      e('img', { 
        src: post.coverImage, 
        alt: post.title,
        onClick: () => { window.location.href = '/blog/' + post.id; }
      }),
      e('div', { className: 'card-content' },
        e('div', { className: 'card-meta' },
          e('span', null, post.category),
          e('span', null, formatDate(post.publishedAt))
        ),
        e('h3', null, post.title),
        e('p', null, post.excerpt.substring(0, 120) + '...'),
        e('a', { href: '/blog/' + post.id }, 'Read More')
      )
    );
  };

  // Home Page Component
  const HomePage = () => {
    return e(React.Fragment, null,
      e(Header, null),
      e('section', { className: 'hero' },
        e('div', { className: 'container' },
          e('h1', null, 'Hospitality & Wine Expert'),
          e('p', null, 'With over a decade of experience in luxury hospitality and wine across three continents, I bring a unique perspective to every project.'),
          e('a', { href: '/contact', className: 'btn' }, 'Get in Touch')
        )
      ),
      e('section', { className: 'container' },
        e('h2', null, 'Latest Journal Entries'),
        e('div', { className: 'grid' },
          window.siteData.featuredPosts.map(post => 
            e(BlogCard, { key: post.id, post: post })
          )
        )
      ),
      e(Footer, null)
    );
  };

  // Blog Page Component
  const BlogPage = () => {
    return e(React.Fragment, null,
      e(Header, null),
      e('div', { className: 'container' },
        e('h1', { style: { marginTop: '40px' } }, 'Journal'),
        e('div', { className: 'grid' },
          window.siteData.allPosts.map(post => 
            e(BlogCard, { key: post.id, post: post })
          )
        )
      ),
      e(Footer, null)
    );
  };

  // Blog Post Page Component
  const BlogPostPage = () => {
    const postId = parseInt(window.location.pathname.split('/').pop());
    const post = window.siteData.individualPosts[postId];
    
    if (!post) {
      return e(React.Fragment, null,
        e(Header, null),
        e('div', { className: 'container blog-post' },
          e('h1', null, 'Post not found'),
          e('p', null, 'Sorry, the requested blog post could not be found.')
        ),
        e(Footer, null)
      );
    }
    
    return e(React.Fragment, null,
      e(Header, null),
      e('article', { className: 'blog-post' },
        e('div', { className: 'blog-header' },
          e('h1', null, post.title),
          e('div', { className: 'blog-meta' },
            e('span', null, formatDate(post.publishedAt)),
            post.location ? e('span', null, ' · ' + post.location) : null,
            post.category ? e('span', null, ' · ' + post.category) : null
          )
        ),
        e('div', { className: 'blog-content' },
          e('img', { src: post.coverImage, alt: post.title }),
          e('div', { dangerouslySetInnerHTML: { __html: post.content } })
        )
      ),
      e(Footer, null)
    );
  };

  // Contact Page Component
  const ContactPage = () => {
    return e(React.Fragment, null,
      e(Header, null),
      e('section', { className: 'container' },
        e('h1', { style: { marginTop: '40px' } }, 'Contact Me'),
        e('p', null, 'Please fill out the form below, and I\'ll get back to you as soon as possible.'),
        
        e('div', { className: 'grid', style: { gridTemplateColumns: '1fr 1fr' } },
          e('div', null,
            e('form', {
              id: 'contact-form',
              onSubmit: (event) => {
                event.preventDefault();
                alert('Thank you for your message. I will get back to you soon.');
                event.target.reset();
              }
            },
              e('label', { htmlFor: 'name' }, 'Name'),
              e('input', { type: 'text', id: 'name', name: 'name', required: true }),
              
              e('label', { htmlFor: 'email' }, 'Email'),
              e('input', { type: 'email', id: 'email', name: 'email', required: true }),
              
              e('label', { htmlFor: 'subject' }, 'Subject'),
              e('input', { type: 'text', id: 'subject', name: 'subject', required: true }),
              
              e('label', { htmlFor: 'message' }, 'Message'),
              e('textarea', { id: 'message', name: 'message', required: true }),
              
              e('button', { type: 'submit', className: 'btn' }, 'Send Message')
            )
          ),
          
          e('div', { style: { background: '#f5f5f5', padding: '30px', borderRadius: '8px' } },
            e('h3', null, 'Get in Touch'),
            e('p', null, 'I\'m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.'),
            
            e('h4', null, 'Email'),
            e('p', null, e('a', { href: 'mailto:info@blairedelanne.com' }, 'info@blairedelanne.com')),
            
            e('h4', null, 'Location'),
            e('p', null, 'Martinborough, Wairarapa, New Zealand'),
            
            e('h4', null, 'Social Media'),
            e('div', { className: 'social-links', style: { textAlign: 'left' } },
              e('a', { href: 'https://instagram.com/blairedelanne', style: { marginLeft: 0 } }, 'Instagram'),
              e('a', { href: 'mailto:info@blairedelanne.com' }, 'Email')
            )
          )
        )
      ),
      e(Footer, null)
    );
  };

  // Router
  function App() {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
      return e(HomePage, null);
    } else if (path === '/blog' || path === '/journal') {
      return e(BlogPage, null);
    } else if (path === '/contact') {
      return e(ContactPage, null);
    } else if (path.startsWith('/blog/') || path.startsWith('/journal/')) {
      return e(BlogPostPage, null);
    } else {
      return e(HomePage, null);
    }
  }

  // Render the app
  document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      e(App, null),
      document.getElementById('root')
    );
  });
})();`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'static', 'js', 'bundle.js'), jsContent);
    console.log('Created JS bundle');
    
    // 9. Create the index.html file
    const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blaire Delanné | Hospitality & Wedding Design Expert</title>
  <meta name="description" content="Blaire Delanné - Hospitality, Wedding Design, Travel & Fashion Expert in Martinborough, New Zealand. Discover professional consulting services and inspiration.">
  
  <link rel="stylesheet" href="/static/css/main.css">
  
  <!-- Load React -->
  <script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
  
  <!-- Load our React component -->
  <script src="/static/js/bundle.js" defer></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), indexHtml);
    console.log('Created index.html');
    
    // 10. Create copies for other routes
    const routes = ['blog', 'journal', 'contact', 'about', 'experience', 'specialties', 'gallery'];
    
    for (const route of routes) {
      fs.mkdirSync(path.join(BUILD_DIR, route), { recursive: true });
      fs.writeFileSync(path.join(BUILD_DIR, route, 'index.html'), indexHtml);
      console.log(`Created ${route}/index.html`);
    }
    
    // 11. Create nested routes for blog posts
    fs.mkdirSync(path.join(BUILD_DIR, 'blog'), { recursive: true });
    for (const id of allPostIds) {
      const postDir = path.join(BUILD_DIR, 'blog', id.toString());
      fs.mkdirSync(postDir, { recursive: true });
      fs.writeFileSync(path.join(postDir, 'index.html'), indexHtml);
    }
    console.log('Created blog post directories');
    
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