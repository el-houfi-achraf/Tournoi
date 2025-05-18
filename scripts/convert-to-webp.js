// Script pour convertir les images JPG en WebP
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Chemins des répertoires
const sourceDir = path.join(__dirname, "../public/images/real");
const targetDir = path.join(__dirname, "../public/images/optimized");

// S'assurer que le répertoire cible existe
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Liste des fichiers dans le répertoire source
const files = fs.readdirSync(sourceDir);

// Options de conversion
const resizeOptions = {
  "hero-background": { width: 1920, height: 1080, fit: "cover" },
  "group-tournament": { width: 800, height: 600, fit: "cover" },
  "bracket-tournament": { width: 800, height: 600, fit: "cover" },
  "swiss-tournament": { width: 800, height: 600, fit: "cover" },
  "round-robin": { width: 800, height: 600, fit: "cover" },
  "profile-default": { width: 256, height: 256, fit: "cover" },
  placeholder: { width: 400, height: 300, fit: "cover" },
};

// Configuration WebP
const webpOptions = {
  quality: 85,
  effort: 6, // 0 (le plus rapide) à 6 (la meilleure compression)
};

// Fonction pour optimiser et convertir une image
async function convertToWebP(sourceFile, baseName) {
  try {
    // Déterminer les options de redimensionnement
    let options = null;
    for (const [key, value] of Object.entries(resizeOptions)) {
      if (baseName.startsWith(key)) {
        options = value;
        break;
      }
    }

    // Si aucune option n'est trouvée, utiliser des options par défaut
    if (!options) {
      options = { width: 800, height: 600, fit: "cover" };
    }

    // Créer le nom du fichier de sortie
    const outputBaseName = baseName.replace(/\-\d+$/, ""); // Enlever les numéros à la fin
    const outputFile = path.join(targetDir, `${outputBaseName}.webp`);

    console.log(`Conversion de ${sourceFile} vers ${outputFile}`);

    // Convertir l'image
    await sharp(path.join(sourceDir, sourceFile))
      .resize(options.width, options.height, { fit: options.fit })
      .webp(webpOptions)
      .toFile(outputFile);

    // Créer également un fichier JPG comme fallback pour les navigateurs qui ne supportent pas WebP
    const jpgOutputFile = path.join(targetDir, `${outputBaseName}.jpg`);
    await sharp(path.join(sourceDir, sourceFile))
      .resize(options.width, options.height, { fit: options.fit })
      .jpeg({ quality: 85 })
      .toFile(jpgOutputFile);

    console.log(`Conversion réussie pour ${sourceFile}`);
  } catch (error) {
    console.error(`Erreur lors de la conversion de ${sourceFile}:`, error);
  }
}

// Traiter toutes les images
async function processAllImages() {
  console.log("Début de la conversion des images en WebP...");

  const promises = files.map(async (file) => {
    if (
      file.toLowerCase().endsWith(".jpg") ||
      file.toLowerCase().endsWith(".jpeg") ||
      file.toLowerCase().endsWith(".png")
    ) {
      const baseName = path.basename(file, path.extname(file));
      await convertToWebP(file, baseName);
    }
  });

  await Promise.all(promises);

  console.log("Conversion terminée!");
}

// Exécuter la conversion
processAllImages();
