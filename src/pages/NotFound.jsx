import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">
          404
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Retourner à l'accueil
          </Link>

          <div>
            <button
              onClick={() => window.history.back()}
              className="text-primary hover:text-blue-700 font-medium transition-colors"
            >
              ← Retourner à la page précédente
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <p className="text-gray-500">
          Vous cherchez à créer un tournoi ?{" "}
          <Link to="/create" className="text-primary hover:underline">
            Cliquez ici
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
