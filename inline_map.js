const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const htmlPath = path.join(projectDir, 'index.html');
const svgPath = path.join(projectDir, 'india.svg');

// 1. Read files
let htmlContent = fs.readFileSync(htmlPath, 'utf8');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// 2. Extract paths from india.svg
// We want everything inside the <svg> tag of india.svg
const pathsStartIndex = svgContent.indexOf('>') + 1;
const pathsEndIndex = svgContent.lastIndexOf('</svg>');
let pathsMarkup = svgContent.substring(pathsStartIndex, pathsEndIndex).trim();

// Add class="state-path" and change aria-label to name to stay compatible if needed, 
// or we will just use aria-label in script.js. Let's make sure it has aria-label.
// We can also ensure it has class="state-path" for styling.
pathsMarkup = pathsMarkup.replace(/<path/g, '<path class="state-path"');

// 3. Build the realistic SVG tag
const newSvgMarkup = `<svg id="indiaMap" viewBox="0 0 612 696" xmlns="http://www.w3.org/2000/svg">
          ${pathsMarkup}
        </svg>`;

// 4. Locate and replace the SVG in index.html
const svgRegex = /<svg id="indiaMap" viewBox="0 0 800 900" xmlns="http:\/\/www.w3.org\/2000\/svg"><\/svg>/g;
if (htmlContent.match(svgRegex)) {
  htmlContent = htmlContent.replace(svgRegex, newSvgMarkup);
  console.log('Successfully replaced empty SVG with realistic SVG map.');
} else {
  // Try fallback match if formatting is slightly different
  const fallbackRegex = /<svg id="indiaMap" viewBox="0 0 800 900" xmlns="http:\/\/www.w3.org\/2000\/svg">\s*<\/svg>/g;
  if (htmlContent.match(fallbackRegex)) {
    htmlContent = htmlContent.replace(fallbackRegex, newSvgMarkup);
    console.log('Successfully replaced empty SVG with realistic SVG map (fallback).');
  } else {
    console.error('Could not find empty <svg id="indiaMap"> in index.html!');
  }
}

// 5. Add search box HTML above map-layout
const mapLayoutStart = '<div class="map-layout">';
const searchBoxHtml = `<!-- Search Box for Destinations -->
    <div class="dest-search-wrap">
      <div class="dest-search-box glass-card">
        <i class="fas fa-search search-icon"></i>
        <input type="text" id="destSearchInput" placeholder="Search state or destination (e.g. Munnar, Ooty, Tirupati, Kerala)..." oninput="handleDestSearch(this)" autocomplete="off">
        <button class="dest-search-clear" id="destSearchClear" onclick="clearDestSearch()" style="display:none;"><i class="fas fa-times"></i></button>
        <div class="suggestions-dropdown" id="destSearchSug"></div>
      </div>
    </div>

    `;

if (htmlContent.includes(mapLayoutStart)) {
  htmlContent = htmlContent.replace(mapLayoutStart, searchBoxHtml + mapLayoutStart);
  console.log('Successfully added search box HTML.');
} else {
  console.error('Could not find <div class="map-layout"> in index.html!');
}

// 6. Remove the placeholder text "Click on a state on the map to explore..."
const placeholderText = '<p>Click on a state on the map to explore its destinations and packages</p>';
if (htmlContent.includes(placeholderText)) {
  htmlContent = htmlContent.replace(placeholderText, '');
  console.log('Successfully removed the placeholder text.');
}

// 7. Write the updated index.html back
fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('index.html updated successfully.');
