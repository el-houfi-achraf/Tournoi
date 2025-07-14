import { useState, useEffect } from "react";

const ScoreInput = ({ score1, score2, completed, onChange }) => {
  const [localScore1, setLocalScore1] = useState(score1 !== null ? score1 : "");
  const [localScore2, setLocalScore2] = useState(score2 !== null ? score2 : "");
  const [isEditing, setIsEditing] = useState(!completed);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState(null);

  // Fonction de sauvegarde automatique avec debounce
  const autoSave = () => {
    if (localScore1 !== "" && localScore2 !== "") {
      onChange(Number(localScore1), Number(localScore2));
      setIsEditing(false);
    }
  };

  // Effet pour la sauvegarde automatique après un délai
  useEffect(() => {
    // Nettoyer le timeout précédent
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }

    // Si les deux scores sont renseignés, programmer la sauvegarde automatique
    if (isEditing && localScore1 !== "" && localScore2 !== "") {
      const timeoutId = setTimeout(() => {
        if (localScore1 !== "" && localScore2 !== "") {
          onChange(Number(localScore1), Number(localScore2));
          setIsEditing(false);
        }
      }, 500); // Sauvegarde automatique après 0.5 secondes d'inactivité

      setAutoSaveTimeout(timeoutId);
    }

    // Cleanup function
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [localScore1, localScore2, isEditing, onChange, autoSaveTimeout]);

  const handleScore1Change = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setLocalScore1(value);
      // Si l'autre score est déjà rempli, déclencher la sauvegarde plus rapidement
      if (localScore2 !== "" && value !== "") {
        // Nettoyer le timeout existant et créer un nouveau plus court
        if (autoSaveTimeout) {
          clearTimeout(autoSaveTimeout);
        }
        const quickTimeoutId = setTimeout(() => {
          onChange(Number(value), Number(localScore2));
          setIsEditing(false);
        }, 200); // Sauvegarde très rapide quand les deux champs sont remplis
        setAutoSaveTimeout(quickTimeoutId);
      }
    }
  };

  const handleScore2Change = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setLocalScore2(value);
      // Si l'autre score est déjà rempli, déclencher la sauvegarde plus rapidement
      if (localScore1 !== "" && value !== "") {
        // Nettoyer le timeout existant et créer un nouveau plus court
        if (autoSaveTimeout) {
          clearTimeout(autoSaveTimeout);
        }
        const quickTimeoutId = setTimeout(() => {
          onChange(Number(localScore1), Number(value));
          setIsEditing(false);
        }, 200); // Sauvegarde très rapide quand les deux champs sont remplis
        setAutoSaveTimeout(quickTimeoutId);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Fonction pour forcer la sauvegarde (ex: quand on appuie sur Entrée ou perd le focus)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && localScore1 !== "" && localScore2 !== "") {
      autoSave();
    }
  };

  // Sauvegarde quand l'utilisateur quitte le champ
  const handleBlur = () => {
    if (localScore1 !== "" && localScore2 !== "") {
      // Petit délai pour permettre de passer au champ suivant
      setTimeout(() => {
        autoSave();
      }, 100);
    }
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <>
          <input
            type="text"
            value={localScore1}
            onChange={handleScore1Change}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-md text-center text-sm sm:text-base focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="0"
            autoFocus
          />
          <span className="mx-1 sm:mx-2 text-gray-400 text-sm sm:text-base">
            -
          </span>
          <input
            type="text"
            value={localScore2}
            onChange={handleScore2Change}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-md text-center text-sm sm:text-base focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="0"
          />
          {/* Indicateur de sauvegarde automatique - caché sur mobile */}
          {localScore1 !== "" && localScore2 !== "" && (
            <div className="hidden sm:flex ml-2 items-center text-xs text-green-600 animate-pulse">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Sauvegarde rapide...
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center">
            <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 rounded-md font-bold text-sm sm:text-base">
              {score1}
            </span>
            <span className="mx-1 sm:mx-2 text-gray-400 text-sm sm:text-base">
              -
            </span>
            <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 rounded-md font-bold text-sm sm:text-base">
              {score2}
            </span>
            <button
              onClick={handleEdit}
              className="ml-1 sm:ml-2 p-1 text-gray-500 hover:text-gray-700 transition"
              title="Modifier le score"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ScoreInput;
