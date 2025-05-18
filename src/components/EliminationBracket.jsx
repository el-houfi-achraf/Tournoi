import { useMemo } from "react";
import ScoreInput from "./ScoreInput";
import { motion } from "framer-motion";

const EliminationBracket = ({ tournament, onScoreUpdate }) => {
  // Organiser les matches par tour
  const matchesByRound = useMemo(() => {
    const rounds = {};
    const maxRound = Math.max(
      ...tournament.matches.map((match) => match.round)
    );

    for (let i = 1; i <= maxRound; i++) {
      rounds[i] = tournament.matches
        .filter((match) => match.round === i)
        .sort((a, b) => {
          const aIndex = parseInt(a.id.split("-")[2]);
          const bIndex = parseInt(b.id.split("-")[2]);
          return aIndex - bIndex;
        });
    }

    return rounds;
  }, [tournament.matches]);

  // Calculer le nombre de tours
  const roundsCount = Object.keys(matchesByRound).length;

  // Calculer les lignes entre les matches
  const renderConnectorLines = (roundIndex, matchIndex, totalMatches) => {
    if (roundIndex === roundsCount - 1) return null; // Pas de connecteurs pour le dernier match

    const isEven = matchIndex % 2 === 0;
    const isLast = matchIndex === totalMatches - 1;

    if (isEven && !isLast) {
      return (
        <div className="connector">
          <div className="vertical-line"></div>
          <div className="horizontal-line"></div>
          <div className="vertical-line"></div>
        </div>
      );
    }

    return null;
  };

  const handleScoreUpdate = (matchId, score1, score2) => {
    onScoreUpdate(matchId, score1, score2);
  };

  // Détecter si un tournoi est terminé (finale complétée)
  const isTournamentCompleted = useMemo(() => {
    const finalRound = matchesByRound[roundsCount];
    return finalRound && finalRound.length === 1 && finalRound[0].completed;
  }, [matchesByRound, roundsCount]);

  // Trouver le gagnant du tournoi
  const winner = useMemo(() => {
    if (!isTournamentCompleted) return null;

    const final = matchesByRound[roundsCount][0];
    return final.score1 > final.score2 ? final.team1 : final.team2;
  }, [isTournamentCompleted, matchesByRound, roundsCount]);

  return (
    <div className="max-w-full overflow-x-auto">
      {/* Affichage du gagnant si le tournoi est terminé */}
      {isTournamentCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-10 text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-2">Le tournoi est terminé !</h2>
          <div className="flex flex-col items-center justify-center">
            <div
              className={`w-20 h-20 ${winner.avatar} rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2`}
            >
              {winner.name[0].toUpperCase()}
            </div>
            <h3 className="text-xl font-bold">{winner.name}</h3>
            <div className="mt-2 inline-block bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full font-bold text-sm">
              Champion 🏆
            </div>
          </div>
        </motion.div>
      )}

      {/* Bracket principal */}
      <div
        className="bracket-container"
        style={{ minWidth: `${roundsCount * 320}px` }}
      >
        <div className="flex">
          {Object.keys(matchesByRound).map((round, roundIndex) => (
            <div
              key={`round-${round}`}
              className="round-column"
              style={{ flex: 1 }}
            >
              <h3 className="text-center font-bold mb-6 text-gray-600">
                {roundIndex === 0
                  ? "1er Tour"
                  : roundIndex === roundsCount - 1
                  ? "Finale"
                  : `${roundIndex + 1}ème Tour`}
              </h3>

              <div className="matches-container space-y-10">
                {matchesByRound[round].map((match, matchIndex) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: matchIndex * 0.1 }}
                    className={`match-card p-4 bg-white border ${
                      match.completed ? "border-green-300" : "border-gray-200"
                    } rounded-lg shadow-sm`}
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {match.team1.name !== "À déterminer" ? (
                            <>
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${match.team1.avatar}`}
                              >
                                {match.team1.name[0].toUpperCase()}
                              </div>
                              <span className="font-medium">
                                {match.team1.name}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-400">À déterminer</span>
                          )}
                        </div>

                        {match.team1.name !== "À déterminer" &&
                          match.team2.name !== "À déterminer" && (
                            <span
                              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                                match.completed && match.score1 > match.score2
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {match.score1 !== null ? match.score1 : "-"}
                            </span>
                          )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {match.team2.name !== "À déterminer" ? (
                            <>
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${match.team2.avatar}`}
                              >
                                {match.team2.name[0].toUpperCase()}
                              </div>
                              <span className="font-medium">
                                {match.team2.name}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-400">À déterminer</span>
                          )}
                        </div>

                        {match.team1.name !== "À déterminer" &&
                          match.team2.name !== "À déterminer" && (
                            <span
                              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                                match.completed && match.score1 < match.score2
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {match.score2 !== null ? match.score2 : "-"}
                            </span>
                          )}
                      </div>

                      {/* Score input section */}
                      {match.team1.name !== "À déterminer" &&
                        match.team2.name !== "À déterminer" &&
                        match.team1.name !== "Bye" &&
                        match.team2.name !== "Bye" && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <div className="flex justify-center">
                              <ScoreInput
                                score1={match.score1}
                                score2={match.score2}
                                completed={match.completed}
                                onChange={(score1, score2) =>
                                  handleScoreUpdate(match.id, score1, score2)
                                }
                              />
                            </div>
                          </div>
                        )}

                      {/* Auto-advance for "Bye" matches */}
                      {(match.team1.name === "Bye" ||
                        match.team2.name === "Bye") &&
                        !match.completed && (
                          <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                            <button
                              onClick={() => {
                                const score1 =
                                  match.team1.name === "Bye" ? 0 : 1;
                                const score2 =
                                  match.team2.name === "Bye" ? 0 : 1;
                                handleScoreUpdate(match.id, score1, score2);
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              Avancer automatiquement
                            </button>
                          </div>
                        )}
                    </div>

                    {renderConnectorLines(
                      roundIndex,
                      matchIndex,
                      matchesByRound[round].length
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .bracket-container {
          display: flex;
          flex-direction: column;
          overflow-x: auto;
        }

        .round-column {
          padding: 0 20px;
        }

        .connector {
          position: absolute;
          right: -20px;
          top: 50%;
          display: flex;
          align-items: center;
        }

        .vertical-line {
          width: 2px;
          height: 50px;
          background-color: #e5e7eb;
        }

        .horizontal-line {
          width: 20px;
          height: 2px;
          background-color: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default EliminationBracket;
