import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import AccessibilityPanel from "./components/AccessibilityPanel";

// Contexts
import { AccessibilityProvider } from "./contexts/AccessibilityContext";

// Lazy loading des pages pour optimiser les performances
const Home = lazy(() => import("./pages/Home"));
const CreateTournament = lazy(() => import("./pages/CreateTournament"));
const TournamentView = lazy(() => import("./pages/TournamentView"));
const ResultsView = lazy(() => import("./pages/ResultsView"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[50vh]">
                  <LoadingSpinner size="lg" text="Chargement de la page..." />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateTournament />} />
                <Route path="/tournament/:id" element={<TournamentView />} />
                <Route path="/results/:id" element={<ResultsView />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <AccessibilityPanel />
          <Footer />
        </div>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
