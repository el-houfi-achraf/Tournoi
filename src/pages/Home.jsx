import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Home.css";

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]); // Images réelles pour les types de tournois (optimisées localement)
  const tournamentTypes = [
    {
      id: "groups",
      name: "Tournoi en Groupes",
      description:
        "Format de compétition en championnat où les équipes sont réparties en groupes. Idéal pour maximiser le nombre de matchs.",
      image: "/images/real/group-tournament.jpg",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      ),
    },
    {
      id: "elimination",
      name: "Élimination Directe",
      description:
        "Format à élimination directe de type bracket. Parfait pour des tournois rapides et décisifs.",
      image: "/images/real/bracket-tournament.jpg",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      ),
    },
  ];
  // Témoignages avec des photos réelles (optimisées localement)
  const testimonials = [
    {
      id: 1,
      name: "Sophie Martin",
      role: "Organisatrice d'événements e-sport",
      image: "/images/real/profile-default-1.jpg",
      quote:
        "Cette plateforme a révolutionné notre façon d'organiser des tournois. Tout est si simple et intuitif !",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      role: "Coach équipe amateur",
      image: "/images/real/profile-default-2.jpg",
      quote:
        "Nous utilisons cet outil pour tous nos tournois internes. L'interface est magnifique et très pratique.",
    },
    {
      id: 3,
      name: "Julie Leroy",
      role: "Directrice de club sportif",
      image: "/images/real/profile-default-3.jpg",
      quote:
        "L'export des résultats en PDF nous fait gagner un temps précieux pour communiquer avec nos membres.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section avec background dynamique */}
      <div className="relative">
        {/* Background image avec effet parallax */}{" "}
        <div
          className="absolute inset-0 w-full h-full z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/images/real/hero-background.jpg')",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-dark/70"></div>
        </div>
        <motion.section
          className="relative z-10 text-center py-16 sm:py-20 md:py-32 lg:py-40 px-4"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 sm:mb-8 text-white drop-shadow-lg leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white to-blue-200 text-transparent bg-clip-text">
              Tournois Simplified
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Créez et gérez facilement des tournois sportifs ou e-sport avec
            notre plateforme intuitive et personnalisable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/create"
              className="w-full sm:w-auto inline-block bg-white hover:bg-blue-50 text-primary font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 text-center"
            >
              Créer un tournoi
            </Link>
          </motion.div>
        </motion.section>
      </div>

      {/* Tournament Types - Avec images réelles */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 px-4"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Choisissez votre format
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {tournamentTypes.map((type) => (
              <motion.div
                key={type.id}
                className="relative group"
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(type.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link to={`/create?type=${type.id}`} className="block">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-2xl">
                    {/* Image d'arrière-plan */}
                    <div
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${type.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-primary/20"></div>
                    </div>

                    {/* Contenu */}
                    <div className="relative z-10 p-10 md:p-12 h-96 flex flex-col justify-end text-white">
                      <div
                        className={`rounded-full p-4 mb-6 inline-block w-max transition-all duration-300 ${
                          hoveredCard === type.id
                            ? "bg-white text-primary"
                            : "bg-white/20"
                        }`}
                      >
                        {type.icon}
                      </div>
                      <h3 className="text-3xl font-bold mb-4">{type.name}</h3>
                      <p className="text-white/80 mb-6 max-w-md">
                        {type.description}
                      </p>
                      <motion.div
                        className="mt-auto flex items-center font-medium text-white"
                        animate={{ x: hoveredCard === type.id ? 5 : 0 }}
                      >
                        <span>Commencer</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features - Design modernisé */}
      <motion.section
        className="py-20 md:py-28"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                Fonctionnalités premium
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Notre plateforme offre tout ce dont vous avez besoin pour gérer
              vos tournois de A à Z.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Création intuitive</h3>
              <p className="text-gray-600">
                Créez des tournois personnalisés en quelques clics avec une
                interface intuitive et visuelle.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Classements automatiques
              </h3>
              <p className="text-gray-600">
                Les scores et les classements sont calculés automatiquement et
                mis à jour en temps réel après chaque match.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Export professionnel</h3>
              <p className="text-gray-600">
                Exportez les brackets et les tableaux de classement en format
                PDF ou image pour un partage facile.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Design adaptatif</h3>
              <p className="text-gray-600">
                Interface optimisée pour tous les appareils, du mobile au
                desktop, pour gérer vos tournois où que vous soyez.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Formats personnalisables
              </h3>
              <p className="text-gray-600">
                Adaptez votre tournoi avec des formats en poules ou en bracket
                selon vos besoins spécifiques.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Sauvegarde sécurisée</h3>
              <p className="text-gray-600">
                Vos tournois sont sauvegardés localement, avec possibilité
                d'export pour plus de sécurité.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Témoignages - Nouvelle section avec images réelles */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
              Ce qu'ils en disent
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Découvrez pourquoi nos utilisateurs adorent notre plateforme de
              gestion de tournois.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                variants={itemVariants}
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistiques - Nouvelle section */}
      <motion.section
        className="py-20 md:py-28 bg-primary text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <motion.div
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-5xl font-extrabold mb-2">250+</div>
              <div className="text-blue-200 font-medium">Tournois créés</div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-5xl font-extrabold mb-2">1.5K+</div>
              <div className="text-blue-200 font-medium">Matchs joués</div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-5xl font-extrabold mb-2">15+</div>
              <div className="text-blue-200 font-medium">
                Sports disponibles
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-5xl font-extrabold mb-2">98%</div>
              <div className="text-blue-200 font-medium">Satisfaction</div>
            </motion.div>
          </div>
        </div>{" "}
      </motion.section>

      {/* Section accessibilité */}
      <motion.section
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-5"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Une plateforme accessible pour tous
            </motion.h2>
            <motion.p
              className="text-gray-600 text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Nous croyons que la gestion de tournois devrait être accessible à
              tous. Découvrez nos fonctionnalités d'accessibilité intégrées.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-primary text-xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Contraste élevé</h3>
              <p className="text-gray-600">
                Mode de contraste élevé pour améliorer la lisibilité pour tous
                les utilisateurs, y compris ceux ayant une déficience visuelle.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-primary text-xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">
                Taille de texte personnalisable
              </h3>
              <p className="text-gray-600">
                Options de taille de texte pour faciliter la lecture et
                l'interaction avec l'interface utilisateur.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-primary text-xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">
                Réduction des animations
              </h3>
              <p className="text-gray-600">
                Contrôle des animations pour aider les utilisateurs sensibles
                aux mouvements ou souffrant de vertiges.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-primary text-xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Mode Focus</h3>
              <p className="text-gray-600">
                Un mode qui réduit les distractions visuelles pour aider à la
                concentration, particulièrement utile pour les personnes
                neurodivergentes.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to action - Modernisé */}
      <motion.section
        className="py-24 md:py-32 text-center bg-gradient-to-r from-primary/5 to-secondary/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Prêt à révolutionner vos tournois ?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Rejoignez des centaines d'organisateurs qui ont déjà simplifié la
            gestion de leurs compétitions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/create"
              className="inline-block bg-primary hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            >
              Créer mon tournoi maintenant →
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
