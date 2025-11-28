import Categories from "@/features/home/Categories";
import RecipeCard from "@/features/recipes/shared/RecipeCard";
import SmallRecipeCard from "@/features/recipes/shared/SmallRecipeCard";
import { fastRecipes, RECIPES } from "@/constants";
import { useState } from "react";
import RecipeDetailsModal from "../shared/RecipeDetailsModal";

const PopularSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-20 p-4 md:p-0 container max-w-[1288px] mx-auto">
      <div className="pt-10">
        <h1 className="recipes-headline mb-8">Popular Recipes</h1>
        <div className="grid-4-cols">
          {RECIPES.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              author={recipe.author}
              minutes={recipe.minutes}
              image={recipe.image}
              imageDetails={recipe.imageDetails}
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe)}
            />
          ))}
        </div>

        <h1 className="recipes-headline py-8 mt-5">Popular Categories</h1>
        <div>
          <Categories />
        </div>

        <div>
          <h1 className="recipes-headline py-8 mt-5">Under 30 Minutes</h1>
          <div className="grid-4-cols pb-10">
            {fastRecipes.map((recipe, index) => (
              <SmallRecipeCard
                key={index}
                title={recipe.title}
                author={recipe.author}
                image={recipe.image}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        </div>
      </div>

      <RecipeDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={selectedRecipe}
      />
    </div>
  );
};

export default PopularSection;