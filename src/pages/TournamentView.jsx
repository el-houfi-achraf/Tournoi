import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Components
import GroupStage from "../components/GroupStage";
import EliminationBracket from "../components/EliminationBracket";

const TournamentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    // Récupérer les tournois depuis le localStorage
    const tournaments = JSON.parse(localStorage.getItem("tournaments") || "[]");
    const foundTournament = tournaments.find((t) => t.id === id);

    if (foundTournament) {
      setTournament(foundTournament);
    }

    setLoading(false);
  }, [id]);

  // Mettre à jour le localStorage lorsque le tournoi change
  useEffect(() => {
    if (tournament) {
      const tournaments = JSON.parse(
        localStorage.getItem("tournaments") || "[]"
      );
      const updatedTournaments = tournaments.map((t) =>
        t.id === tournament.id ? tournament : t
      );
      localStorage.setItem("tournaments", JSON.stringify(updatedTournaments));
    }
  }, [tournament]);

  const handleScoreUpdate = (matchId, score1, score2) => {
    if (!tournament) return;

    setTournament((prevTournament) => {
      const updatedMatches = prevTournament.matches.map((match) => {
        if (match.id === matchId) {
          return {
            ...match,
            score1: score1,
            score2: score2,
            completed: true,
          };
        }
        return match;
      });

      let updatedTournament = {
        ...prevTournament,
        matches: updatedMatches,
      };

      // Si c'est un tournoi à élimination directe, mettre à jour les matches suivants
      if (prevTournament.type === "elimination") {
        updatedTournament = updateEliminationTournament(
          updatedTournament,
          matchId
        );
      }

      return updatedTournament;
    });
  };

  // Mettre à jour les matches suivants dans un tournoi à élimination directe
  const updateEliminationTournament = (tournament, matchId) => {
    const match = tournament.matches.find((m) => m.id === matchId);
    if (!match || !match.nextMatchId) return tournament;

    const winner = match.score1 > match.score2 ? match.team1 : match.team2;
    const nextMatch = tournament.matches.find(
      (m) => m.id === match.nextMatchId
    );

    if (!nextMatch) return tournament;

    // Déterminer si le gagnant va à team1 ou team2 du prochain match
    const isNextMatchTeam1 = Number(matchId.split("-")[2]) % 2 === 0;

    const updatedMatches = tournament.matches.map((m) => {
      if (m.id === nextMatch.id) {
        if (isNextMatchTeam1) {
          return { ...m, team1: winner };
        } else {
          return { ...m, team2: winner };
        }
      }
      return m;
    });

    return { ...tournament, matches: updatedMatches };
  };

  const exportAsPDF = async () => {
    setExportLoading(true);
    const content = document.getElementById("tournament-container");

    try {
      const canvas = await html2canvas(content, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Créer un PDF au format paysage avec une marge de 10mm
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Calculer les dimensions pour ajuster l'image au PDF
      const imgWidth = 277; // Largeur disponible sur une page A4 en paysage avec marges
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Ajouter l'image au PDF
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

      // Télécharger le PDF
      pdf.save(`tournoi-${tournament.name.replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Erreur lors de l'export en PDF:", error);
    } finally {
      setExportLoading(false);
    }
  };

  const exportAsImage = async () => {
    setExportLoading(true);
    const content = document.getElementById("tournament-container");

    try {
      const canvas = await html2canvas(content, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Créer un lien pour télécharger l'image
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `tournoi-${tournament.name.replace(/\s+/g, "-")}.png`;
      link.click();
    } catch (error) {
      console.error("Erreur lors de l'export en image:", error);
    } finally {
      setExportLoading(false);
    }
  };

  const goToResults = () => {
    navigate(`/results/${id}`);
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-6"
      >
        <div>
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">{tournament.sportIcon}</span>
            <h1 className="text-3xl font-bold">{tournament.name}</h1>
          </div>
          <p className="text-gray-600">
            {tournament.type === "groups"
              ? "Phase de groupes"
              : "Élimination directe"}{" "}
            •{tournament.teams.length} équipes
          </p>
        </div>

        <div className="flex mt-4 md:mt-0 space-x-2">
          <button
            onClick={goToResults}
            className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Résultats
          </button>
          <div className="relative inline-block">
            <button
              onClick={exportAsPDF}
              disabled={exportLoading}
              className="btn bg-gray-800 hover:bg-gray-900 text-white"
            >
              {exportLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              PDF
            </button>
          </div>
          <div className="relative inline-block">
            <button
              onClick={exportAsImage}
              disabled={exportLoading}
              className="btn btn-primary"
            >
              {exportLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              Image
            </button>
          </div>
        </div>
      </motion.div>

      <div
        id="tournament-container"
        className="bg-white rounded-xl shadow-lg p-6"
      >
        {tournament.type === "groups" ? (
          <GroupStage
            tournament={tournament}
            onScoreUpdate={handleScoreUpdate}
          />
        ) : (
          <EliminationBracket
            tournament={tournament}
            onScoreUpdate={handleScoreUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default TournamentView;
