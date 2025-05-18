import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import fetch from 'node-fetch';

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

async function main() {
  try {
    console.log('Creating static API data files...');
    
    // Create the directories
    await mkdir('apache-build/api', { recursive: true });
    await mkdir('apache-build/api/posts', { recursive: true });
    await mkdir('apache-build/api/gallery', { recursive: true });
    await mkdir('apache-build/api/posts/featured', { recursive: true });
    
    // Fetch featured posts
    console.log('Fetching featured posts...');
    const featuredRes = await fetch('http://localhost:5000/api/posts/featured');
    const featuredData = await featuredRes.json();
    await writeFile(
      'apache-build/api/posts/featured/index.json',
      JSON.stringify(featuredData)
    );
    
    // Fetch recent posts
    console.log('Fetching recent posts...');
    const recentRes = await fetch('http://localhost:5000/api/posts/recent');
    const recentData = await recentRes.json();
    await writeFile(
      'apache-build/api/posts/recent/index.json',
      JSON.stringify(recentData)
    );
    
    // Fetch main featured post
    console.log('Fetching main featured post...');
    const mainRes = await fetch('http://localhost:5000/api/posts/featured/main');
    const mainData = await mainRes.json();
    await writeFile(
      'apache-build/api/posts/featured/main/index.json',
      JSON.stringify(mainData)
    );
    
    // Fetch featured gallery images
    console.log('Fetching gallery images...');
    const galleryRes = await fetch('http://localhost:5000/api/gallery/featured');
    const galleryData = await galleryRes.json();
    await writeFile(
      'apache-build/api/gallery/featured/index.json',
      JSON.stringify(galleryData)
    );
    
    console.log('Static API data files created successfully!');
    
    // Now create a modified .htaccess to handle JSON files
    const htaccessContent = `Options -MultiViews
RewriteEngine On
RewriteBase /

# Serve .json files properly
<Files *.json>
  ForceType application/json
</Files>

# Rewrite API calls to use the static JSON files
RewriteRule ^api/posts/featured$ api/posts/featured/index.json [L]
RewriteRule ^api/posts/recent$ api/posts/recent/index.json [L]
RewriteRule ^api/posts/featured/main$ api/posts/featured/main/index.json [L]
RewriteRule ^api/gallery/featured$ api/gallery/featured/index.json [L]

# Handle client-side routing
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Set MIME types
AddType text/html .html .htm
AddType text/css .css
AddType application/javascript .js
AddType application/json .json
AddType image/svg+xml .svg
AddType image/jpeg .jpg .jpeg
AddType image/png .png
AddType image/gif .gif

# Set default permissions
<FilesMatch ".(html|htm|js|css|svg|jpg|jpeg|png|gif|ico|json)$">
  Header set Access-Control-Allow-Origin "*"
</FilesMatch>`;
    
    await writeFile('apache-build/.htaccess', htaccessContent);
    console.log('Created modified .htaccess file for handling API requests');
    
    console.log('\nDone! Upload the contents of the "apache-build" folder to your Apache server.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();