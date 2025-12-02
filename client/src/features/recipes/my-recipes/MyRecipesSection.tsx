import { Plus } from "lucide-react";
import { Button } from "@/ui/button";
import RecipeCard from "@/features/recipes/shared/RecipeCard";
import RecipeDetailsModal from "../shared/RecipeDetailsModal";
import RecipeForm from "../shared/RecipeForm";
import { useMyRecipes } from "./hooks/useMyRecipes";

const MyRecipesSection = () => {
  const {
    recipes,
    isFormOpen,
    editingRecipe,
    isLoading,
    selectedRecipe,
    isDetailsModalOpen,
    handleCreateRecipe,
    handleUpdateRecipe,
    handleCloseForm,
    handleRecipeClick,
    handleCloseModal,
    handleEditFromModal,
    handleDeleteFromModal,
    openForm,
  } = useMyRecipes();

  return (
    <div className="mt-20 p-4 md:p-0 container max-w-[1288px] mx-auto">
      <div className="pt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="recipes-headline">My Recipes</h1>
          <Button
            onClick={openForm}
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
            <Button onClick={openForm} className="rounded-full">
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
        onClose={handleCloseModal}
        recipe={selectedRecipe}
        onEdit={handleEditFromModal}
        onDelete={handleDeleteFromModal}
      />
    </div>
  );
};

export default MyRecipesSection;