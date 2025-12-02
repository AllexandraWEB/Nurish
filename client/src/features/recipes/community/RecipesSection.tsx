import RecipeCard from "@/features/recipes/shared/RecipeCard";
import RecipeForm from "../shared/RecipeForm";
import RecipeDetailsModal from "../shared/RecipeDetailsModal";
import { useCommunityRecipes } from "./hooks/useCommunityRecipes";

const RecipesSection = () => {
  const {
    isModalOpen,
    selectedRecipe,
    isFormOpen,
    allRecipes,
    loading,
    error,
    handleRecipeClick,
    handleCloseModal,
    handleAddPublicRecipe,
    handleSubmitRecipe,
    handleCloseForm,
    fetchAllRecipes,
  } = useCommunityRecipes();

  if (loading) {
    return (
      <div className="mt-20 p-4 md:p-0 container max-w-[1288px] mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 p-4 md:p-0 container max-w-[1288px] mx-auto">
        <div className="text-center py-20">
          <p className="text-red-400 text-xl mb-4">Error: {error}</p>
          <button
            onClick={fetchAllRecipes}
            className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            Try Again
          </button>
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
            <p className="text-gray-400 text-xl mb-4">No community recipes yet.</p>
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
                image={recipe.image || "/images/default-recipe.jpg"}
                imageDetails={recipe.imageDetails || "/images/default-recipe.jpg"}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        )}
      </div>

      <RecipeDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        recipe={selectedRecipe}
      />

      <RecipeForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitRecipe}
      />
    </div>
  );
};

export default RecipesSection;
