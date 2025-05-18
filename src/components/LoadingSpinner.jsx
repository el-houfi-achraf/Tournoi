import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "md", text = "Chargement..." }) => {
  // Tailles disponibles
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className={`rounded-full border-t-2 border-b-2 border-primary ${sizes[size]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && <p className="mt-4 text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
