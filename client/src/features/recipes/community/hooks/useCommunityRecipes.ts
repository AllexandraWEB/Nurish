import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Recipe } from "@/types/recipe";

export const useCommunityRecipes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    if (id && allRecipes.length > 0) {
      const recipe = allRecipes.find((r) => r._id === id);
      if (recipe) {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
      }
    }
  }, [id, allRecipes]);

  const fetchAllRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const recipes = await apiFetch("/api/recipes");
      setAllRecipes(recipes);
    } catch (error: any) {
      console.error("Failed to fetch recipes:", error);
      setError(error?.message || "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipes/${recipe._id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/recipes");
  };

  const handleAddPublicRecipe = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      alert("Please log in to add a recipe");
      navigate("/login");
      return;
    }
    setIsFormOpen(true);
  };

  const handleSubmitRecipe = async (recipeData: Recipe) => {
    try {
      await apiFetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify({
          ...recipeData,
          isPublic: true, // Public recipes for community
        }),
      });
      setIsFormOpen(false);
      fetchAllRecipes();
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create recipe");
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return {
    // State
    isModalOpen,
    selectedRecipe,
    isFormOpen,
    allRecipes,
    loading,
    error,

    // Handlers
    handleRecipeClick,
    handleCloseModal,
    handleAddPublicRecipe,
    handleSubmitRecipe,
    handleCloseForm,
    fetchAllRecipes,
  };
};