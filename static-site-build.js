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
    
    // 4. Copy assets from dist if they exist
    const assetsDir = 'dist/public/assets';
    if (fs.existsSync(assetsDir)) {
      await copyDir(assetsDir, path.join(BUILD_DIR, 'assets'));
      console.log('Copied built assets');
    }
    
    // 5. Create static data file that's embedded in our site
    // Fetch all the data we need
    console.log('Fetching API data...');
    const [featuredPosts, recentPosts, featuredMain, galleryFeatured] = await Promise.all([
      fetch('http://localhost:5000/api/posts/featured').then(res => res.json()),
      fetch('http://localhost:5000/api/posts/recent').then(res => res.json()),
      fetch('http://localhost:5000/api/posts/featured/main').then(res => res.json()),
      fetch('http://localhost:5000/api/gallery/featured').then(res => res.json())
    ]);
    
    // Create a static data JavaScript file
    const staticDataContent = `// This file contains static data for the site
window.STATIC_DATA = {
  featuredPosts: ${JSON.stringify(featuredPosts, null, 2)},
  recentPosts: ${JSON.stringify(recentPosts, null, 2)},
  featuredMain: ${JSON.stringify(featuredMain, null, 2)},
  galleryFeatured: ${JSON.stringify(galleryFeatured, null, 2)}
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
      
      // Add our static data file
      indexContent = indexContent.replace('</head>',
        '  <script src="static-data/site-data.js"></script>\n  </head>');
      
      await writeFile(path.join(BUILD_DIR, 'index.html'), indexContent);
      console.log('Created modified index.html with static data');
    } else {
      console.log('No dist/public/index.html found - please run the Replit server first');
    }
    
    console.log('\nBuild completed! Upload the contents of the "static-site" folder to your Apache server.');
  } catch (error) {
    console.error('Error:', error);
  }
}

build();