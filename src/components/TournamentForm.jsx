import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sportOptions = [
  { id: "football", name: "Football", icon: "⚽" },
  { id: "basketball", name: "Basketball", icon: "🏀" },
  { id: "tennis", name: "Tennis", icon: "🎾" },
  { id: "volleyball", name: "Volleyball", icon: "🏐" },
  { id: "fifa", name: "FIFA", icon: "🎮" },
  { id: "lol", name: "League of Legends", icon: "🎯" },
  { id: "csgo", name: "CS:GO", icon: "🔫" },
  { id: "fortnite", name: "Fortnite", icon: "🛠️" },
  { id: "custom", name: "Custom", icon: "✨" },
];

const TournamentForm = ({
  step,
  formData,
  handleChange,
  handleTeamsChange,
  nextStep,
  prevStep,
  handleSubmit,
}) => {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");

  const addTeam = () => {
    if (!teamName.trim()) {
      setError("Le nom de l'équipe ne peut pas être vide");
      return;
    }

    // Vérifier si l'équipe existe déjà
    if (
      formData.teams.some(
        (team) => team.name.toLowerCase() === teamName.toLowerCase()
      )
    ) {
      setError("Cette équipe existe déjà");
      return;
    }

    const newTeam = {
      id: Date.now().toString(),
      name: teamName.trim(),
      avatar: generateRandomAvatar(),
    };

    handleTeamsChange([...formData.teams, newTeam]);
    setTeamName("");
    setError("");
  };

  const removeTeam = (id) => {
    handleTeamsChange(formData.teams.filter((team) => team.id !== id));
  };

  const generateRandomAvatar = () => {
    // Génère une couleur de fond aléatoire pour l'avatar
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError("Le nom du tournoi est requis");
      return false;
    }
    if (!formData.sport) {
      setError("Veuillez sélectionner un sport");
      return false;
    }
    setError("");
    return true;
  };

  const validateStep2 = () => {
    if (formData.teams.length < 2) {
      setError("Vous devez ajouter au moins 2 équipes");
      return false;
    }

    // Pour l'élimination directe, il est préférable d'avoir un nombre d'équipes puissance de 2
    if (formData.type === "elimination") {
      const nextPowerOfTwo = Math.pow(
        2,
        Math.ceil(Math.log2(formData.teams.length))
      );
      if (formData.teams.length !== nextPowerOfTwo) {
        setError(
          `Pour un bracket optimal, ajoutez ${
            nextPowerOfTwo - formData.teams.length
          } équipe(s) supplémentaire(s) pour atteindre ${nextPowerOfTwo} équipes`
        );
        // On continue quand même, ce n'est qu'un avertissement
      }
    }

    setError("");
    return true;
  };

  const handleNext = () => {
    let isValid = false;

    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    }

    if (isValid) {
      nextStep();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTeam();
    }
  };

  // Animation variants
  const formVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nom du tournoi
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Exemple: Championnat d'été 2023"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Type de tournoi
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={`
                  relative border-2 rounded-lg p-4 cursor-pointer transition-all
                  ${
                    formData.type === "groups"
                      ? "border-primary bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
                >
                  <input
                    type="radio"
                    name="type"
                    value="groups"
                    checked={formData.type === "groups"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🏆</div>
                    <div>
                      <div className="font-bold">Phase de groupes</div>
                      <div className="text-sm text-gray-500">
                        Tous les participants s'affrontent avec classement
                      </div>
                    </div>
                  </div>
                  {formData.type === "groups" && (
                    <div className="absolute top-2 right-2 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </label>

                <label
                  className={`
                  relative border-2 rounded-lg p-4 cursor-pointer transition-all
                  ${
                    formData.type === "elimination"
                      ? "border-primary bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
                >
                  <input
                    type="radio"
                    name="type"
                    value="elimination"
                    checked={formData.type === "elimination"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🏅</div>
                    <div>
                      <div className="font-bold">Élimination directe</div>
                      <div className="text-sm text-gray-500">
                        Bracket à élimination directe
                      </div>
                    </div>
                  </div>
                  {formData.type === "elimination" && (
                    <div className="absolute top-2 right-2 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Sport / Jeu
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {sportOptions.map((sport) => (
                  <label
                    key={sport.id}
                    className={`
                      flex items-center justify-center flex-col p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${
                        formData.sport === sport.id
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="sport"
                      value={sport.id}
                      checked={formData.sport === sport.id}
                      onChange={(e) => {
                        handleChange(e);
                        // Mettre à jour l'icône du sport en utilisant handleChange
                        handleChange({
                          target: { name: "sportIcon", value: sport.icon },
                        });
                      }}
                      className="sr-only"
                    />
                    <span className="text-2xl mb-2">{sport.icon}</span>
                    <span className="text-sm text-center">{sport.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
              >
                Suivant
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ajouter des équipes / joueurs
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nom de l'équipe ou du joueur"
                />
                <button
                  type="button"
                  onClick={addTeam}
                  className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
                >
                  Ajouter
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">
                  Équipes / Joueurs ({formData.teams.length})
                </h3>

                {formData.teams.length === 0 ? (
                  <div className="text-center p-6 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">Aucune équipe ajoutée</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {formData.teams.map((team) => (
                      <motion.li
                        key={team.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${team.avatar}`}
                          >
                            {team.name[0].toUpperCase()}
                          </div>
                          <span>{team.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTeam(team.id)}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {formData.type === "elimination" && formData.teams.length > 0 && (
                <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm text-blue-800">
                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 text-blue-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div>
                      <p>
                        <strong>Note:</strong> Pour un bracket d'élimination
                        directe, un nombre d'équipes en puissance de 2 (2, 4, 8,
                        16, 32) est optimal.
                      </p>
                      {formData.teams.length > 0 && (
                        <p className="mt-1">
                          Prochaine puissance de 2:{" "}
                          {Math.pow(
                            2,
                            Math.ceil(Math.log2(formData.teams.length))
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Retour
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
              >
                Suivant
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Récapitulatif du tournoi</h3>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Nom du tournoi</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm">Sport / Jeu</p>
                    <p className="font-medium">
                      <span className="mr-2">{formData.sportIcon}</span>
                      {sportOptions.find((s) => s.id === formData.sport)?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm">Type de tournoi</p>
                    <p className="font-medium">
                      {formData.type === "groups"
                        ? "Phase de groupes"
                        : "Élimination directe"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm">Nombre d'équipes</p>
                    <p className="font-medium">{formData.teams.length}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Équipes participantes</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {formData.teams.map((team) => (
                    <div
                      key={team.id}
                      className="bg-white p-3 rounded-lg border border-gray-200 flex items-center"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-2 ${team.avatar}`}
                      >
                        {team.name[0].toUpperCase()}
                      </div>
                      <span className="truncate">{team.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex">
                  <svg
                    className="h-5 w-5 text-blue-400 mr-2 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p>Une fois le tournoi créé, vous pourrez:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>Saisir les scores des matches</li>
                      <li>
                        Consulter le classement ou le bracket en temps réel
                      </li>
                      <li>Exporter les résultats</li>
                      <li>Modifier certains paramètres du tournoi</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Retour
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn bg-green-500 hover:bg-green-600 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Créer le tournoi
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TournamentForm;
