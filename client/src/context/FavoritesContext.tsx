import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

type Recipe = {
  title: string;
  subtitle?: string;
  author: string;
  minutes: number | string;
  image: string;
  imageDetails?: string;
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  video?: string;
  recipeDetails?: string[];
  ingredients?: string[];
  instructions?: { number: number; text: string }[];
};

type FavoritesContextType = {
  favorites: Recipe[];
  addToFavorites: (recipe: Recipe) => Promise<void>;
  removeFromFavorites: (recipeTitle: string) => Promise<void>;
  isFavorite: (recipeTitle: string) => boolean;
  loading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    try {
      if (!user) {
        setLoading(false);
        return;
      }

      const data = await apiFetch("/api/favorites");
      setFavorites(data.favorites || []);
      console.log("Loaded favorites from API:", data.favorites);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      // Fallback to localStorage if API fails
      const savedFavorites = localStorage.getItem(
        `favorites_${user.id || user.email}`
      );
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (recipe: Recipe) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) {
        throw new Error("User not logged in");
      }

      // Ensure imageDetails is set (use image if imageDetails doesn't exist)
      const recipeToSave = {
        ...recipe,
        imageDetails: recipe.imageDetails || recipe.image,
      };

      const data = await apiFetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe: recipeToSave }),
      });

      setFavorites(data.favorites || [...favorites, recipeToSave]);
      console.log("Recipe added to favorites:", recipe.title);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      throw error;
    }
  };

  const removeFromFavorites = async (recipeTitle: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) {
        throw new Error("User not logged in");
      }

      const data = await apiFetch(
        `/api/favorites/${encodeURIComponent(recipeTitle)}`,
        {
          method: "DELETE",
        }
      );

      setFavorites(data.favorites || favorites.filter((r) => r.title !== recipeTitle));
      console.log("Recipe removed from favorites:", recipeTitle);
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
      throw error;
    }
  };

  const isFavorite = (recipeTitle: string) => {
    return favorites.some((recipe) => recipe.title === recipeTitle);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};