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

      {activeTab === "matches" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tournament.matches.map((match) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${match.team1.avatar}`}
                    >
                      {match.team1.name[0].toUpperCase()}
                    </div>
                    <span className="font-medium">{match.team1.name}</span>
                  </div>

                  <ScoreInput
                    score1={match.score1}
                    score2={match.score2}
                    completed={match.completed}
                    onChange={(score1, score2) =>
                      handleScoreUpdate(match.id, score1, score2)
                    }
                  />

                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{match.team2.name}</span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${match.team2.avatar}`}
                    >
                      {match.team2.name[0].toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Indicateur de match complété */}
                {match.completed && (
                  <div className="text-right text-xs text-green-600 font-medium">
                    Résultat enregistré
                  </div>
                )}
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
