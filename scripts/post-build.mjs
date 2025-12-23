#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, '../out');

async function reorganizeOutput() {
  console.log('📦 Post-build: Reorganizing output files...\n');

  try {
    // Create backups of index files before moving them
    const thIndexPath = path.join(outDir, 'th', 'index.html');
    const enIndexPath = path.join(outDir, 'en', 'index.html');
    const thHtmlPath = path.join(outDir, 'th.html');
    const enHtmlPath = path.join(outDir, 'en.html');

    // 1. Copy /th/index.html to /th.html
    if (fs.existsSync(thIndexPath)) {
      fs.copyFileSync(thIndexPath, thHtmlPath);
      console.log('✓ Created /th.html from /th/index.html');
    }

    // 2. Copy /en/index.html to /en.html
    if (fs.existsSync(enIndexPath)) {
      fs.copyFileSync(enIndexPath, enHtmlPath);
      console.log('✓ Created /en.html from /en/index.html');
    }

    // 3. Set root index.html to en.html (default language)
    const rootIndexPath = path.join(outDir, 'index.html');
    if (fs.existsSync(enHtmlPath)) {
      fs.copyFileSync(enHtmlPath, rootIndexPath);
      console.log('✓ Created /index.html from /en.html (default)');
    }

    // 4. Create .htaccess for Apache routing
    const htaccessPath = path.join(outDir, '.htaccess');
    const htaccessContent = `<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Prevent direct access to hidden files and directories
    RewriteRule "^\\." - [F]
    
    # Route /th/ to /th.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^th/?$ /th.html [QSA,L]
    
    # Route /en/ to /en.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^en/?$ /en.html [QSA,L]
    
    # Route /th/... to /th/index.html or /th.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^th/(.+)$ /th/$1 [QSA,L]
    
    # Route /en/... to /en/index.html or /en.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^en/(.+)$ /en/$1 [QSA,L]
    
    # Route root to /en.html (default)
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} ^/?$
    RewriteRule ^(.*)$ /en.html [QSA,L]
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache control headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresDefault "access plus 1 week"
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType application/json "access plus 0 seconds"
    ExpiresByType image/svg+xml "access plus 1 week"
    ExpiresByType image/webp "access plus 1 month"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
`;

    fs.writeFileSync(htaccessPath, htaccessContent);
    console.log('✓ Created /.htaccess for Apache routing and security');

    console.log('\n✅ Post-build complete!\n');
    console.log('📋 Summary:');
    console.log('  - /th.html (from /th/index.html)');
    console.log('  - /en.html (from /en/index.html)');
    console.log('  - /index.html (default: en.html)');
    console.log('  - /.htaccess (Apache routing rules)');
    console.log('\n🌍 Access via:');
    console.log('  - https://www.prospira.co.th/ → /th.html');
    console.log('  - https://www.prospira.co.th/en/ → /en.html');
    console.log('  - https://www.prospira.co.th/th/ → /th.html\n');

  } catch (error) {
    console.error('❌ Post-build failed:', error);
    process.exit(1);
  }
}

reorganizeOutput();
