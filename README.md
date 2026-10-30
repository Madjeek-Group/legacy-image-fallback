# Legacy Image Fallback

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen)
![Lighthouse](https://img.shields.io/badge/Lighthouse-100-0CCE6B?logo=lighthouse&logoColor=white)
![Minified Size](https://img.shields.io/badge/Minified%20Size-~4%20KB-blue)
![Status](https://img.shields.io/badge/Status-Stable-success)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

> A tiny, universal, dependency-free script that serves a `.jpg` version of your modern images (AVIF, WebP...) to old browsers, with nothing to write in your HTML except a simple `<img>` tag.

---

## Table of contents

- [Why this script](#why-this-script)
- [How it works](#how-it-works)
- [Installation](#installation)
- [Folder structure](#folder-structure)
- [Usage example](#usage-example)
- [What the script does and does not do](#what-the-script-does-and-does-not-do)
- [Supported formats](#supported-formats)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [License](#license)
- [Keywords](#keywords)

---

## Why this script

Without this script, every responsive image needs a long and repetitive `<picture>` block, with several `<source>` tags (avif, webp, jpeg, png) and media queries.

With this script, your HTML stays simple:

```html
<img src="/img/photo.webp" alt="My photo">
```

- Modern browsers load the `.webp` (or `.avif`).
- Old browsers automatically receive the `.jpg` from the same folder.
- No `<picture>`, no `<source>`, no media query to write.

You just drop your image pairs (`photo.webp` + `photo.jpg`) in the same folder, for example with FileZilla.

## How it works

1. The script checks whether the visitor uses an old browser (User-Agent and feature detection).
2. On a modern browser, it stops immediately and does nothing.
3. On an old browser, it goes through every `<img>` of the page.
4. For each image in a modern format (`.webp`, `.avif`, `.jp2`, `.jxr`), it builds the path of the `.jpg` in the same folder.
5. It checks that the `.jpg` exists with an asynchronous `HEAD` request.
6. If the file exists, the `src` is replaced. If not, the original image is kept and nothing breaks.
7. A `MutationObserver` handles images added dynamically after page load.

The script also keeps URL parameters (`photo.webp?w=480&q=75` becomes `photo.jpg?w=480&q=75`) and works with images located in different folders on the same page.

## Installation

1. Create a `/js/` folder in your project.
2. Copy `legacy-image-fallback.js` into it.
3. Add this line to every HTML page that contains images, in the `<head>` or just before the closing `</body>`:

```html
<script src="/js/legacy-image-fallback.js" defer></script>
```

4. Upload your images in pairs, in the same folder (`photo.webp` + `photo.jpg`).

## Folder structure

```text
/madjeek-img-noindex/
   ├── paco-rabanne-01.webp   <- modern image, referenced in the HTML
   └── paco-rabanne-01.jpg    <- JPG fallback, same name, same folder
```

## Usage example

HTML source:

```html
<img src="/madjeek-img-noindex/paco-rabanne-01.webp?q=80&w=1170" alt="Collection">
```

- On a modern browser, the loaded image is `paco-rabanne-01.webp`.
- On an old browser, the loaded image is `paco-rabanne-01.jpg`.

## What the script does and does not do

**It does:**

- Detect old browsers
- Replace `.webp`, `.avif`, `.jp2`, `.jxr` with `.jpg`
- Preserve URL parameters
- Leave `.jpg`, `.png` and `.gif` images untouched
- Ignore images whose `.jpg` is missing (no error)
- Support file names containing dots (for example `photo.2025.webp`)
- Keep `alt` and `title` attributes unchanged

**It does not:**

- Convert images on the fly (that is the job of your server, Photoshop, GIMP...)
- Create the `.jpg` files for you
- Download anything from the web

## Supported formats

| Source format | Replaced by |
|---------------|-------------|
| `.webp`       | `.jpg`      |
| `.avif`       | `.jpg`      |
| `.jp2`        | `.jpg`      |
| `.jxr`        | `.jpg`      |

## Known limitations

- The script only handles `<img>` tags. It does not rewrite `<picture>` / `<source>` elements.
- The fallback target is `.jpg` only. Trying `.jpeg` then `.png` is planned.
- The source uses modern syntax (`const`, arrow functions, `async` / `await`, `fetch`). A browser that cannot parse it, such as Internet Explorer 11, will not run it unless you transpile the file first (Babel, for example).
- Detection relies on canvas export tests. Some recent browsers cannot export WebP or AVIF from a canvas, so they may be treated as legacy. The effect is harmless: the `.jpg` is only used if it exists.

## Roadmap

- Try several extensions in order (`.jpg`, `.jpeg`, `.png`) in `buildJpgUrl()`
- Optional support for `<picture>` / `<source>`

## License

This project is licensed under the MIT License.

Copyright (c) 2026 Madjeek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Keywords

JavaScript, Web Performance, Image Fallback, Legacy Browsers, WebP, AVIF, JPG, Progressive Enhancement, Responsive Images, Lazy Loading, MutationObserver, Browser Compatibility, Vanilla JS, Zero Dependencies, Madjeek

---

Made by [Madjeek](https://madjeek.fr)
