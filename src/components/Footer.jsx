const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">TournoMaster</h3>
            <p className="text-sm">
              La plateforme ultime pour organiser et suivre vos tournois
              sportifs et e-sports en toute simplicité.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="/create"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Créer un tournoi
                </a>
              </li>
            </ul>
          </div>
        </div>{" "}
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} TournoMaster. Tous droits
            réservés.
          </p>
          <p className="flex items-center justify-center text-gray-400">
            <span>Développé avec passion par </span>
            <a
              href="https://github.com/el-houfi-achraf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center ml-1 text-primary hover:text-blue-400 transition-colors"
            >
              ACHRAF EL HOUFI
              <svg
                className="w-5 h-5 ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
