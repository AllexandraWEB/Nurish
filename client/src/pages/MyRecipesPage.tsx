import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecipeForm from "@/components/RecipeForm";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetailsModal from "@/components/RecipeDetailsModal";
import { apiFetch } from "@/lib/api";

type Recipe = {
  _id?: string;
  title: string;
  subtitle?: string;
  author?: string;
  authorName?: string;
  minutes: string;
  image?: string;
  imageDetails?: string;
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  video?: string;
  recipeDetails?: string[];
  ingredients?: string[];
  instructions?: { number: number; text: string }[];
};

const MyRecipesPage = () => {
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
        body: JSON.stringify(recipe),
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
          <p className="text-center text-neutral-400">Loading recipes...</p>
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
              <div key={recipe._id}>
                <RecipeCard
                  title={recipe.title}
                  author={recipe.authorName || "You"}
                  minutes={recipe.minutes}
                  image={recipe.image || "/images/default-recipe.jpg"}
                  imageDetails={recipe.imageDetails || recipe.image || "/images/default-recipe.jpg"}
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <RecipeForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingRecipe ? handleUpdateRecipe : handleCreateRecipe}
        recipe={editingRecipe as any}
      />

      <RecipeDetailsModal {...({
        isOpen: isDetailsModalOpen,
        onClose: () => setIsDetailsModalOpen(false),
        recipe: selectedRecipe as any,
        onEdit: handleEditFromModal,
        onDelete: handleDeleteFromModal,
      } as any)} />
    </div>
  );
};

export default MyRecipesPage;