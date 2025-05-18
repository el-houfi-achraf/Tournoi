import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import TournamentForm from "../components/TournamentForm";

const CreateTournament = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const preselectedType = queryParams.get("type") || "";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: Date.now().toString(),
    name: "",
    type: preselectedType || "groups", // 'groups' ou 'elimination'
    sport: "",
    sportIcon: "",
    teams: [],
    matches: [],
    currentRound: 1,
    createdAt: new Date().toISOString(),
  });

  // Effet pour définir le type de tournoi depuis l'URL
  useEffect(() => {
    if (
      preselectedType &&
      (preselectedType === "groups" || preselectedType === "elimination")
    ) {
      setFormData((prev) => ({ ...prev, type: preselectedType }));
    }
  }, [preselectedType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamsChange = (teams) => {
    setFormData((prev) => ({ ...prev, teams }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    // Générer les matchs initiaux en fonction du type de tournoi
    let matches = [];

    if (formData.type === "groups") {
      // Algorithme pour générer les matchs de la phase de groupe
      const teams = [...formData.teams];
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          matches.push({
            id: `match-${i}-${j}`,
            team1: teams[i],
            team2: teams[j],
            score1: null,
            score2: null,
            round: 1,
            completed: false,
          });
        }
      }
    } else {
      // Algorithme pour générer les matchs d'élimination directe
      const teams = [...formData.teams];
      const matchCount = Math.floor(teams.length / 2);

      for (let i = 0; i < matchCount; i++) {
        matches.push({
          id: `match-r1-${i}`,
          team1: teams[i * 2],
          team2: teams[i * 2 + 1] || { name: "Bye", avatar: null },
          score1: null,
          score2: null,
          round: 1,
          completed: false,
          nextMatchId:
            i % 2 === 0
              ? `match-r2-${Math.floor(i / 2)}`
              : `match-r2-${Math.floor(i / 2)}`,
        });
      }

      // Créer les matchs pour les tours suivants
      let roundsNeeded = Math.ceil(Math.log2(teams.length));
      let matchesInRound = matchCount / 2;

      for (let round = 2; round <= roundsNeeded; round++) {
        for (let i = 0; i < matchesInRound; i++) {
          matches.push({
            id: `match-r${round}-${i}`,
            team1: { name: "À déterminer", avatar: null },
            team2: { name: "À déterminer", avatar: null },
            score1: null,
            score2: null,
            round: round,
            completed: false,
            nextMatchId:
              round < roundsNeeded
                ? `match-r${round + 1}-${Math.floor(i / 2)}`
                : null,
          });
        }
        matchesInRound /= 2;
      }
    }

    // Mettre à jour le formData avec les matchs générés
    const finalTournament = {
      ...formData,
      matches: matches,
    };

    // Sauvegarder dans localStorage
    const tournaments = JSON.parse(localStorage.getItem("tournaments") || "[]");
    localStorage.setItem(
      "tournaments",
      JSON.stringify([...tournaments, finalTournament])
    );

    // Rediriger vers la page du tournoi
    navigate(`/tournament/${finalTournament.id}`);
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Créer un nouveau tournoi
        </h1>
        <div className="flex justify-center">
          <ol className="flex items-center w-full max-w-3xl">
            <li
              className={`flex items-center ${
                step >= 1 ? "text-primary" : "text-gray-400"
              }`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step >= 1 ? "border-primary bg-primary/10" : "border-gray-300"
                }`}
              >
                1
              </span>
              <span className="ml-2 text-sm sm:text-base">Informations</span>
              <div
                className={`flex-1 h-px mx-3 ${
                  step > 1 ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            </li>
            <li
              className={`flex items-center ${
                step >= 2 ? "text-primary" : "text-gray-400"
              }`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step >= 2 ? "border-primary bg-primary/10" : "border-gray-300"
                }`}
              >
                2
              </span>
              <span className="ml-2 text-sm sm:text-base">Équipes</span>
              <div
                className={`flex-1 h-px mx-3 ${
                  step > 2 ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            </li>
            <li
              className={`flex items-center ${
                step >= 3 ? "text-primary" : "text-gray-400"
              }`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step >= 3 ? "border-primary bg-primary/10" : "border-gray-300"
                }`}
              >
                3
              </span>
              <span className="ml-2 text-sm sm:text-base">Validation</span>
            </li>
          </ol>
        </div>
      </motion.div>

      <div className="card">
        <TournamentForm
          step={step}
          formData={formData}
          handleChange={handleChange}
          handleTeamsChange={handleTeamsChange}
          nextStep={nextStep}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateTournament;
