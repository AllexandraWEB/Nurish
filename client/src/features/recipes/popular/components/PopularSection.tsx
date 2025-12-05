import Categories from "@/features/home/Categories";
import RecipeCard from "@/features/recipes/shared/components/RecipeCard";
import SmallRecipeCard from "@/features/recipes/shared/components/SmallRecipeCard";
import RecipeDetailsModal from "../../shared/components/RecipeDetailsModal";
import { usePopularRecipes } from "../hooks/usePopularRecipes";

const PopularSection = () => {
  const {
    isModalOpen,
    selectedRecipe,
    popularRecipes,
    fastRecipes,
    loading,
    error,
    handleRecipeClick,
    handleCloseModal,
    fetchPopularRecipes,
  } = usePopularRecipes();

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
            onClick={fetchPopularRecipes}
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
      <div className="pt-10">
        <h1 className="recipes-headline mb-8">Popular Recipes</h1>
        {popularRecipes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">No popular recipes available yet.</p>
          </div>
        ) : (
          <div className="grid-4-cols">
            {popularRecipes.map((recipe) => (
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

        <h1 className="recipes-headline py-8 mt-5">Popular Categories</h1>
        <div>
          <Categories />
        </div>

        <div>
          <h1 className="recipes-headline py-8 mt-5">Under 30 Minutes</h1>
          {fastRecipes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-lg">No quick recipes available yet.</p>
            </div>
          ) : (
            <div className="grid-4-cols pb-10">
              {fastRecipes.map((recipe) => (
                <SmallRecipeCard
                  key={recipe._id}
                  title={recipe.title}
                  author={recipe.author}
                  image={recipe.image || "/images/default-recipe.jpg"}
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <RecipeDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        recipe={selectedRecipe}
      />
    </div>
  );
};

export default PopularSection;