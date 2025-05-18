import { useState, useEffect, useRef } from "react";

// Hook personnalisé pour détecter quand un élément est visible dans le viewport
// Optimise l'utilisation des animations en ne les déclenchant que lorsqu'elles sont visibles
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;

    const currentRef = ref.current; // Stockage de la référence pour le nettoyage

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        // Si once est true, on arrête d'observer une fois que l'élément est visible
        if (entry.isIntersecting && options.once) {
          observer.unobserve(currentRef);
        }
      },
      {
        root: options.root || null,
        rootMargin: options.rootMargin || "0px",
        threshold: options.threshold || 0.1,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [options.root, options.rootMargin, options.threshold, options.once]);

  return [ref, isInView];
};

export default useInView;
