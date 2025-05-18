import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Composant de tooltip accessible
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Élément qui déclenche le tooltip
 * @param {string} props.text - Texte du tooltip
 * @param {string} props.position - Position du tooltip ('top', 'right', 'bottom', 'left')
 * @param {string} props.delay - Délai avant l'affichage en ms
 */
const Tooltip = ({ children, text, position = "top", delay = "500" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // Calcul de la position du tooltip
  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    }
  };

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, parseInt(delay));
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const handleFocus = () => {
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${getPositionStyles()}`}
            role="tooltip"
          >
            <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
