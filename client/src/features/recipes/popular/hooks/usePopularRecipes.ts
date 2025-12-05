import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Recipe } from "@/types/recipe";

export const usePopularRecipes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [fastRecipes, setFastRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPopularRecipes();
  }, []);

  useEffect(() => {
    if (id) {
      const allRecipes = [...popularRecipes, ...fastRecipes];
      const recipe = allRecipes.find((r) => r._id === id);
      if (recipe) {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
      }
    }
  }, [id, popularRecipes, fastRecipes]);

  const fetchPopularRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all public recipes
      const allRecipes = await apiFetch("/api/recipes");
      
      if (!allRecipes || !Array.isArray(allRecipes)) {
        throw new Error('Invalid response from server');
      }
      
      // Filter recipes by featured tag
      const popular = allRecipes
        .filter((recipe: Recipe & { featured?: string }) => recipe.featured === 'popular')
        .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      const fast = allRecipes
        .filter((recipe: Recipe & { featured?: string }) => recipe.featured === 'fast')
        .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      setPopularRecipes(popular);
      setFastRecipes(fast);
    } catch (error: any) {
      console.error("Failed to fetch popular recipes:", error);
      setError(error?.message || "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/popular-recipes/${recipe._id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/popular-recipes");
  };

  return {
    // State
    isModalOpen,
    selectedRecipe,
    popularRecipes,
    fastRecipes,
    loading,
    error,

    // Handlers
    handleRecipeClick,
    handleCloseModal,
    fetchPopularRecipes,
  };
};