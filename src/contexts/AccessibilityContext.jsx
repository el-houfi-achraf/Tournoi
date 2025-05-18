import React, { createContext, useState, useEffect, useContext } from "react";

// Création du contexte d'accessibilité
const AccessibilityContext = createContext();

// Provider qui contiendra les fonctionnalités d'accessibilité
export const AccessibilityProvider = ({ children }) => {
  // État pour les préférences d'accessibilité
  const [preferences, setPreferences] = useState({
    fontSize: "normal", // 'small', 'normal', 'large', 'x-large'
    contrast: "normal", // 'normal', 'high'
    reducedMotion: false,
    focusMode: false, // nouveau paramètre pour le mode focus
  });

  // Charger les préférences depuis le localStorage au chargement
  useEffect(() => {
    const savedPrefs = localStorage.getItem("accessibility");
    if (savedPrefs) {
      try {
        setPreferences(JSON.parse(savedPrefs));
      } catch (e) {
        console.error(
          "Erreur lors du chargement des préférences d'accessibilité",
          e
        );
      }
    }

    // Vérifier si l'utilisateur préfère réduire les animations
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setPreferences((prev) => ({ ...prev, reducedMotion: true }));
    }
  }, []);
  // Sauvegarder les préférences dans le localStorage quand elles changent
  useEffect(() => {
    localStorage.setItem("accessibility", JSON.stringify(preferences));

    // Appliquer les préférences au document
    document.documentElement.setAttribute(
      "data-font-size",
      preferences.fontSize
    );
    document.documentElement.setAttribute(
      "data-contrast",
      preferences.contrast
    );
    document.documentElement.setAttribute(
      "data-reduced-motion",
      preferences.reducedMotion
    );
    document.documentElement.setAttribute(
      "data-focus-mode",
      preferences.focusMode
    );

    // Appliquer la taille de police
    let rootFontSize = "16px";
    switch (preferences.fontSize) {
      case "small":
        rootFontSize = "14px";
        break;
      case "normal":
        rootFontSize = "16px";
        break;
      case "large":
        rootFontSize = "18px";
        break;
      case "x-large":
        rootFontSize = "20px";
        break;
      default:
        rootFontSize = "16px";
    }
    document.documentElement.style.fontSize = rootFontSize;
  }, [preferences]);

  // Méthodes pour modifier les préférences
  const setFontSize = (size) => {
    setPreferences((prev) => ({ ...prev, fontSize: size }));
  };

  const toggleHighContrast = () => {
    setPreferences((prev) => ({
      ...prev,
      contrast: prev.contrast === "normal" ? "high" : "normal",
    }));
  };
  const toggleReducedMotion = () => {
    setPreferences((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  // Activer/désactiver le mode focus pour les utilisateurs ayant des troubles de l'attention
  const toggleFocusMode = () => {
    setPreferences((prev) => ({ ...prev, focusMode: !prev.focusMode }));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        setFontSize,
        toggleHighContrast,
        toggleReducedMotion,
        toggleFocusMode,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility doit être utilisé à l'intérieur d'un AccessibilityProvider"
    );
  }
  return context;
};

export default AccessibilityContext;
