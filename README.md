# Interactive Calendar

An interactive and beautifully crafted React calendar application built with a wall-calendar aesthetic.

## Features
- **Wall Calendar Layout:** Dynamic visual anchor using a responsive split-panel design (stacked vertically on mobile).
- **Date Range Selection:** Select a start, end, and immediately see the visually distinguishable range span.
- **Integrated Memo Section:** Seamlessly jot down notes natively. The text field dynamically pivots its scope based on whether a specific date range, an individual date, or the general month is selected. 
- **Local Persistence:** Your important memos never leave your browser, reliably stored inside `localStorage`.
- **Vanilla CSS:** Custom-engineered styling using Vanilla CSS. Includes stunning glassmorphism layers, dark-theme gradients, and micro scale-animations for premium user experience.

## Technical Choices
Given the strict assessment of frontend component architectural skills (and to remove friction of testing without a NodeJS server locally), this project ships with **dual entry points**:
1. **Modern Standalone Demo (`demo.html`):** We leverage browser ES modules and Babel standalone `data-type="module"` to execute the React + JSX bundle natively inside modern browsers.
2. **Standard Vite Architecture (`package.json`, `index.html`, `vite.config.js`):** Fully scaffolded and ready for modern bundlers using idiomatic ES6 hooks and UI components inside `src/`.

## How to Run Locally

### Option 1: Python Simple Server
If you'd like to test the component locally without Node:
1. Ensure Python 3+ is installed on your machine.
2. Create a small file named `server.py` and run it to serve `.jsx` correctly:
```python
import http.server, socketserver
Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map['.jsx'] = 'application/javascript'
with socketserver.TCPServer(("", 8000), Handler) as httpd:
    httpd.serve_forever()
```
3. Open `http://localhost:8000/demo.html`

### Option 2: Vite Server (Requires Node.js)
1. Ensure Node.js is installed.
2. Run `npm install` inside the project root.
3. Run `npm run dev` to boot up the Vite dev server and view the primary `index.html`.
