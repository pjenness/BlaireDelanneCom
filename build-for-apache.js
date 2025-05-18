import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execPromise = promisify(exec);
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const BUILD_DIR = 'apache-build';

// Create the build directory if it doesn't exist
async function createBuildDir() {
  try {
    await mkdir(BUILD_DIR, { recursive: true });
    console.log(`Created ${BUILD_DIR} directory`);
  } catch (error) {
    console.error(`Error creating directory: ${error.message}`);
  }
}

// Copy the .htaccess file
async function copyHtaccess() {
  try {
    await copyFile('.htaccess', path.join(BUILD_DIR, '.htaccess'));
    console.log('Copied .htaccess file');
  } catch (error) {
    console.error(`Error copying .htaccess: ${error.message}`);
  }
}

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

// Copy the public directory (images, etc.)
async function copyPublicAssets() {
  try {
    await copyDir('client/public', BUILD_DIR);
    console.log('Copied public assets');
  } catch (error) {
    console.error(`Error copying public assets: ${error.message}`);
  }
}

// Copy the index.html file with fixed asset paths
async function copyIndexWithFixedPaths() {
  try {
    // First check if we have a build from the dev server
    const indexPath = 'dist/public/index.html';
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // Fix asset paths (remove leading slashes)
      indexContent = indexContent.replace(/src="\/assets\//g, 'src="assets/');
      indexContent = indexContent.replace(/href="\/assets\//g, 'href="assets/');
      
      fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), indexContent);
      console.log('Copied and fixed index.html');
    } else {
      // If no build exists, copy the template index.html
      await copyFile('client/index.html', path.join(BUILD_DIR, 'index.html'));
      console.log('Copied template index.html');
    }
  } catch (error) {
    console.error(`Error fixing index.html: ${error.message}`);
  }
}

// Copy the built assets
async function copyBuiltAssets() {
  try {
    const assetsDir = 'dist/public/assets';
    if (fs.existsSync(assetsDir)) {
      await copyDir(assetsDir, path.join(BUILD_DIR, 'assets'));
      console.log('Copied built assets');
    } else {
      console.log('No built assets found');
    }
  } catch (error) {
    console.error(`Error copying built assets: ${error.message}`);
  }
}

// Main build function
async function build() {
  try {
    console.log('Building Apache-ready website...');
    
    // Create build directory
    await createBuildDir();
    
    // Copy essential files
    await copyHtaccess();
    await copyPublicAssets();
    
    // Try to copy from an existing build if available
    await copyBuiltAssets();
    await copyIndexWithFixedPaths();
    
    console.log(`\nBuild completed! Upload the contents of the "${BUILD_DIR}" folder to your Apache server.`);
  } catch (error) {
    console.error(`Build failed: ${error.message}`);
  }
}

// Run the build
build();