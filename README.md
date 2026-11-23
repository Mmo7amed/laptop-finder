# Student Laptop Finder

A simple SW302 Assignment 2 project built with HTML, JavaScript ES modules and Tailwind CSS 4.

## Requirements
- Node.js and npm
- Visual Studio Code with the Live Server extension (or another local server)

## Install
Open a terminal in this project folder and run:

```bash
npm install
```

## Build Tailwind CSS
Run this command whenever you change the HTML or Tailwind classes:

```bash
npm run build
```

For automatic rebuilding while working:

```bash
npm run watch
```

## Run the website
In VS Code, right-click `index.html` and choose **Open with Live Server**.
Do not open the HTML files directly with `file://`, because the app uses `fetch()` to load `data/laptops.json`.

## Pages
- `index.html`: home and live statistics
- `laptops.html`: search, category, maximum price, minimum RAM and sorting
- `details.html?id=1`: laptop details
- `favorites.html`: saved laptops and price calculations
- `compare.html`: side-by-side comparison of saved laptops

## Notes
Favorites and theme are stored in browser localStorage. The comparison page uses the first four saved laptops. The laptop data is in `data/laptops.json`.

## GitHub
Add your own GitHub repository link here before submission.
