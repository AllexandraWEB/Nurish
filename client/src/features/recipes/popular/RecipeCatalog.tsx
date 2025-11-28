import Categories from "@/features/home/Categories";
import RecipeCard from "@/features/recipes/shared/RecipeCard";
import SmallRecipeCard from "@/features/recipes/shared/SmallRecipeCard";
import RecipeDetailsModal from "../shared/RecipeDetailsModal";
import { fastRecipes, RECIPES } from "@/constants";
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

const RecipeCatalog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
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

  const popularRecipes = [...RECIPES, ...allRecipes];

  const quickRecipes = [
    ...fastRecipes,
    ...allRecipes.filter(recipe => {
      const mins = typeof recipe.minutes === 'string' 
        ? parseInt(recipe.minutes) 
        : recipe.minutes;
      return mins <= 30;
    })
  ];

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
      <div className="pt-10">
        <h1 className="recipes-headline mb-8">Popular Recipes</h1>
        <div className="grid-4-cols">
          {popularRecipes.map((recipe, index) => (
            <RecipeCard
              key={'_id' in recipe && recipe._id ? recipe._id : `popular-${index}`}
              title={recipe.title}
              author={recipe.author}
              minutes={recipe.minutes}
              image={recipe.image || ''}
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
            {quickRecipes.map((recipe, index) => (
              <SmallRecipeCard
                key={'_id' in recipe && recipe._id ? recipe._id : `quick-${index}`}
                title={recipe.title}
                author={recipe.author}
                image={recipe.image || ''}
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

export default RecipeCatalog;
