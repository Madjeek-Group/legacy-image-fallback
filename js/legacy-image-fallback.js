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
 * <picture class="picture-full-width">
 *   <!-- ===== MOBILE (max-width: 480px) — 1:1 — 1200 × 1200 px ===== -->
 *   <source media="(max-width: 480px)" srcset="https://website.io/site/img/exemple1.avif" type="image/avif" data-note="1x1 / 1:1 pour mobiles - 1200 × 1200 px avif - exemple1.avif" />
 *   <source media="(max-width: 480px)" srcset="https://website.io/site/img/exemple1.webp" type="image/webp" data-note="1x1 / 1:1 pour mobiles - 1200 × 1200 px webp - exemple1.webp" />
 *   <source media="(max-width: 480px)" srcset="https://website.io/site/img/exemple1.jpg"  type="image/jpeg" data-note="1x1 / 1:1 pour mobiles - 1200 × 1200 px jpg - exemple1.jpg" />
 *   <source media="(max-width: 480px)" srcset="https://website.io/site/img/exemple1.png"  type="image/png"  data-note="1x1 / 1:1 pour mobiles - 1200 × 1200 px png - exemple1.png" />
 *
 *   <!-- ===== TABLET (481px – 1024px) — 4:3 — 1200 × 900 px ===== -->
 *   <source media="(min-width: 481px) and (max-width: 1024px)" srcset="https://website.io/site/img/exemple2.avif" type="image/avif" data-note="4x3 / 4:3 pour tablettes - 1200 × 900 px avif - exemple2.avif" />
 *   <source media="(min-width: 481px) and (max-width: 1024px)" srcset="https://website.io/site/img/exemple2.webp" type="image/webp" data-note="4x3 / 4:3 pour tablettes - 1200 × 900 px webp - exemple2.webp" />
 *   <source media="(min-width: 481px) and (max-width: 1024px)" srcset="https://website.io/site/img/exemple2.jpg"  type="image/jpeg" data-note="4x3 / 4:3 pour tablettes - 1200 × 900 px jpg - exemple2.jpg" />
 *   <source media="(min-width: 481px) and (max-width: 1024px)" srcset="https://website.io/site/img/exemple2.png"  type="image/png"  data-note="4x3 / 4:3 pour tablettes - 1200 × 900 px png - exemple2.png" />
 *
 *   <!-- ===== DESKTOP (min-width: 1025px) — 16:9 — 1200 × 675 px ===== -->
 *   <source media="(min-width: 1025px)" srcset="https://website.io/site/img/exemple3.avif" type="image/avif" data-note="16x9 / 16:9 pour desktop - 1200 × 675 px avif - exemple3.avif" />
 *   <source media="(min-width: 1025px)" srcset="https://website.io/site/img/exemple3.webp" type="image/webp" data-note="16x9 / 16:9 pour desktop - 1200 × 675 px webp - exemple3.webp" />
 *   <source media="(min-width: 1025px)" srcset="https://website.io/site/img/exemple3.jpg"  type="image/jpeg" data-note="16x9 / 16:9 pour desktop - 1200 × 675 px jpg - exemple3.jpg" />
 *   <source media="(min-width: 1025px)" srcset="https://website.io/site/img/exemple3.png"  type="image/png"  data-note="16x9 / 16:9 pour desktop - 1200 × 675 px png - exemple3.png" />
 *
 *   <!-- ===== FALLBACK <img> (browsers without <picture>) ===== -->
 *   <img src="https://website.io/site/img/exemple3.jpg" alt=".... & ....." loading="lazy" data-note="16x9 / 16:9 pour desktop - 1200 × 675 px jpg - exemple3.jpg" />
 * </picture>
 *
 *
 * Important note about the script:
 * The current script only handles <img> tags, not <picture>/<source>. If we use <picture>, the script will not replace the <source>.
 * For the script to work as intended (time saving, no <picture> to write), you must use only:
 *
 * <img src=".../exemple3.webp" alt="...">   …and let the script do the .jpg fallback on old browsers.
 *
 * If we want the script to also handle .avif and .png as fallback (and not only .jpg), we need to modify the buildJpgUrl() function to try several extensions in order: .jpg → .jpeg → .png.
 * So: future evolution of this script to do ... work in progress...
 *
 * -----------------------------------------------------------------------------------------------------------------------
 */

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
 * 1. Analyzes the visitor's browser (userAgent + real image decoding tests)
 * 2. If old browser (IE <= 11, old Edge, or a browser that cannot decode WebP / AVIF):
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
 *    <script src="js/legacy-image-fallback.js" defer></script>
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
 * Since v1.1.0 the decision is made per image format, with a real
 * decoding test (a tiny WebP and a tiny AVIF image are loaded in memory).
 * | Browser           | .webp replaced if | .avif replaced if |
 * |-------------------|-------------------|-------------------|
 * | Internet Explorer | always (userAgent)| always (userAgent)|
 * | Old Edge (<= 18)  | always (userAgent)| always (userAgent)|
 * | Chrome            | < 32              | < 85              |
 * | Safari            | < 14              | < 16              |
 * | Firefox           | < 65              | < 93              |
 * | Opera             | < 19              | < 71              |
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
 * @author Madjeek Group - @version 1.1.0 - October 2026 - @license MIT - @copyright 2009-2026 Madjeek Communication & Image Group 
 */

/**
 * ================================================================
 *  CHANGE HISTORY
 * ================================================================
 * 
 * v1.1.0 (2026-10-30) - Compatibility and detection fixes
 *   - Rewritten in ES5 (no const/let, arrow functions, async/await,
 *     fetch or Promise): the file can now be parsed and executed by
 *     Internet Explorer 10/11 without any transpilation
 *   - HEAD request done with XMLHttpRequest instead of fetch
 *   - Detection by real image decoding (tiny WebP and AVIF test images)
 *     instead of canvas.toDataURL, which is unreliable on Safari
 *   - Fallback decided per format: a .avif is replaced only if AVIF
 *     is not supported, a .webp only if WebP is not supported
 *   - Comments: stray markdown labels removed, </script> typos fixed
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
    // SECTION 0: SAFE LOGGING
    // ================================================================

    /**
     * Writes a message in the console only if a console exists
     * (Internet Explorer 9 has no console object unless the
     * developer tools are open, so a direct console.log would crash)
     * 
     * @param {string} message - The message to display
     */
    function log(message) {
        if (typeof console !== 'undefined' && typeof console.log === 'function') {
            console.log(message);
        }
    }

    /**
     * Same as log(), for errors
     * 
     * @param {string} message - The message to display
     * @param {*} error - The error object
     */
    function logError(message, error) {
        if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error(message, error);
        }
    }

    // ================================================================
    // SECTION 1: OLD BROWSER DETECTION
    // ================================================================

    // Tiny 1x1 test images (base64), used to know if the browser
    // can REALLY decode a format. If the image loads, the format is
    // supported. If an error is triggered, it is not supported.
    var WEBP_TEST_IMAGE = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
    var AVIF_TEST_IMAGE = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYnZpZgAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAEUAAAAFwAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABoaXBycAAAAEppcGNvAAAAFGlzcGUAAAAAAAAAAQAAAAEAAAAQcGl4aQAAAAADCAgIAAAAFmF2MUOBAAwACggYAAYICGgIIAAAABhpcG1hAAAAAAAAAAEAAQQBAoMDhAAAAB9tZGF0CggYAAYICGgIIBoFHAAAAAMgAAAUAAAAkA==';

    // Result of the format tests (filled by detectFormatSupport)
    var support = {
        webp: false,
        avif: false
    };

    // true if the User-Agent is Internet Explorer or old Edge (EdgeHTML)
    var legacyUserAgent = false;

    /**
     * Detects whether the browser is Internet Explorer or old Edge
     * (EdgeHTML). These browsers are detected immediately with the
     * User-Agent, no image test is needed.
     * 
     * User-Agent is the safest method for IE
     * 
     * @returns {boolean} true if IE or old Edge, false otherwise
     */
    function isLegacyUserAgent() {
        // --- 1. Internet Explorer detection (the most reliable) ---
        var ua = window.navigator.userAgent.toLowerCase();
        
        // Internet Explorer 6, 7, 8, 9, 10, 11
        if (ua.indexOf('msie') !== -1 || ua.indexOf('trident') !== -1) {
            log('🔍 [Legacy Fallback] Internet Explorer detected');
            return true;
        }

        // --- 2. Old Edge detection (EdgeHTML) ---
        // Old Edge uses EdgeHTML (different from Chromium)
        if (ua.indexOf('edge/') !== -1 && ua.indexOf('edg/') === -1) {
            log('🔍 [Legacy Fallback] Old Edge (EdgeHTML) detected');
            return true;
        }

        return false;
    }

    /**
     * Tests whether the browser can decode an image format.
     * 
     * Why not canvas.toDataURL()? Because it tests the ENCODING of
     * a format by the canvas, not its DECODING. Some recent browsers
     * (Safari for example) cannot export WebP or AVIF from a canvas
     * but display these formats perfectly. Loading a real tiny image
     * is the reliable method.
     * 
     * @param {string} dataUri - A tiny test image in base64
     * @param {Function} callback - Called with true (supported) or false
     */
    function testImageFormat(dataUri, callback) {
        var img = new Image();
        var finished = false;

        function finish(result) {
            // Protection: the callback must be called only once
            if (finished) return;
            finished = true;
            callback(result);
        }

        img.onload = function() {
            finish(img.width > 0 && img.height > 0);
        };
        img.onerror = function() {
            finish(false);
        };
        img.src = dataUri;
    }

    /**
     * Runs the WebP test and the AVIF test, then calls the callback
     * when both results are known
     * 
     * @param {Function} callback - Called when the 2 tests are finished
     */
    function detectFormatSupport(callback) {
        var pending = 2;

        function oneTestDone() {
            pending--;
            if (pending === 0) {
                callback();
            }
        }

        // 3.1. Check AVIF support (modern image format)
        // AVIF is supported by Chrome 85+, Firefox 93+, Safari 16+
        // Old browsers do not support it
        testImageFormat(AVIF_TEST_IMAGE, function(isSupported) {
            support.avif = isSupported;
            oneTestDone();
        });

        // 3.2. Check WebP support
        // WebP is supported by Chrome 32+, Firefox 65+, Safari 14+
        // Very old browsers do not support it
        testImageFormat(WEBP_TEST_IMAGE, function(isSupported) {
            support.webp = isSupported;
            oneTestDone();
        });
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
        var questionMarkIndex = url.indexOf('?');
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
        var questionMarkIndex = url.indexOf('?');
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
        var lowerUrl = url.toLowerCase();
        // We check the extension, even with URL parameters
        return lowerUrl.indexOf('.webp') !== -1 || 
               lowerUrl.indexOf('.avif') !== -1 || 
               lowerUrl.indexOf('.jp2') !== -1 || 
               lowerUrl.indexOf('.jxr') !== -1;
    }

    /**
     * Checks whether THIS image format must be replaced in THIS browser
     * 
     * - .webp is replaced only if the browser cannot decode WebP
     * - .avif is replaced only if the browser cannot decode AVIF
     * - .jp2 and .jxr cannot be tested reliably, so they are replaced
     *   only when the browser is considered old
     * 
     * @param {string} url - The image URL
     * @returns {boolean} true if the image must be replaced by its JPG
     */
    function needsFallback(url) {
        var lowerUrl = url.toLowerCase();
        if (lowerUrl.indexOf('.webp') !== -1) return !support.webp;
        if (lowerUrl.indexOf('.avif') !== -1) return !support.avif;
        return legacyUserAgent || (!support.webp && !support.avif);
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
        var baseUrl = getBaseUrl(originalUrl);
        var params = getUrlParams(originalUrl);
        
        // Separate the path and the extension
        // We look for the last dot before the parameters
        var lastDotIndex = baseUrl.lastIndexOf('.');
        if (lastDotIndex === -1) {
            // No extension, we add .jpg?
            return baseUrl + '.jpg' + params;
        }
        
        // Build the new path with the .jpg extension
        var pathWithoutExtension = baseUrl.substring(0, lastDotIndex);
        return pathWithoutExtension + '.jpg' + params;
    }

    /**
     * Checks whether the JPG URL exists on the server (HEAD request)
     * 
     * XMLHttpRequest is used instead of fetch because Internet Explorer
     * does not know fetch and Promise.
     * 
     * @param {string} url - The URL to check
     * @param {Function} callback - Called with true if the URL exists, false otherwise
     */
    function checkImageExists(url, callback) {
        try {
            // Use a HEAD request to check existence
            // without downloading the entire image (saves bandwidth)
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    // If the response is OK (200) or redirection (304), the image exists
                    callback((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304);
                }
            };
            xhr.send();
        } catch (e) {
            // On error (network, CORS, etc.), we consider the image does not exist
            callback(false);
        }
    }

    /**
     * Processes an individual image: tries to replace it with its JPG equivalent
     * 
     * @param {HTMLImageElement} img - The image element to process
     * @param {Function} [done] - Called when the image has been processed
     */
    function processImage(img, done) {
        function end() {
            if (done) done();
        }

        // Get the source URL
        var originalSrc = img.getAttribute('src');
        if (!originalSrc) { end(); return; }
        
        // Do not process images that are not in a modern format
        if (!isModernFormat(originalSrc)) { end(); return; }
        
        // Do not process images already in JPG
        if (originalSrc.toLowerCase().indexOf('.jpg') !== -1 || 
            originalSrc.toLowerCase().indexOf('.jpeg') !== -1) {
            end();
            return;
        }
        
        // Do not process images already marked as processed
        if (img.getAttribute('data-legacy-fallback') === 'true') { end(); return; }

        // Do not process images whose format is supported by this browser
        if (!needsFallback(originalSrc)) { end(); return; }
        
        // Build the replacement JPG URL
        var jpgUrl = buildJpgUrl(originalSrc);
        
        // Check whether the JPG exists on the server
        checkImageExists(jpgUrl, function(exists) {
            if (exists) {
                // Replace the image source with the JPG
                img.setAttribute('src', jpgUrl);
                img.setAttribute('data-legacy-fallback', 'true');
                img.setAttribute('data-original-src', originalSrc);
                log('🔄 [Legacy Fallback] Image replaced: ' + originalSrc + ' → ' + jpgUrl);
            } else {
                // The JPG does not exist, we do nothing
                // We still mark the image to avoid checking it again
                img.setAttribute('data-legacy-fallback', 'skipped');
                log('⏭️ [Legacy Fallback] JPG missing: ' + jpgUrl + ' (image kept)');
            }
            end();
        });
    }

    /**
     * Processes all images on the page
     * 
     * @param {string} selector - Optional CSS selector to target specific images
     * @param {Function} [callback] - Called when all images have been processed
     */
    function processAllImages(selector, callback) {
        var images = document.querySelectorAll(selector || 'img');
        var totalImages = images.length;
        var processedCount = 0;
        
        log('🔄 [Legacy Fallback] Processing ' + totalImages + ' image(s)...');
        
        // Process each image sequentially (to avoid simultaneous requests)
        function next() {
            if (processedCount >= totalImages) {
                log('✔ [Legacy Fallback] Processing complete: ' + processedCount + ' image(s) analyzed');
                if (callback) callback();
                return;
            }

            processImage(images[processedCount], function() {
                processedCount++;
                
                // Display progress every 10 images
                if (processedCount % 10 === 0) {
                    log('⏳ [Legacy Fallback] ' + processedCount + '/' + totalImages + ' images processed');
                }

                next();
            });
        }

        next();
    }

    // ================================================================
    // SECTION 3: OBSERVER FOR DYNAMIC IMAGES
    // ================================================================

    /**
     * Checks whether an image has not been processed yet
     * 
     * @param {HTMLImageElement} img - The image element
     * @returns {boolean} true if the image was not processed
     */
    function isNotProcessed(img) {
        var flag = img.getAttribute('data-legacy-fallback');
        return flag !== 'true' && flag !== 'skipped';
    }

    /**
     * Sets up an observer to detect dynamically added images
     * (AJAX loading, JavaScript, etc.)
     * 
     * Note: MutationObserver exists in IE11 but not in IE10.
     * On IE10, the images present in the page at load time are still
     * processed, only the dynamic images are not observed.
     */
    function setupMutationObserver() {
        if (typeof MutationObserver === 'undefined') {
            log('⚠️ [Legacy Fallback] MutationObserver not supported');
            return;
        }
        
        var observer = new MutationObserver(function(mutations) {
            var hasNewImages = false;
            
            for (var i = 0; i < mutations.length; i++) {
                var addedNodes = mutations[i].addedNodes;

                for (var j = 0; j < addedNodes.length; j++) {
                    var node = addedNodes[j];

                    // Check if the added node is an image
                    if (node.nodeName === 'IMG') {
                        // Check if the image has not already been processed
                        if (isNotProcessed(node)) {
                            processImage(node);
                            hasNewImages = true;
                        }
                    }
                    
                    // Check images inside the added node
                    if (node.querySelectorAll) {
                        var images = node.querySelectorAll('img');
                        for (var k = 0; k < images.length; k++) {
                            if (isNotProcessed(images[k])) {
                                processImage(images[k]);
                                hasNewImages = true;
                            }
                        }
                    }
                }
            }
            
            if (hasNewImages) {
                log('🔄 [Legacy Fallback] New dynamic images processed');
            }
        });
        
        // Observe the entire document body
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        log('👁️ [Legacy Fallback] Dynamic image observer enabled');
    }

    // ================================================================
    // SECTION 4: INITIALIZATION
    // ================================================================

    /**
     * Initializes the script after the DOM has loaded
     */
    function initLegacyFallback() {
        log('🚀 [Legacy Fallback] Initializing...');
        log('📋 [Legacy Fallback] Old browser or unsupported image format detected - Activating JPG fallback');

        function run() {
            // Process all images already present on the page
            processAllImages(null, function() {
                // Set up the observer for dynamic images
                setupMutationObserver();
                
                log('✔ [Legacy Fallback] Script initialized successfully');
                log('💡 [Legacy Fallback] Modern images (.webp, .avif) will be replaced by .jpg if available');
            });
        }
        
        // Wait for the DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', run);
        } else {
            run();
        }
    }

    /**
     * Entry point: decides if the fallback must be activated
     */
    function start() {
        // IE and old Edge: no need to test anything, we start immediately
        legacyUserAgent = isLegacyUserAgent();
        if (legacyUserAgent) {
            initLegacyFallback();
            return;
        }

        // Other browsers: we test the real support of WebP and AVIF
        detectFormatSupport(function() {
            // Quick check: if modern browser, we stop everything
            if (support.webp && support.avif) {
                log('✔ [Legacy Fallback] Modern browser, no fallback needed');
                return; // Immediate exit from the script
            }

            log('🔍 [Legacy Fallback] Format support: WebP=' + support.webp + ', AVIF=' + support.avif);
            initLegacyFallback();
        });
    }

    // Start initialization
    try {
        start();
    } catch (error) {
        logError('❌ [Legacy Fallback] Error during initialization:', error);
    }

})();

/**
 * ================================================================
 *  SUMMARY OF WHAT THIS SCRIPT DOES
 * ================================================================
 * 
 * 1. Old browser detection (IE, old Edge, or no WebP / AVIF decoding)
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
 * <script src="/js/legacy-image-fallback.js" defer></script>
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
 * 1. Create the /js/ folder in our project
 * 2. Copy this code into a legacy-image-fallback.js file
 * 3. Add this line to each HTML page containing images:
 *
 *    <script src="js/legacy-image-fallback.js" defer></script>
 *
 * 4. Place our images in pairs (e.g. photo.webp + photo.jpg) in the same folder
 *
 * EXAMPLE IN OUR CODE
 * Without the script (current):
 *
 *    <img src="/madjeek-img-noindex/paco-rabanne-01.webp?q=80&w=1170">
 *
 * With the script + the JPG file present:
 *
 *    📁 madjeek-img-noindex/
 *       ├── paco-rabanne-01.webp   ← Modern image
 *       └── paco-rabanne-01.jpg    ← JPG fallback (same folder)
 *
 * → On IE/old browser: the loaded image will be paco-rabanne-01.jpg   |   → On modern browser: the loaded image will be paco-rabanne-01.webp   |   This script is 100% autonomous, compatible with IE10+, universal, and only runs when necessary.
 */
