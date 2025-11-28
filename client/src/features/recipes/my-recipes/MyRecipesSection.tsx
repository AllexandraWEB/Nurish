import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/ui/button";
import RecipeCard from "@/features/recipes/shared/RecipeCard";
import { apiFetch } from "@/lib/api";
import RecipeDetailsModal from "../shared/RecipeDetailsModal";
import RecipeForm from "../shared/RecipeForm";

type Recipe = {
  _id?: string;
  title: string;
  subtitle?: string;
  author: string;
  authorId?: string;
  minutes: number | string;
  image?: string;
  imageDetails: string;
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  video?: string;
  recipeDetails?: string[];
  ingredients?: string[];
  instructions?: { number: number; text: string }[];
};

const MyRecipesSection = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      setIsLoading(true);
      const data = await apiFetch("/api/recipes/my-recipes");
      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
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
          isPublic: false, // Private recipes for personal use
        }),
      });
      setIsFormOpen(false);
      fetchMyRecipes();
    } catch (error) {
      console.error("Failed to create recipe:", error);
      alert("Failed to create recipe");
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
      fetchMyRecipes();
    } catch (error) {
      console.error("Failed to update recipe:", error);
      alert("Failed to update recipe");
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await apiFetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });
      setIsDetailsModalOpen(false);
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
    setSelectedRecipe(recipe);
    setIsDetailsModalOpen(true);
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

  return (
    <div className="mt-20 p-4 md:p-0 container max-w-[1288px] mx-auto">
      <div className="pt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="recipes-headline">My Recipes</h1>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="rounded-full"
            size="lg"
          >
            <Plus size={20} />
            Add Recipe
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-400 mb-4">
              You haven't created any recipes yet
            </p>
            <Button onClick={() => setIsFormOpen(true)} className="rounded-full">
              <Plus className="mr-2" size={20} />
              Create Your First Recipe
            </Button>
          </div>
        ) : (
          <div className="grid-4-cols">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                title={recipe.title}
                author={recipe.author}
                minutes={recipe.minutes}
                image={recipe.image || "/images/default-recipe.jpg"}
                imageDetails={recipe.imageDetails || recipe.image || "/images/default-recipe.jpg"}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        )}
      </div>

      <RecipeForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingRecipe ? handleUpdateRecipe : handleCreateRecipe}
        recipe={editingRecipe}
      />

      <RecipeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        recipe={selectedRecipe}
        onEdit={handleEditFromModal}
        onDelete={handleDeleteFromModal}
      />
    </div>
  );
};

export default MyRecipesSection;