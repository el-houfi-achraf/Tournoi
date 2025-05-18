import { createContext, useState, useEffect, useContext } from "react";

// Créer le contexte
const TournamentContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useTournaments = () => {
  return useContext(TournamentContext);
};

// Provider component
export const TournamentProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les tournois depuis le localStorage au démarrage
  useEffect(() => {
    const storedTournaments = JSON.parse(
      localStorage.getItem("tournaments") || "[]"
    );
    setTournaments(storedTournaments);
    setLoading(false);
  }, []);

  // Sauvegarder les tournois dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("tournaments", JSON.stringify(tournaments));
  }, [tournaments]);

  // Obtenir un tournoi par son ID
  const getTournamentById = (id) => {
    return tournaments.find((tournament) => tournament.id === id);
  };

  // Ajouter un nouveau tournoi
  const addTournament = (tournament) => {
    setTournaments((prevTournaments) => [...prevTournaments, tournament]);
  };

  // Mettre à jour un tournoi existant
  const updateTournament = (updatedTournament) => {
    setTournaments((prevTournaments) =>
      prevTournaments.map((tournament) =>
        tournament.id === updatedTournament.id ? updatedTournament : tournament
      )
    );
  };

  // Supprimer un tournoi
  const deleteTournament = (id) => {
    setTournaments((prevTournaments) =>
      prevTournaments.filter((tournament) => tournament.id !== id)
    );
  };

  const value = {
    tournaments,
    loading,
    getTournamentById,
    addTournament,
    updateTournament,
    deleteTournament,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
