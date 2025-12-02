import { useState, useEffect } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import RecipeCard from "@/features/recipes/shared/components/RecipeCard";
import Container from "@/layouts/Container";
import { useNavigate } from "react-router-dom";
import RecipeDetailsModal from "../../shared/components/RecipeDetailsModal";

const FavoritesSection = () => {
  const { favorites, loading } = useFavorites();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      // Redirect to home page if not authenticated
      navigate("/");
    }
  }, [navigate]);

  const handleRecipeClick = (recipe: any) => {
    // Ensure imageDetails is available for the modal
    const recipeWithDetails = {
      ...recipe,
      imageDetails: recipe.imageDetails || recipe.image || "/images/default-recipe.jpg",
    };
    setSelectedRecipe(recipeWithDetails);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-2xl">Loading favorites...</div>
      </div>
    );
  }

  return (
    <Container className="mt-20 p-4 md:p-0">
      <div className="pt-10 pb-20">
        <h1 className="recipes-headline mb-8">My Favorite Recipes</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-4">
              You haven't added any favorites yet.
            </p>
            <p className="text-gray-500">
              Click the heart icon on any recipe to add it to your favorites!
            </p>
            <a 
              href="/recipes" 
              className="inline-block mt-6 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
            >
              Browse Recipes
            </a>
          </div>
        ) : (
          <div className="grid-4-cols">
            {favorites.map((recipe, index) => (
              <RecipeCard
                key={recipe._id || index}
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

      <RecipeDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={selectedRecipe}
      />
    </Container>
  );
};

export default FavoritesSection;