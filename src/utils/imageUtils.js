/**
 * Utilitaires pour l'optimisation des images
 */

// Préchargement des images importantes
export const preloadCriticalImages = () => {
  // Images à précharger en priorité
  const criticalImages = [
    "/images/real/hero-background.jpg",
    "/images/real/group-tournament.jpg",
    "/images/real/bracket-tournament.jpg",
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

// Attribution du bon format d'image en fonction des capacités du navigateur
export const getOptimizedImagePath = (path, format = "jpg") => {
  // Utiliser des images JPG réelles

  // Vérifier si le navigateur prend en charge le format WebP
  const supportsWebp = () => {
    const elem = document.createElement("canvas");
    if (elem.getContext && elem.getContext("2d")) {
      return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    }
    return false;
  };
  // Si le chemin contient optimized, le changer pour real
  if (path.includes("/optimized/")) {
    path = path.replace("/optimized/", "/real/");
  }

  // Si le chemin contient une extension SVG, la remplacer par JPG
  if (path.includes(".svg")) {
    return path.replace(/\.svg$/, ".jpg");
  }

  // Pour les profils par défaut, ajouter un numéro aléatoire
  if (path.includes("profile-default")) {
    // Numéro aléatoire entre 1 et 3
    const randomNum = Math.floor(Math.random() * 3) + 1;
    return path.replace(
      /profile-default\.jpg$/,
      `profile-default-${randomNum}.jpg`
    );
  }

  return path;
};

// Chargement paresseux des images
export const lazyLoadImage = (
  imageRef,
  src,
  placeholder = "/images/real/placeholder.jpg"
) => {
  if (!imageRef.current) return;

  const img = new Image();
  img.src = src;

  // Chargement d'un placeholder en attendant
  imageRef.current.src = placeholder;

  img.onload = () => {
    // Animation de fondu lors du chargement
    imageRef.current.style.opacity = "0";
    imageRef.current.src = src;

    // Animation de fondu
    setTimeout(() => {
      if (imageRef.current) {
        imageRef.current.style.transition = "opacity 0.3s ease-in";
        imageRef.current.style.opacity = "1";
      }
    }, 50);
  };
};

// Dimensionnements responsifs pour les images
export const getResponsiveImageUrl = (basePath, width) => {
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  };

  // Déterminer la taille de l'image en fonction de la largeur d'écran
  let size = "lg";

  if (width < breakpoints.sm) size = "sm";
  else if (width < breakpoints.md) size = "md";
  else if (width < breakpoints.lg) size = "lg";
  else size = "xl";

  // Le chemin doit suivre la convention: /path/to/image-size.webp
  const parts = basePath.split(".");
  const extension = parts.pop();
  const namePath = parts.join(".");

  return `${namePath}-${size}.${extension}`;
};
