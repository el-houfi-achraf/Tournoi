import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/accessibility.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { preloadCriticalImages } from "./utils/imageUtils";

// Précharger les images critiques pour améliorer les performances perçues
preloadCriticalImages();

// Définition des fonctions de gestion du Service Worker
const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker enregistré avec succès:",
            registration.scope
          );

          // Gestion des mises à jour du service worker
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // Nouvelle version disponible
                if (
                  window.confirm(
                    "Une nouvelle version de TournoMaster est disponible. Voulez-vous l'utiliser maintenant ?"
                  )
                ) {
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((error) => {
          console.error("Échec de l'enregistrement du Service Worker:", error);
        });
    });
  }
};

// Enregistrement du service worker pour les fonctionnalités hors ligne
registerServiceWorker();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mesure des performances web vitals
// Les résultats peuvent être utilisés pour analyser et améliorer les performances
reportWebVitals(console.log);
