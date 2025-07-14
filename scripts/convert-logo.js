// Converter script for favicon
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// Check if ImageMagick is installed
exec("magick --version", (error) => {
  if (error) {
    console.error(
      "ImageMagick is not installed. Please install it to convert images."
    );
    console.log(
      "You can download it from https://imagemagick.org/script/download.php"
    );
    process.exit(1);
  }

  // Path to the SVG logo
  const svgPath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "tournament-logo.svg"
  );
  const publicDir = path.join(__dirname, "..", "public");

  // Create favicon.ico (16x16, 32x32, 48x48)
  exec(
    `magick convert ${svgPath} -background none -define icon:auto-resize=16,32,48 ${path.join(
      publicDir,
      "favicon.ico"
    )}`,
    (err) => {
      if (err) {
        console.error("Error creating favicon.ico:", err);
        return;
      }
      console.log("favicon.ico created successfully");
    }
  );

  // Create PNG versions for various sizes
  const sizes = [16, 32, 48, 192, 512];
  sizes.forEach((size) => {
    exec(
      `magick convert ${svgPath} -background none -resize ${size}x${size} ${path.join(
        publicDir,
        `logo${size}.png`
      )}`,
      (err) => {
        if (err) {
          console.error(`Error creating logo${size}.png:`, err);
          return;
        }
        console.log(`logo${size}.png created successfully`);
      }
    );
  });
});
