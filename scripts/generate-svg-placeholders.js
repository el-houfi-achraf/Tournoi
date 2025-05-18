// Generate SVG placeholders for TournoMaster
const fs = require("fs");
const path = require("path");

// Ensure the optimized directory exists
const optimizedDir = path.join(__dirname, "../public/images/optimized");
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Default image config
const images = {
  "hero-background": {
    width: 1920,
    height: 1080,
    color: "#3B82F6",
    text: "Hero Background",
  },
  "group-tournament": {
    width: 800,
    height: 600,
    color: "#34D399",
    text: "Group Tournament",
  },
  "bracket-tournament": {
    width: 800,
    height: 600,
    color: "#F87171",
    text: "Bracket Tournament",
  },
  placeholder: {
    width: 400,
    height: 300,
    color: "#9CA3AF",
    text: "Loading...",
  },
  "swiss-tournament": {
    width: 800,
    height: 600,
    color: "#60A5FA",
    text: "Swiss Tournament",
  },
  "round-robin": {
    width: 800,
    height: 600,
    color: "#FBBF24",
    text: "Round Robin",
  },
  "profile-default": {
    width: 256,
    height: 256,
    color: "#8B5CF6",
    text: "User",
  },
};

// Function to generate an SVG placeholder
function generateSvgPlaceholder(name, options) {
  const { width, height, color, text } = options;

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${color}" />
    <pattern id="diagonalPattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
      <rect width="30" height="60" fill="rgba(255, 255, 255, 0.1)" />
    </pattern>
    <rect width="${width}" height="${height}" fill="url(#diagonalPattern)" />
    <text x="${width / 2}" y="${
    height / 2
  }" font-family="Inter, sans-serif" font-size="${Math.floor(
    width / 15
  )}" font-weight="bold" fill="rgba(255, 255, 255, 0.9)" text-anchor="middle">${text}</text>
    <text x="${width / 2}" y="${
    height - 30
  }" font-family="Inter, sans-serif" font-size="${Math.floor(
    width / 30
  )}" fill="rgba(255, 255, 255, 0.9)" text-anchor="middle">TournoMaster</text>
  </svg>`;

  // Save the SVG file
  fs.writeFileSync(path.join(optimizedDir, `${name}.svg`), svgContent);

  console.log(`Generated SVG placeholder for ${name}`);
}

// Generate all SVG placeholders
console.log("Generating SVG placeholder images...");
Object.entries(images).forEach(([name, options]) => {
  try {
    generateSvgPlaceholder(name, options);
  } catch (error) {
    console.error(`Error generating ${name}:`, error);
  }
});

console.log("Done generating SVG placeholder images.");
