import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibility } from "../contexts/AccessibilityContext";
import Tooltip from "./Tooltip";

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    preferences,
    setFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    toggleFocusMode,
  } = useAccessibility();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Bouton d'accessibilité */}
      <button
        onClick={togglePanel}
        className="fixed bottom-4 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        aria-label="Options d'accessibilité"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>

      {/* Panneau d'accessibilité */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 bg-white p-5 rounded-lg shadow-xl w-64"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Accessibilité</h3>
              <button
                onClick={togglePanel}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Fermer le panneau d'accessibilité"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/* Taille du texte */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Taille du texte
              </label>
              <div className="flex space-x-2">
                {["small", "normal", "large", "x-large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-3 py-1 rounded ${
                      preferences.fontSize === size
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    } transition-colors`}
                    aria-pressed={preferences.fontSize === size}
                  >
                    {size === "small" && "A-"}
                    {size === "normal" && "A"}
                    {size === "large" && "A+"}
                    {size === "x-large" && "A++"}
                  </button>
                ))}
              </div>
            </div>
            {/* Contraste élevé */}
            <div className="mb-4">
              {" "}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.contrast === "high"}
                  onChange={toggleHighContrast}
                  className="rounded text-primary focus:ring-primary"
                />
                <Tooltip text="Améliore la lisibilité en augmentant le contraste des couleurs">
                  <span>Contraste élevé</span>
                </Tooltip>
              </label>
            </div>{" "}
            {/* Réduire les animations */}
            <div className="mb-4">
              {" "}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.reducedMotion}
                  onChange={toggleReducedMotion}
                  className="rounded text-primary focus:ring-primary"
                />
                <Tooltip text="Limite les mouvements et animations qui peuvent causer des problèmes de vertiges">
                  <span>Réduire les animations</span>
                </Tooltip>
              </label>
            </div>
            {/* Mode Focus */}
            <div>
              {" "}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.focusMode}
                  onChange={toggleFocusMode}
                  className="rounded text-primary focus:ring-primary"
                />
                <Tooltip text="Réduit les distractions visuelles pour améliorer la concentration">
                  <span>Mode focus</span>
                </Tooltip>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityPanel;
