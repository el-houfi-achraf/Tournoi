import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RankingTable from "../components/RankingTable";

const ResultsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    // Récupérer les tournois depuis le localStorage
    const tournaments = JSON.parse(localStorage.getItem("tournaments") || "[]");
    const foundTournament = tournaments.find((t) => t.id === id);

    if (foundTournament) {
      setTournament(foundTournament);
      if (foundTournament.type === "elimination") {
        calculateEliminationWinners(foundTournament);
      }
    }

    setLoading(false);
  }, [id]);

  // Calculer le classement pour les tournois en phase de groupes
  const rankingData =
    tournament?.type === "groups" ? calculateGroupRanking(tournament) : [];

  // Calculer le podium pour les tournois à élimination directe
  const calculateEliminationWinners = (tournament) => {
    const maxRound = Math.max(
      ...tournament.matches.map((match) => match.round)
    );

    // On cherche la finale (match du dernier tour)
    const final = tournament.matches.find(
      (match) => match.round === maxRound && match.completed
    );

    if (!final) {
      setWinners([]);
      return;
    }

    // On détermine le vainqueur et le finaliste
    const winner = final.score1 > final.score2 ? final.team1 : final.team2;
    const runnerUp = final.score1 > final.score2 ? final.team2 : final.team1;

    // Pour la 3ème place, on regarde les demi-finales (si disponibles)
    const semiFinals = tournament.matches.filter(
      (match) => match.round === maxRound - 1
    );
    let thirdPlace = null;

    if (semiFinals.length === 2) {
      // Trouver les équipes perdantes des demi-finales
      const losers = [];

      semiFinals.forEach((match) => {
        if (match.completed) {
          const loser = match.score1 > match.score2 ? match.team2 : match.team1;
          losers.push(loser);
        }
      });

      // S'il y a un match pour la 3ème place, on utilise ce résultat
      // Sinon, on prend simplement les deux demi-finalistes perdants
      if (losers.length > 0) {
        thirdPlace = losers[0]; // On pourrait améliorer cela avec un match de 3ème place
      }
    }

    setWinners(
      [
        { position: 1, team: winner },
        { position: 2, team: runnerUp },
        thirdPlace ? { position: 3, team: thirdPlace } : null,
      ].filter(Boolean)
    );
  };

  // Calculer le classement pour les tournois en phase de groupes
  function calculateGroupRanking(tournament) {
    const teams = tournament.teams.map((team) => ({
      ...team,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    }));

    // Parcourir tous les matchs complétés
    tournament.matches
      .filter((match) => match.completed)
      .forEach((match) => {
        const team1Index = teams.findIndex(
          (team) => team.id === match.team1.id
        );
        const team2Index = teams.findIndex(
          (team) => team.id === match.team2.id
        );

        if (team1Index >= 0 && team2Index >= 0) {
          const score1 = Number(match.score1);
          const score2 = Number(match.score2);

          // Mise à jour équipe 1
          teams[team1Index].played += 1;
          teams[team1Index].goalsFor += score1;
          teams[team1Index].goalsAgainst += score2;
          teams[team1Index].goalDifference =
            teams[team1Index].goalsFor - teams[team1Index].goalsAgainst;

          // Mise à jour équipe 2
          teams[team2Index].played += 1;
          teams[team2Index].goalsFor += score2;
          teams[team2Index].goalsAgainst += score1;
          teams[team2Index].goalDifference =
            teams[team2Index].goalsFor - teams[team2Index].goalsAgainst;

          // Déterminer le résultat
          if (score1 > score2) {
            // Équipe 1 gagne
            teams[team1Index].wins += 1;
            teams[team1Index].points += 3;
            teams[team2Index].losses += 1;
          } else if (score1 < score2) {
            // Équipe 2 gagne
            teams[team2Index].wins += 1;
            teams[team2Index].points += 3;
            teams[team1Index].losses += 1;
          } else {
            // Match nul
            teams[team1Index].draws += 1;
            teams[team1Index].points += 1;
            teams[team2Index].draws += 1;
            teams[team2Index].points += 1;
          }
        }
      });

    // Trier par points, puis différence de buts, puis buts marqués
    return teams.sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      } else if (a.goalDifference !== b.goalDifference) {
        return b.goalDifference - a.goalDifference;
      } else {
        return b.goalsFor - a.goalsFor;
      }
    });
  }

  const createNewTournament = () => {
    navigate("/create");
  };

  const goToTournament = () => {
    navigate(`/tournament/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Tournoi non trouvé
        </h2>
        <p className="text-gray-600 mb-8">
          Le tournoi que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <span className="text-xl mr-2">{tournament.sportIcon}</span>
          <h1 className="text-3xl font-bold">Résultats: {tournament.name}</h1>
        </div>
        <p className="text-gray-600">
          {tournament.type === "groups"
            ? "Phase de groupes"
            : "Élimination directe"}{" "}
          •{tournament.teams.length} équipes
        </p>
      </div>

      {tournament.type === "elimination" ? (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Podium</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            {winners.length > 0 ? (
              winners.map((winner, index) => (
                <motion.div
                  key={winner.position}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className={`podium-card text-center p-6 rounded-xl shadow-md ${
                    winner.position === 1
                      ? "bg-gradient-to-br from-yellow-100 to-yellow-200 order-first md:order-2"
                      : winner.position === 2
                      ? "bg-gradient-to-br from-gray-100 to-gray-200 order-2 md:order-1"
                      : "bg-gradient-to-br from-amber-50 to-amber-100 order-last md:order-3"
                  }`}
                >
                  <div className="relative mb-4">
                    <div
                      className={`
                      w-24 h-24 mx-auto rounded-full shadow-lg flex items-center justify-center 
                      ${winner.team.avatar} text-4xl font-bold text-white
                    `}
                    >
                      {winner.team.name[0].toUpperCase()}
                    </div>
                    <div
                      className={`
                      absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center font-bold
                      ${
                        winner.position === 1
                          ? "bg-yellow-400 text-yellow-800"
                          : winner.position === 2
                          ? "bg-gray-300 text-gray-700"
                          : "bg-amber-600 text-amber-100"
                      }
                    `}
                    >
                      {winner.position}
                    </div>
                  </div>

                  <h3 className="font-bold text-xl mb-2">{winner.team.name}</h3>
                  <div className="text-sm">
                    {winner.position === 1
                      ? "🏆 Champion"
                      : winner.position === 2
                      ? "🥈 Finaliste"
                      : "🥉 Demi-finaliste"}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Le tournoi n'est pas encore terminé
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">Classement final</h2>
          <RankingTable teams={rankingData} />
        </div>
      )}

      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-6">Statistiques</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Total de matches</div>
            <div className="font-bold text-2xl">
              {tournament.matches.length}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Matches joués</div>
            <div className="font-bold text-2xl">
              {tournament.matches.filter((m) => m.completed).length}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">
              Équipes participantes
            </div>
            <div className="font-bold text-2xl">{tournament.teams.length}</div>
          </div>

          {tournament.type === "groups" && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Buts marqués</div>
                <div className="font-bold text-2xl">
                  {tournament.matches.reduce((total, match) => {
                    if (match.completed) {
                      return (
                        total + Number(match.score1) + Number(match.score2)
                      );
                    }
                    return total;
                  }, 0)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">
                  Moyenne buts / match
                </div>
                <div className="font-bold text-2xl">
                  {tournament.matches.filter((m) => m.completed).length > 0
                    ? (
                        tournament.matches.reduce((total, match) => {
                          if (match.completed) {
                            return (
                              total +
                              Number(match.score1) +
                              Number(match.score2)
                            );
                          }
                          return total;
                        }, 0) /
                        tournament.matches.filter((m) => m.completed).length
                      ).toFixed(1)
                    : "0.0"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={goToTournament}
          className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Retour au tournoi
        </button>
        <button onClick={createNewTournament} className="btn btn-primary">
          Créer un nouveau tournoi
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
