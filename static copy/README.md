# Markdownizr Demo - Vanilla Web App

A pure HTML/CSS/JavaScript web application for converting HTML to Markdown in real-time.

## Features

- 🔄 Real-time HTML to Markdown conversion
- 🎨 Clean, modern interface
- ⚡ No dependencies - runs completely in the browser
- 📱 Responsive design
- 🚀 No build process required

## Usage

### Option 1: Open Locally

Simply open `index.html` in any modern web browser:

```bash
# Using your default browser
open index.html

# Or double-click the file in your file explorer
```

### Option 2: Serve with a Local Server

For better performance:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Deploy to Any Web Host

Upload all files to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Project Structure

```
static/
├── index.html          # Main HTML file
├── README.md           # This file
└── assets/
    ├── css/
    │   └── style.css   # Styling
    └── js/
        └── app.js      # Conversion logic
```

## How It Works

1. **Paste HTML** in the left textarea
2. **See Markdown** in the right textarea instantly
3. **Copy** the markdown for use anywhere!

The converter uses [Turndown](https://github.com/mixmark-io/turndown) library loaded from CDN.

## No Installation Required

This is a 100% client-side application. No server, no build process, no npm install needed. Just open and use!

## Browser Support

Works in all modern browsers that support ES6+.

## License

MIT
