import RecipeCard from "@/components/RecipeCard";
import RecipeDetailsModal from "@/components/RecipeDetailsModal";
import RecipeForm from "@/components/RecipeForm";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

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
  ingredients?: string[];
  instructions?: { number: number; text: string }[];
  recipeDetails?: string[];
};

const RecipesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const fetchAllRecipes = async () => {
    try {
      setLoading(true);
      const recipes = await apiFetch('/api/recipes');
      setAllRecipes(recipes);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleAddPublicRecipe = () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      alert("Please log in to add a recipe");
      window.location.href = "/login";
      return;
    }
    setIsFormOpen(true);
  };

  const handleSubmitRecipe = async (recipeData: Recipe) => {
    try {
      await apiFetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify(recipeData),
      });
      setIsFormOpen(false);
      fetchAllRecipes(); // Refresh the recipes list
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create recipe");
    }
  };

  if (loading) {
    return (
      <div className="mt-20 p-4 md:p-0 container max-w-[1288px] mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 p-4 md:p-0 container max-w-[1288px] mx-auto">
      <div className="pt-10 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="recipes-headline">Community Recipes</h1>
          <button
            onClick={handleAddPublicRecipe}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition"
          >
            + Add Recipe
          </button>
        </div>
        
        {allRecipes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-4">
              No community recipes yet.
            </p>
            <p className="text-gray-500 mb-6">
              Be the first to share a recipe with the community!
            </p>
            <button
              onClick={handleAddPublicRecipe}
              className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
            >
              Add First Recipe
            </button>
          </div>
        ) : (
          <div className="grid-4-cols">
            {allRecipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                title={recipe.title}
                author={recipe.author}
                minutes={recipe.minutes}
                image={recipe.image || '/images/default-recipe.jpg'}
                imageDetails={recipe.imageDetails || '/images/default-recipe.jpg'}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        )}
      </div>

      <RecipeDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={selectedRecipe}
      />

      <RecipeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitRecipe}
      />
    </div>
  );
};

export default RecipesSection;
