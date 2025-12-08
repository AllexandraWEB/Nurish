import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Recipe } from "@/types/recipe";

export const useMyRecipes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate("/login");
      return;
    }
    fetchMyRecipes();
  }, [navigate]);

  // Open modal when ID is in URL
  useEffect(() => {
    if (id && recipes.length > 0) {
      const recipe = recipes.find((r) => r._id === id);
      if (recipe) {
        setSelectedRecipe(recipe);
        setIsDetailsModalOpen(true);
      }
    }
  }, [id, recipes]);

  const fetchMyRecipes = async () => {
    try {
      setIsLoading(true);
      const data = await apiFetch("/api/recipes/my-recipes");
      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      if ((error as any)?.message?.includes('401')) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRecipe = async (recipe: Recipe) => {
    try {
      await apiFetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify({
          ...recipe,
          isPublic: false, // Private recipes
        }),
      });
      setIsFormOpen(false);
      fetchMyRecipes();
    } catch (error: any) {
      console.error("Failed to create recipe:", error);
      alert("Please enter all the required fields");
    }
  };

  const handleUpdateRecipe = async (recipe: Recipe) => {
    try {
      await apiFetch(`/api/recipes/${recipe._id}`, {
        method: "PUT",
        body: JSON.stringify(recipe),
      });
      setIsFormOpen(false);
      setEditingRecipe(null);
      setIsDetailsModalOpen(false);
      navigate("/my-recipes");
      fetchMyRecipes();
    } catch (error: any) {
      console.error("Failed to update recipe:", error);
      alert("Please enter all the required fields");
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await apiFetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });
      setIsDetailsModalOpen(false);
      navigate("/my-recipes"); // Remove ID from URL
      fetchMyRecipes();
    } catch (error) {
      console.error("Failed to delete recipe:", error);
      alert("Failed to delete recipe");
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingRecipe(null);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/my-recipes/${recipe._id}`); // Add ID to URL
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    navigate("/my-recipes"); // Remove ID from URL
  };

  const handleEditFromModal = () => {
    if (selectedRecipe) {
      setEditingRecipe(selectedRecipe);
      setIsDetailsModalOpen(false);
      setIsFormOpen(true);
    }
  };

  const handleDeleteFromModal = () => {
    if (selectedRecipe?._id) {
      handleDeleteRecipe(selectedRecipe._id);
    }
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  return {
    // State
    recipes,
    isFormOpen,
    editingRecipe,
    isLoading,
    selectedRecipe,
    isDetailsModalOpen,
    
    // Handlers
    handleCreateRecipe,
    handleUpdateRecipe,
    handleDeleteRecipe,
    handleCloseForm,
    handleRecipeClick,
    handleCloseModal,
    handleEditFromModal,
    handleDeleteFromModal,
    openForm,
  };
};