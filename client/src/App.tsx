import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import HeroSection from "./components/HeroSection";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { FavoritesProvider } from "./context/FavoritesContext";
import PopularRecipesPage from "./pages/PopularRecipesPage";
import RecipesPage from "./pages/recipesPage";

function AppContent() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-dark-900 text-white">
        {!isAuthPage && <Navigation />}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/popular-recipes" element={<PopularRecipesPage />} />
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
          <Route
            path="/my-recipes"
            element={
              <ProtectedRoute>
                <MyRecipesPage />
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
