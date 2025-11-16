import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import HeroSection from "./components/HeroSection";
import RecipesPage from "./pages/RecipesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { FavoritesProvider } from "./context/FavoritesContext";

function AppContent() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-dark-900 text-white">
        {!isAuthPage && <Navigation />}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </FavoritesProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
