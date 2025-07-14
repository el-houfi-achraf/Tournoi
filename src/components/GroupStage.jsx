import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ScoreInput from "./ScoreInput";
import RankingTable from "./RankingTable";

const GroupStage = ({ tournament, onScoreUpdate }) => {
  const [activeTab, setActiveTab] = useState("matches");

  // Calculer le classement en fonction des scores
  const rankingData = useMemo(() => {
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
  }, [tournament.teams, tournament.matches]);

  // Vérifier si le tournoi est terminé (tous les matchs sont joués)
  const isTournamentCompleted = useMemo(() => {
    return tournament.matches.every((match) => match.completed);
  }, [tournament.matches]);

  // Obtenir le gagnant (équipe en première position)
  const winner = useMemo(() => {
    if (isTournamentCompleted && rankingData.length > 0) {
      return rankingData[0];
    }
    return null;
  }, [isTournamentCompleted, rankingData]);

  const handleScoreUpdate = (matchId, score1, score2) => {
    onScoreUpdate(matchId, Number(score1), Number(score2));
  };

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`py-3 px-5 border-b-2 font-medium text-sm ${
            activeTab === "matches"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("matches")}
        >
          Matches
        </button>
        <button
          className={`py-3 px-5 border-b-2 font-medium text-sm ${
            activeTab === "ranking"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("ranking")}
        >
          Classement
        </button>
      </div>

      {/* Affichage du gagnant */}
      {isTournamentCompleted && winner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          className="mb-4 relative"
        >
          {/* Contenu principal compact */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4">
              {/* Header compact avec badge et titre */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-accent to-yellow-500 rounded-full shadow-md">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div className="bg-gradient-to-r from-primary to-secondary text-white px-2 py-1 rounded-full text-xs font-medium">
                    Terminé
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-heading font-bold text-dark">
                    Champion du tournoi
                  </h3>
                  <div className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    <p className="text-lg sm:text-xl font-heading font-bold">
                      {winner.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistiques compactes */}
              <div className="flex justify-center space-x-4 sm:space-x-6">
                <div className="text-center">
                  <div className="bg-primary/10 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 min-w-[50px]">
                    <div className="text-sm sm:text-lg font-bold text-primary">
                      {winner.points}
                    </div>
                    <div className="text-xs text-gray-600">
                      Point{winner.points > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-secondary/10 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 min-w-[50px]">
                    <div className="text-sm sm:text-lg font-bold text-secondary">
                      {winner.wins}
                    </div>
                    <div className="text-xs text-gray-600">
                      Victoire{winner.wins > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-accent/10 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 min-w-[50px]">
                    <div className="text-sm sm:text-lg font-bold text-accent">
                      {winner.goalDifference > 0
                        ? `+${winner.goalDifference}`
                        : winner.goalDifference}
                    </div>
                    <div className="text-xs text-gray-600">Différence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "matches" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {tournament.matches.map((match) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-3 sm:p-4"
              >
                {/* Layout mobile optimisé */}
                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  {/* Équipes et score */}
                  <div className="flex items-center justify-between sm:justify-start sm:flex-1">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-sm sm:text-base ${match.team1.avatar}`}
                      >
                        {match.team1.name[0].toUpperCase()}
                      </div>
                      <span className="font-medium text-sm sm:text-base truncate max-w-[80px] sm:max-w-none">
                        {match.team1.name}
                      </span>
                    </div>

                    <div className="mx-2 sm:mx-4 flex-shrink-0">
                      <ScoreInput
                        score1={match.score1}
                        score2={match.score2}
                        completed={match.completed}
                        onChange={(score1, score2) =>
                          handleScoreUpdate(match.id, score1, score2)
                        }
                      />
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 justify-end">
                      <span className="font-medium text-sm sm:text-base truncate max-w-[80px] sm:max-w-none">
                        {match.team2.name}
                      </span>
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-sm sm:text-base ${match.team2.avatar}`}
                      >
                        {match.team2.name[0].toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Indicateur de match complété */}
                  {match.completed && (
                    <div className="text-center sm:text-right text-xs text-green-600 font-medium">
                      Résultat enregistré
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <RankingTable teams={rankingData} />
      )}
    </div>
  );
};

export default GroupStage;
