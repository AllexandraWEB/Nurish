import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navigation from "@/layouts/Navigation";
import HeroSection from "@/features/home/HeroSection";
import RecipesPage from "@/pages/RecipesPage";
import PopularRecipesPage from "@/pages/PopularRecipesPage";
import MyRecipesPage from "@/pages/MyRecipesPage";
import FavoritesPage from "@/pages/FavoritesPage";
import CategoriesPage from "@/pages/CategoriesPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import { FavoritesProvider } from "@/context/FavoritesContext";

function AppContent() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-dark-900 text-white">
        {!isAuthPage && <Navigation />}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipesPage />} />
          <Route path="/popular-recipes" element={<PopularRecipesPage />} />
          <Route path="/popular-recipes/:id" element={<PopularRecipesPage />} />
          <Route path="/categories/:category" element={<CategoriesPage />} />
          <Route
            path="/categories/:category/:id"
            element={<CategoriesPage />}
          />

          <Route
            path="/my-recipes"
            element={
              <ProtectedRoute>
                <MyRecipesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-recipes/:id"
            element={
              <ProtectedRoute>
                <MyRecipesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites/:id"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
