// Placeholder generator script for TournoMaster
// This script creates placeholder images in the optimized folder

const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

// Ensure the optimized directory exists
const optimizedDir = path.join(__dirname, "../public/images/optimized");
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Default image sizes
const imageSizes = {
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

// Function to generate a placeholder image
function generatePlaceholder(name, options) {
  const { width, height, color, text } = options;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // Add diagonal stripes for visual interest
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 20;
  for (let i = -height; i < width + height; i += 60) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + height, height);
    ctx.stroke();
  }

  // Add text
  ctx.font = `bold ${Math.floor(width / 15)}px Inter, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillText(text, width / 2, height / 2);

  // Add TournoMaster watermark
  ctx.font = `${Math.floor(width / 30)}px Inter, sans-serif`;
  ctx.fillText("TournoMaster", width / 2, height - 30);

  // Save as WebP
  const buffer = canvas.toBuffer("image/webp");
  fs.writeFileSync(path.join(optimizedDir, `${name}.webp`), buffer);

  // Also save as JPG as a fallback
  const jpgBuffer = canvas.toBuffer("image/jpeg");
  fs.writeFileSync(path.join(optimizedDir, `${name}.jpg`), jpgBuffer);

  console.log(`Generated placeholder for ${name}`);
}

// Generate all placeholder images
console.log("Generating placeholder images...");
Object.entries(imageSizes).forEach(([name, options]) => {
  try {
    generatePlaceholder(name, options);
  } catch (error) {
    console.error(`Error generating ${name}:`, error);
  }
});

console.log("Done generating placeholder images.");
