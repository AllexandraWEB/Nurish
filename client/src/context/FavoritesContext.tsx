import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

type Recipe = {
  _id?: string;
  title: string;
  subtitle?: string;
  author: string;
  minutes: number | string;
  image?: string;
  imageDetails: string;
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  video?: string;
  ingredients?: string[];
  instructions?: { number: number; text: string }[];
  recipeDetails?: string[];
};

type FavoritesContextType = {
  favorites: Recipe[];
  addToFavorites: (recipe: Recipe) => Promise<void>;
  removeFromFavorites: (title: string) => Promise<void>;
  isFavorite: (title: string) => boolean;
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
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setFavorites([]);
        return;
      }

      const data = await apiFetch("/api/favorites");
      console.log("Fetched favorites:", data);
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (recipe: Recipe) => {
    try {
      console.log("Adding to favorites:", recipe);
      const response = await apiFetch("/api/favorites/add", {
        method: "POST",
        body: JSON.stringify({ recipe }),
      });
      console.log("Add to favorites response:", response);
      await fetchFavorites(); // Refresh the list
    } catch (error) {
      console.error("Error adding to favorites:", error);
      throw error;
    }
  };

  const removeFromFavorites = async (title: string) => {
    try {
      console.log("Removing from favorites:", title);
      await apiFetch("/api/favorites/remove", {
        method: "POST",
        body: JSON.stringify({ title }),
      });
      await fetchFavorites(); // Refresh the list
    } catch (error) {
      console.error("Error removing from favorites:", error);
      throw error;
    }
  };

  const isFavorite = (title: string) => {
    return favorites.some((fav) => fav.title === title);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, loading }}
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