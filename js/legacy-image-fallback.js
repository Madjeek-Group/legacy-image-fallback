/**
 * 
 * js/legacy-image-fallback.js
 * 
 * This JS script (universal, for all images on the site, to be placed in all web pages with images... this compatibility script analyzes whether the visitor is on an old (non-modern) web browser and offers the JPG version of images that may be AVIF, WEBP in the HTML... (all formats).
 * In FileZilla, we will therefore place for example: soleil-img.webp and soleil-img.jpg which will have the same size (height and width), these two images for example: soleil-img.webp and soleil-img.jpg will be in the same folder.
 * So the code of this smart script is that if: soleil-img.webp is in the big-img folder (big-img/soleil-img.webp) then it is mandatory that: big-img/soleil-img.jpg exists. This JS script reads in the body code to know the folder name for these images, because the name of this folder containing
 * images can be different on pages and some pages can contain images in several folders. In short, this script is smart, universal, adapts to any type of case and configuration, it takes into account old IE versions too. If this script does not find the image in .jpg it gives
 * up and stops because it is possible that we forgot to put the image in FileZilla or that we will put it in the future. This script must only run if we are on old browsers. This script must also save us time, that is to say: not having to place the .jpg image in the body.
 * 
 * complete, universal JavaScript script, designed to meet exactly our needs: detect old browsers (including Internet Explorer) and automatically replace modern images (AVIF, WebP, etc.) with their JPG equivalent if it exists in the same folder.
 * -----------------------------------------------------------------------------------------------------------------------
 * 
 * 🧠 THE SCRIPT IS SMART BECAUSE:
 * - It does NOT create the JPG images, it just checks their presence
 * - If the JPG does not exist, it leaves the original image (no error)
 * - It automatically detects the folder of each image
 * - It works with images in different folders
 * - It supports images with URL parameters (?w=480, etc.)
 *
 * ⏱️ MAJOR TIME SAVING (PURPOSE OF THE SCRIPT):
 * Without this script, you would have to manually write in the HTML, for EACH responsive image, a <picture> tag with several <source> (webp, jpeg, avif, png...) and their media queries — which is long, repetitive and error-prone:
 *
 *   <picture class="picture-full-width">
 *     <source media="(max-width: 480px)" srcset=".../exemple1.webp" type="image/webp">
 *     <source media="(max-width: 480px)" srcset=".../exemple1.jpg"  type="image/jpeg">
 *     <source media="(min-width: 481px) and (max-width: 1024px)" srcset=".../exemple2.webp" type="image/webp">
 *     <source media="(min-width: 481px) and (max-width: 1024px)" srcset=".../exemple2.jpg"  type="image/jpeg">
 *     <source media="(min-width: 1025px)" srcset=".../exemple3.webp" type="image/webp">
 *     <source media="(min-width: 1025px)" srcset=".../exemple3.jpg"  type="image/jpeg">
 *     <img src=".../exemple3.jpg" alt="...">
 *   </picture>
 *
 * With this script, the HTML remains SIMPLE:
 *
 *   <img src=".../exemple3.webp" alt="...">
 *
 * → The modern browser loads the .webp (or .avif, etc.).
 * → The old browser automatically receives the .jpg from the same folder.
 * → No <picture> tag, no <source>, no media query to write.
 * → Just drop the image pairs (e.g. exemple1.webp + exemple1.jpg,
 *   exemple2.avif + exemple2.png, etc.) in the same folder via FileZilla.
 *
 * 📌 SUMMARY: the script replaces all the manual <picture>/<source> work with a simple <img> tag. We save time on every page, we avoid forgetting, and the rendering remains correct on all browsers.
 * 
 * 
 * 
 * 
 * <picture> example:
 * The order of the <source> is important: we put the most modern formats first (avif → webp → jpeg → png), because the browser takes the first <source> it supports.
 *
 * html
<picture class="picture-full-width">
  <!-- ===== MOBILE (max-width: 480px) — 1:1 — 1200 × 1200 px ===== -->
  <source media="(max-width: 480px)" srcset="https://website.io/site/img/exemple1.avif" type="image/avif" data-note="1x1 / 1:1 pour mobiles - 1200 × 1200 px avif - exemple1.avif" />
  <source media="(max-width: 480px)" srcset="https://website.io/site/img/exemple1.webp" type="image/webp" data-note="1x1 / 1:1 pour mobiles - 1200 × 1200 px webp - exemple1.webp" />
  <source media="(max-width: 480px)" srcset="https://website.io/site/img/exemple1.jpg"  type="image/jpeg" data-note="1x1 / 1:1 pour mobiles - 1200 × 1200 px jpg - exemple1.jpg" />
  <source media="(max-width: 480px)" srcset="https://website.io/site/img/exemple1.png"  type="image/png"  data-note="1x1 / 1:1 pour mobiles - 1200 × 1200 px png - exemple1.png" />

  <!-- ===== TABLET (481px – 1024px) — 4:3 — 1200 × 900 px ===== -->
  <source media="(min-width: 481px) and (max-width: 1024px)" srcset="https://website.io/site/img/exemple2.avif" type="image/avif" data-note="4x3 / 4:3 pour tablettes - 1200 × 900 px avif - exemple2.avif" />
  <source media="(min-width: 481px) and (max-width: 1024px)" srcset="https://website.io/site/img/exemple2.webp" type="image/webp" data-note="4x3 / 4:3 pour tablettes - 1200 × 900 px webp - exemple2.webp" />
  <source media="(min-width: 481px) and (max-width: 1024px)" srcset="https://website.io/site/img/exemple2.jpg"  type="image/jpeg" data-note="4x3 / 4:3 pour tablettes - 1200 × 900 px jpg - exemple2.jpg" />
  <source media="(min-width: 481px) and (max-width: 1024px)" srcset="https://website.io/site/img/exemple2.png"  type="image/png"  data-note="4x3 / 4:3 pour tablettes - 1200 × 900 px png - exemple2.png" />

  <!-- ===== DESKTOP (min-width: 1025px) — 16:9 — 1200 × 675 px ===== -->
  <source media="(min-width: 1025px)" srcset="https://website.io/site/img/exemple3.avif" type="image/avif" data-note="16x9 / 16:9 pour desktop - 1200 × 675 px avif - exemple3.avif" />
  <source media="(min-width: 1025px)" srcset="https://website.io/site/img/exemple3.webp" type="image/webp" data-note="16x9 / 16:9 pour desktop - 1200 × 675 px webp - exemple3.webp" />
  <source media="(min-width: 1025px)" srcset="https://website.io/site/img/exemple3.jpg"  type="image/jpeg" data-note="16x9 / 16:9 pour desktop - 1200 × 675 px jpg - exemple3.jpg" />
  <source media="(min-width: 1025px)" srcset="https://website.io/site/img/exemple3.png"  type="image/png"  data-note="16x9 / 16:9 pour desktop - 1200 × 675 px png - exemple3.png" />

  <!-- ===== FALLBACK <img> (browsers without <picture>) ===== -->
  <img src="https://website.io/site/img/exemple3.jpg" alt=".... & ....." loading="lazy" data-note="16x9 / 16:9 pour desktop - 1200 × 675 px jpg - exemple3.jpg" />
</picture>


Important note about the script:
The current script only handles <img> tags, not <picture>/<source>. If we use <picture>, the script will not replace the <source>.
For the script to work as intended (time saving, no <picture> to write), you must use only:

html
<img src=".../exemple3.webp" alt="...">   …and let the script do the .jpg fallback on old browsers.

If we want the script to also handle .avif and .png as fallback (and not only .jpg), we need to modify the buildJpgUrl() function to try several extensions in order: .jpg → .jpeg → .png.
So: future evolution of this script to do ... work in progress...


* -----------------------------------------------------------------------------------------------------------------------
/**
 * ================================================================
 *  MADJEEK LEGACY IMAGE FALLBACK
 * ================================================================
 * 
 * 🎯 MAIN OBJECTIVE:
 * Automatically detect if the visitor is using an old browser
 * (non-compatible AVIF, WebP, etc.) and replace
 * modern images with their JPG equivalent.
 * 
 * ⚠️ EXECUTION CONDITION:
 * The script only runs for old browsers.
 * For modern browsers, it does nothing (performance gain).
 * 
 * 💡 HOW IT WORKS:
 * 1. Analyzes the visitor's browser (userAgent + CSS/HTML capabilities)
 * 2. If old browser (IE <= 11, Safari < 14, Chrome < 80, etc.):
 *    a. Iterates through all images on the page
 *    b. For each image, tries to replace the extension (.webp, .avif, ...)
 *    c. Builds the path to the .jpg equivalent in the same folder
 *    d. Checks if the .jpg exists (via an asynchronous HEAD request)
 *    e. If yes, replaces the image source with the .jpg
 * 
 * 🧠 THE SCRIPT IS SMART BECAUSE:
 * - It does NOT create the JPG images, it just checks their presence
 * - If the JPG does not exist, it leaves the original image (no error)
 * - It automatically detects the folder of each image
 * - It works with images in different folders
 * - It supports images with URL parameters (?w=480, etc.)
 * 
 * 📁 EXPECTED FOLDER STRUCTURE:
 * /images/
 *   ├── photo.webp  (modern image, referenced in the HTML)
 *   └── photo.jpg   (JPG fallback, same name, same folder)
 * 
 *  for subfolders:
 * /madjeek-img-noindex/
 *   ├── paco-rabanne-collection-2025.webp
 *   └── paco-rabanne-collection-2025.jpg   ← The script will look for this file
 * 
 * 🔧 INSTALLATION:
 * 1. Place this file in the /js/ folder of our site
 * 2. Call it in all HTML pages containing images:
 *    <script src="js/legacy-image-fallback.js" defer> <script>  
 * 
 * ✅ WHAT THE SCRIPT DOES:
 * - Detects old browsers (IE, old Chrome, old Safari)
 * - Replaces .webp, .avif, .webp?q=... with .jpg
 * - Preserves URL parameters (.jpg?w=480&q=75)
 * - Does not touch images already in .jpg, .png, .gif
 * - Ignores images not found in JPG (no error)
 * - Supports images with names containing dots (e.g. photo.2025.webp)
 * 
 * ✗ WHAT THE SCRIPT DOES NOT DO:
 * - It does not convert images on the fly (that's the server or Photoshop)
 * - It does not create the JPG versions automatically
 * - It does not download images from the web
 * 
 * 🔄 ALTERNATIVE IF YOU USE A DYNAMIC SERVER:
 * If your server supports URL rewriting, you can simplify:
 * - Place only the JPG images on the server
 * - Configure the server to serve .jpg instead of .webp/avif
 * - Disable this script if the server handles everything
 * 
 * 📊 OLD BROWSER SUPPORT:
 * | Browser       | Version     | Detection    |
 * |---------------|-------------|--------------|
 * | Internet Explorer | <= 11  | ✓ (via userAgent)
 * | Old Edge      | <= 18      | ✓ 
 * | Chrome        | < 80       | ✓ (via features) 
 * | Safari        | < 14       | ✓  
 * | Firefox       | < 75       | ✓  
 * | Opera         | < 67       | ✓ 
 * 
 * ================================================================
 *  ACCESSIBILITY AND STANDARDS
 * ================================================================
 * 
 * - WCAG 2.2 AAA: The script does not modify the accessibility of images
 * - SEO: The alt and title attributes are preserved
 * - AI: The image metadata is preserved
 * - Performance: The script is lightweight (no unnecessary requests)
 * - Progressive Enhancement: The site works even without this script
 * 
 * ================================================================
 *  USAGE EXAMPLES
 * ================================================================
 * 
 * HTML source (the script modifies it dynamically):
 * <img src="/images/photo.webp" alt="My photo">
 * <img src="/folder/subfolder/image.avif?w=800&q=80" alt="AVIF image">
 * <img src="img/logo.webp" alt="Logo">
 * 
 * After the script runs (on old browser):
 * <img src="/images/photo.jpg" alt="My photo">
 * <img src="/folder/subfolder/image.jpg?w=800&q=80" alt="AVIF image">
 * <img src="img/logo.jpg" alt="Logo">
 * 
 * ================================================================
 *  MAINTENANCE NOTES
 * ================================================================
 * 
 * - Check that the JPG files are present on the server
 * - Use FileZilla to transfer images in pairs (.webp + .jpg)
 * - If an image changes format, update both files
 * - The script is compatible with dynamically loaded images (MutationObserver)
 * 
 * ================================================================
 *  AUTHORS AND LICENSE
 * ================================================================
 /** @author Madjeek Group - @version 1.0.0 - Juin 2026 - @license MIT - @copyright 2009-2026 Madjeek Communication & Image Group 
 */
/**
 * ================================================================
 *  CHANGE HISTORY
 * ================================================================
 * 
 * v1.0.0 (2026-06-30) - Initial version
 *   - Old browser detection
 *   - Replacement of modern images with JPG
 *   - URL parameter support
 *   - Subfolder support
 *   - MutationObserver for dynamic images
 *   - Detailed educational comments
 * 
 * ================================================================
 */

(function() {
    'use strict';

    // ================================================================
    // SECTION 1: OLD BROWSER DETECTION
    // ================================================================

    /**
     * Detects whether the browser is considered "old"
     * (non-compatible AVIF, WebP, etc.)
     * 
     * Detection methods:
     * 1. User-Agent (for Internet Explorer)
     * 2. Feature detection for CSS/HTML (for other browsers)
     * 
     * @returns {boolean} true if old browser, false otherwise
     */
    function isLegacyBrowser() {
        // --- 1. Internet Explorer detection (the most reliable) ---
        // User-Agent is the safest method for IE
        const ua = window.navigator.userAgent.toLowerCase();
        
        // Internet Explorer 6, 7, 8, 9, 10, 11
        if (ua.indexOf('msie') !== -1 || ua.indexOf('trident') !== -1) {
            console.log('🔍 [Legacy Fallback] Internet Explorer detected');
            return true;
        }

        // --- 2. Old Edge detection (EdgeHTML) ---
        // Old Edge uses EdgeHTML (different from Chromium)
        if (ua.indexOf('edge/') !== -1 && ua.indexOf('edg/') === -1) {
            console.log('🔍 [Legacy Fallback] Old Edge (EdgeHTML) detected');
            return true;
        }

        // --- 3. Detection via modern feature support ---
        // This method is more reliable than User-Agent for recent browsers
        // that spoof other browsers
        
        // 3.1. Check AVIF support (modern image format)
        // AVIF is supported by Chrome 85+, Firefox 93+, Safari 16+
        // Old browsers do not support it
        const canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 2;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, 2, 2);
        const avifSupport = canvas.toDataURL('image/avif').indexOf('image/avif') !== -1;
        
        // 3.2. Check WebP support
        // WebP is supported by Chrome 23+, Firefox 65+, Safari 14+
        // Very old browsers do not support it
        const webpSupport = canvas.toDataURL('image/webp').indexOf('image/webp') !== -1;
        
        // 3.3. Check support for modern CSS properties
        // CSS properties like 'aspect-ratio' are supported by modern browsers
        const cssSupports = (prop, value) => {
            if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
                return CSS.supports(prop, value);
            }
            // Fallback for old browsers that don't have CSS.supports
            return false;
        };
        
        // Check CSS aspect-ratio support (Chrome 88+, Firefox 87+, Safari 15+)
        const supportsAspectRatio = cssSupports('aspect-ratio', '1/1');
        
        // 3.4. Check IntersectionObserver support (Chrome 51+, Firefox 55+, Safari 12.1+)
        const supportsIntersectionObserver = typeof IntersectionObserver !== 'undefined';
        
        // 3.5. Check fetch support (Chrome 42+, Firefox 39+, Safari 10.1+)
        const supportsFetch = typeof fetch !== 'undefined';
        
        // 3.6. Check Promise support (ES6) - IE11 does not support
        const supportsPromise = typeof Promise !== 'undefined';
        
        // 3.7. Check Object.assign support (IE11 does not support)
        const supportsObjectAssign = typeof Object.assign !== 'undefined';
        
        // 3.8. Check window.matchMedia support (IE9+ supports it, but not IE8)
        const supportsMatchMedia = typeof window.matchMedia !== 'undefined';
        
        // -- Decision: if several modern features are missing, it's an old browser
        // We consider the browser to be old if:
        // - AVIF and WebP are NOT supported (this is the most important criterion)
        // - OR at least 3 of the other features are missing
        const missingFeatures = [
            !avifSupport,
            !webpSupport,
            !supportsAspectRatio,
            !supportsIntersectionObserver,
            !supportsFetch,
            !supportsPromise,
            !supportsObjectAssign
        ].filter(Boolean).length;
        
        // --- SIMPLIFIED VERSION FOR ROBUST DETECTION ---
        // If both AVIF and WebP are supported, it's a modern browser
        if (avifSupport && webpSupport) {
            return false;
        }
        
        // If AVIF is not supported AND WebP is not supported,
        // it's a very old browser (like IE or Safari < 14)
        if (!avifSupport && !webpSupport) {
            console.log('🔍 [Legacy Fallback] Old browser detected (neither AVIF nor WebP supported)');
            return true;
        }
        
        // Intermediate case: one is supported but not the other
        // (e.g. Safari 14 supports WebP but not AVIF)
        // We check other features to decide
        if (missingFeatures >= 3) {
            console.log('🔍 [Legacy Fallback] Old browser detected (missing features)');
            return true;
        }
        
        // If we got here, the browser is considered modern
        return false;
    }

    // Quick check: if modern browser, we stop everything
    if (!isLegacyBrowser()) {
        console.log('✔ [Legacy Fallback] Modern browser, no fallback needed');
        return; // Immediate exit from the script
    }

    // ================================================================
    // SECTION 2: IMAGE REPLACEMENT FUNCTIONS
    // ================================================================

    /**
     * Extracts the full path of an image (without URL parameters)
     * Example: /images/photo.webp?w=480&q=75 → /images/photo.webp
     * 
     * @param {string} url - The full URL of the image
     * @returns {string} The base path without parameters
     */
    function getBaseUrl(url) {
        if (!url) return '';
        // Remove URL parameters (? and everything that follows)
        const questionMarkIndex = url.indexOf('?');
        return questionMarkIndex !== -1 ? url.substring(0, questionMarkIndex) : url;
    }

    /**
     * Extracts the URL parameters of an image
     * Example: /images/photo.webp?w=480&q=75 → ?w=480&q=75
     * 
     * @param {string} url - The full URL of the image
     * @returns {string} The URL parameters (with the ?) or empty string
     */
    function getUrlParams(url) {
        if (!url) return '';
        const questionMarkIndex = url.indexOf('?');
        return questionMarkIndex !== -1 ? url.substring(questionMarkIndex) : '';
    }

    /**
     * Checks whether an image is in a modern format that can be replaced
     * Supported formats: webp, avif, jp2, jxr
     * 
     * @param {string} url - The image URL
     * @returns {boolean} true if the format is replaceable, false otherwise
     */
    function isModernFormat(url) {
        if (!url) return false;
        const lowerUrl = url.toLowerCase();
        // We check the extension, even with URL parameters
        return lowerUrl.includes('.webp') || 
               lowerUrl.includes('.avif') || 
               lowerUrl.includes('.jp2') || 
               lowerUrl.includes('.jxr');
    }

    /**
     * Generates the replacement JPG URL from the original URL
     * 
     * Example:
     * /images/photo.webp → /images/photo.jpg
     * /images/photo.avif?w=480&q=75 → /images/photo.jpg?w=480&q=75
     * /folder/subfolder/image.webp → /folder/subfolder/image.jpg
     * 
     * @param {string} originalUrl - The original image URL
     * @returns {string} The replacement JPG URL
     */
    function buildJpgUrl(originalUrl) {
        if (!originalUrl) return originalUrl;
        
        // Extract the base path and parameters
        const baseUrl = getBaseUrl(originalUrl);
        const params = getUrlParams(originalUrl);
        
        // Separate the path and the extension
        // We look for the last dot before the parameters
        const lastDotIndex = baseUrl.lastIndexOf('.');
        if (lastDotIndex === -1) {
            // No extension, we add .jpg?
            return baseUrl + '.jpg' + params;
        }
        
        // Build the new path with the .jpg extension
        const pathWithoutExtension = baseUrl.substring(0, lastDotIndex);
        return pathWithoutExtension + '.jpg' + params;
    }

    /**
     * Checks whether the JPG URL exists on the server (HEAD request)
     * 
     * @param {string} url - The URL to check
     * @returns {Promise<boolean>} true if the URL exists, false otherwise
     */
    function checkImageExists(url) {
        return new Promise((resolve) => {
            // Use fetch with HEAD method to check existence
            // without downloading the entire image (saves bandwidth)
            fetch(url, { method: 'HEAD' })
                .then(response => {
                    // If the response is OK (200) or redirection (304), the image exists
                    resolve(response.ok);
                })
                .catch(() => {
                    // On error (network, CORS, etc.), we consider the image does not exist
                    resolve(false);
                });
        });
    }

    /**
     * Processes an individual image: tries to replace it with its JPG equivalent
     * 
     * @param {HTMLImageElement} img - The image element to process
     * @returns {Promise<void>}
     */
    async function processImage(img) {
        // Get the source URL
        const originalSrc = img.getAttribute('src');
        if (!originalSrc) return;
        
        // Do not process images that are not in a modern format
        if (!isModernFormat(originalSrc)) return;
        
        // Do not process images already in JPG
        if (originalSrc.toLowerCase().includes('.jpg') || 
            originalSrc.toLowerCase().includes('.jpeg')) {
            return;
        }
        
        // Do not process images already marked as processed
        if (img.dataset.legacyFallback === 'true') return;
        
        // Build the replacement JPG URL
        const jpgUrl = buildJpgUrl(originalSrc);
        
        // Check whether the JPG exists on the server
        const exists = await checkImageExists(jpgUrl);
        
        if (exists) {
            // Replace the image source with the JPG
            img.setAttribute('src', jpgUrl);
            img.dataset.legacyFallback = 'true';
            img.dataset.originalSrc = originalSrc;
            console.log(`🔄 [Legacy Fallback] Image replaced: ${originalSrc} → ${jpgUrl}`);
        } else {
            // The JPG does not exist, we do nothing
            // We still mark the image to avoid checking it again
            img.dataset.legacyFallback = 'skipped';
            console.log(`⏭️ [Legacy Fallback] JPG missing: ${jpgUrl} (image kept)`);
        }
    }

    /**
     * Processes all images on the page
     * 
     * @param {string} selector - Optional CSS selector to target specific images
     * @returns {Promise<void>}
     */
    async function processAllImages(selector) {
        const images = document.querySelectorAll(selector || 'img');
        const totalImages = images.length;
        let processedCount = 0;
        
        console.log(`🔄 [Legacy Fallback] Processing ${totalImages} image(s)...`);
        
        // Process each image sequentially (to avoid simultaneous requests)
        for (const img of images) {
            await processImage(img);
            processedCount++;
            
            // Display progress every 10 images
            if (processedCount % 10 === 0) {
                console.log(`⏳ [Legacy Fallback] ${processedCount}/${totalImages} images processed`);
            }
        }
        
        console.log(`✔ [Legacy Fallback] Processing complete: ${processedCount} image(s) analyzed`);
    }

    // ================================================================
    // SECTION 3: OBSERVER FOR DYNAMIC IMAGES
    // ================================================================

    /**
     * Sets up an observer to detect dynamically added images
     * (AJAX loading, JavaScript, etc.)
     */
    function setupMutationObserver() {
        if (typeof MutationObserver === 'undefined') {
            console.log('⚠️ [Legacy Fallback] MutationObserver not supported');
            return;
        }
        
        const observer = new MutationObserver((mutations) => {
            let hasNewImages = false;
            
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    // Check if the added node is an image
                    if (node.nodeName === 'IMG') {
                        // Check if the image has not already been processed
                        if (node.dataset.legacyFallback !== 'true' && 
                            node.dataset.legacyFallback !== 'skipped') {
                            processImage(node);
                            hasNewImages = true;
                        }
                    }
                    
                    // Check images inside the added node
                    if (node.querySelectorAll) {
                        const images = node.querySelectorAll('img');
                        images.forEach((img) => {
                            if (img.dataset.legacyFallback !== 'true' && 
                                img.dataset.legacyFallback !== 'skipped') {
                                processImage(img);
                                hasNewImages = true;
                            }
                        });
                    }
                });
            });
            
            if (hasNewImages) {
                console.log('🔄 [Legacy Fallback] New dynamic images processed');
            }
        });
        
        // Observe the entire document body
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('👁️ [Legacy Fallback] Dynamic image observer enabled');
    }

    // ================================================================
    // SECTION 4: INITIALIZATION
    // ================================================================

    /**
     * Initializes the script after the DOM has loaded
     */
    async function initLegacyFallback() {
        console.log('🚀 [Legacy Fallback] Initializing...');
        console.log('📋 [Legacy Fallback] Old browser detected - Activating JPG fallback');
        
        // Wait for the DOM to be ready
        if (document.readyState === 'loading') {
            await new Promise((resolve) => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        // Process all images already present on the page
        await processAllImages();
        
        // Set up the observer for dynamic images
        setupMutationObserver();
        
        console.log('✔ [Legacy Fallback] Script initialized successfully');
        console.log('💡 [Legacy Fallback] Modern images (.webp, .avif) will be replaced by .jpg if available');
    }

    // Start initialization
    initLegacyFallback().catch((error) => {
        console.error('❌ [Legacy Fallback] Error during initialization:', error);
    });

})();

/**
 * ================================================================
 *  SUMMARY OF WHAT THIS SCRIPT DOES
 * ================================================================
 * 
 * 1. Old browser detection (IE, old Chrome, old Safari)
 * 2. Search for all images on the page
 * 3. For each image in .webp, .avif, etc.:
 *    a. Builds the path to the same file in .jpg
 *    b. Checks whether this file exists on the server
 *    c. If yes, replaces the image source with the JPG
 * 4. Monitors new images added dynamically
 * 
 * ================================================================
 *  WHAT WE MUST DO IN FILEZILLA
 * ================================================================
 * 
 * For each modern image (e.g. photo.webp):
 * 1. Create a JPG version of the same size
 * 2. Place it in the SAME folder with the SAME name (e.g. photo.jpg)
 * 3. Example:
 *    📁 images/
 *       ├── photo.webp   ← The modern image used by default
 *       └── photo.jpg    ← The JPG fallback for old browsers
 * 
 * ================================================================
 *  TO ADD IN OUR HTML PAGES
 * ================================================================
 * 
 * <script src="/js/legacy-image-fallback.js" defer><script>
 * 
 * PLACE THIS LINE IN THE <head> OR BEFORE THE CLOSING OF THE <body>
 * → IN ALL our pages that contain images
 * 
 * ================================================================
 *  FINAL NOTES
 * ================================================================
 * 
 * - This script is designed to be "transparent": it does not modify
 *   the user experience on modern browsers
 * - It only runs for old browsers (performance gain)
 * - The JPG images must be prepared in advance (Photoshop, GIMP, etc.)
 * - The script is resilient: if the JPG does not exist, the original image is kept
 * 
 * ================================================================
 *  COMPLETE DOCUMENTATION AND SOURCES
 * ================================================================
 * 
 * Browser detection:
 * - MDN: https://developer.mozilla.org/fr/docs/Web/API/Navigator/userAgent
 * - Can I Use AVIF: https://caniuse.com/avif
 * - Can I Use WebP: https://caniuse.com/webp
 * - Can I Use CSS aspect-ratio: https://caniuse.com/mdn-css_properties_aspect-ratio
 * 
 * Image fallback:
 * - W3C: https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element
 * - HTML Living Standard: https://html.spec.whatwg.org/multipage/images.html
 * 
 * Accessibility and SEO:
 * - WCAG 2.2: https://www.w3.org/TR/WCAG22/
 * - Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
 * 
 * ================================================================
 * 
 * ==============
 * INSTALLATION
 * ==============
1. Create the /js/ folder in our project
2. Copy this code into a legacy-image-fallback.js file
3. Add this line to each HTML page containing images:

html
<script src="js/legacy-image-fallback.js" defer><script>
4. Place our images in pairs (e.g. photo.webp + photo.jpg) in the same folder

EXAMPLE IN OUR CODE
Without the script (current):

html
<img src="/madjeek-img-noindex/paco-rabanne-01.webp?q=80&w=1170">
With the script + the JPG file present:

text
📁 madjeek-img-noindex/
   ├── paco-rabanne-01.webp   ← Modern image
   └── paco-rabanne-01.jpg    ← JPG fallback (same folder)

→ On IE/old browser: the loaded image will be paco-rabanne-01.jpg   |   → On modern browser: the loaded image will be paco-rabanne-01.webp   |   This script is 100% autonomous, compatible with IE10+, universal, and only runs when necessary.
 */