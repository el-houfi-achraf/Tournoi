# 🏆 TournoMaster

> **Plateforme moderne de gestion de tournois sportifs et e-sport**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-tournomaster--esport.surge.sh-blue)](https://tournomaster-esport.surge.sh)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-blue)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Description

TournoMaster est une application web moderne et intuitive conçue pour la création et la gestion de tournois sportifs et e-sport. Elle permet aux organisateurs de créer facilement des compétitions avec différents formats (groupes, élimination directe) et de suivre les résultats en temps réel.

### ✨ Fonctionnalités principales

- 🎯 **Création de tournois** : Interface simple pour configurer des tournois personnalisés
- 📊 **Formats multiples** : Support des tournois en groupes et élimination directe
- 🏅 **Gestion des équipes** : Ajout et organisation des participants
- 📱 **Design responsive** : Interface optimisée pour tous les appareils
- 🎨 **UI moderne** : Design élégant avec animations fluides
- 📈 **Suivi des résultats** : Tableaux de classement et statistiques
- 🔄 **Temps réel** : Mise à jour instantanée des scores et classements
- 📄 **Export PDF** : Génération de rapports et brackets
- ♿ **Accessibilité** : Interface conforme aux standards d'accessibilité

## 🚀 Démo en ligne

**[Visitez TournoMaster](https://tournomaster.surge.sh)**

## 🛠️ Technologies utilisées

- **Frontend** : React 19.1.0 avec React Router
- **Styling** : Tailwind CSS + CSS personnalisé
- **Animations** : Framer Motion
- **Icons** : React Icons + Heroicons
- **PDF Export** : jsPDF + html2canvas
- **Optimisation** : Sharp pour les images
- **Déploiement** : Surge.sh

## 📦 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Clonez le dépôt**

   ```bash
   git clone https://github.com/el-houfi-achraf/Tournoi.git
   cd Tournoi/esport
   ```

2. **Installez les dépendances**

   ```bash
   npm install
   ```

3. **Lancez l'application en mode développement**

   ```bash
   npm start
   ```

4. **Ouvrez votre navigateur** sur [http://localhost:3000](http://localhost:3000)

## 🎮 Utilisation

### Créer un tournoi

1. **Accédez à la page d'accueil** et choisissez le type de tournoi
2. **Configurez votre tournoi** : nom, sport, nombre d'équipes
3. **Ajoutez les équipes** participantes
4. **Générez automatiquement** les matchs et brackets
5. **Suivez les résultats** en temps réel

### Types de tournois supportés

- **🏆 Tournoi en Groupes** : Format championnat avec matchs aller-retour
- **⚡ Élimination Directe** : Format knockout avec brackets à élimination

## 🏗️ Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── TournamentForm.jsx
│   ├── EliminationBracket.jsx
│   ├── GroupStage.jsx
│   └── ...
├── pages/              # Pages principales
│   ├── Home.jsx
│   ├── CreateTournament.jsx
│   ├── TournamentView.jsx
│   └── ResultsView.jsx
├── contexts/           # Contextes React
│   ├── TournamentContext.jsx
│   └── AccessibilityContext.jsx
├── utils/              # Utilitaires
│   ├── exportUtils.js
│   └── imageUtils.js
├── styles/             # Styles personnalisés
└── assets/             # Images et ressources
```

## 🚀 Déploiement

### Déploiement avec Surge.sh

1. **Construisez l'application**

   ```bash
   npm run build
   ```

2. **Installez Surge CLI**

   ```bash
   npm install -g surge
   ```

3. **Déployez sur Surge**
   ```bash
   cd build
   surge
   ```

### Autres options de déploiement

- **Vercel** : `npm install -g vercel && vercel`
- **Netlify** : Glissez-déposez le dossier `build`
- **GitHub Pages** : Utilisez `gh-pages` branch

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests avec couverture
npm test -- --coverage

# Tests en mode watch
npm test -- --watch
```

## 🔧 Scripts disponibles

- `npm start` - Lance l'application en développement
- `npm run build` - Construit l'application pour la production
- `npm test` - Lance les tests
- `npm run eject` - Éjecte la configuration CRA

## 🎨 Personnalisation

### Thèmes et couleurs

Les couleurs principales sont définies dans `tailwind.config.js` :

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        // ...
      },
    },
  },
};
```

### Ajout de nouveaux sports

Modifiez le fichier `src/components/TournamentForm.jsx` pour ajouter des sports :

```javascript
const sports = [
  { name: "Football", icon: "⚽" },
  { name: "Basketball", icon: "🏀" },
  // Ajoutez vos sports ici
];
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. **Créez** une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commitez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

## 👨‍💻 Auteur

**ACHRAF EL HOUFI**

- GitHub: [@el-houfi-achraf](https://github.com/el-houfi-achraf)

## 🙏 Remerciements

- [React](https://reactjs.org/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Framer Motion](https://www.framer.com/motion/) pour les animations
- [Surge.sh](https://surge.sh/) pour l'hébergement gratuit

---

⭐ **N'hésitez pas à donner une étoile si ce projet vous a été utile !**
