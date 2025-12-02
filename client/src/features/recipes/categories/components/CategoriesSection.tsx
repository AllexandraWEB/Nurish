import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeCard from '@/features/recipes/shared/components/RecipeCard';
import RecipeDetailsModal from '@/features/recipes/shared/components/RecipeDetailsModal';
import Container from '@/layouts/Container';
import { apiFetch } from '@/lib/api';
import { Recipe } from '@/types/recipe';
import { RECIPE_CATEGORIES } from '@/constants';

const CategoriesSection = () => {
  const { category, id } = useParams<{ category: string; id?: string }>();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentCategory = RECIPE_CATEGORIES.find((cat) => cat.id === category);

  useEffect(() => {
    if (category) {
      fetchRecipesByCategory(category);
    }
  }, [category]);

  // Open modal when ID is in URL
  useEffect(() => {
    if (id && recipes.length > 0) {
      const recipe = recipes.find((r) => r._id === id);
      if (recipe) {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
      }
    }
  }, [id, recipes]);

  const fetchRecipesByCategory = async (categoryId: string) => {
    try {
      setLoading(true);
      // Fetch all public recipes
      const allRecipes = await apiFetch('/api/recipes');

      // Filter by category field
      const filtered = allRecipes.filter((recipe: Recipe) => {
        return recipe.category === categoryId;
      });

      setRecipes(filtered);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/categories/${category}/${recipe._id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/categories/${category}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  if (loading) {
    return (
      <Container className="mt-20 p-4 md:p-0">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-20 p-4 md:p-0">
      <div className="pt-10 pb-20">
        {/* Category Header */}
        {currentCategory && (
          <div className="mb-12">
            <div className="relative h-64 rounded-2xl overflow-hidden mb-6 glass-border">
              <img
                src={currentCategory.image}
                alt={currentCategory.name}
                className="w-full h-full object-cover blur-sm"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end">
                <h1 className="text-5xl font-bold p-8">{currentCategory.name}</h1>
              </div>
            </div>
          </div>
        )}

        {/* All Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {RECIPE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`relative h-24 rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                  cat.id === category ? 'ring-2 ring-primary' : ''
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm text-center px-2">
                    {cat.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            {currentCategory?.name} Recipes ({recipes.length})
          </h2>

          {recipes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl mb-4">
                No recipes found in this category yet.
              </p>
              <p className="text-gray-500 mb-6">
                Be the first to add a recipe!
              </p>
              <button
                onClick={() => navigate('/recipes')}
                className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
              >
                Add Recipe
              </button>
            </div>
          ) : (
            <div className="grid-4-cols">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  title={recipe.title}
                  author={recipe.author}
                  minutes={recipe.minutes}
                  image={recipe.image || '/images/default-recipe.jpg'}
                  imageDetails={recipe.imageDetails || recipe.image || '/images/default-recipe.jpg'}
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
    </Container>
  );
};

export default CategoriesSection;
