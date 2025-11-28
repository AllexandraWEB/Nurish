import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { useState } from "react";

interface RecipeCardProps {
  title: string;
  author: string;
  image: string;
  onClick?: () => void;
  recipe?: any;
}

const SmallRecipeCard: React.FC<RecipeCardProps> = ({
  title,
  author,
  image,
  onClick,
  recipe,
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  const favorited = isFavorite(title);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      window.location.href = "/login";
      return;
    }

    setIsAnimating(true);
    try {
      if (favorited) {
        await removeFromFavorites(title);
      } else {
        await addToFavorites(recipe || { title, author, image });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      <div
        onClick={onClick}
        className="relative w-[310px] h-[280px] rounded-2xl overflow-hidden cursor-pointer bg-center bg-cover glass-border 
        transform transition-transform duration-500 ease-out hover:scale-105 group"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 dark-gradient" />

        {/* Heart Icon */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleFavoriteClick}
            className={`transition-all duration-300 ${
              isAnimating ? "scale-125" : "scale-100"
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                favorited
                  ? "fill-red-500 text-red-500"
                  : "text-white hover:text-red-300"
              }`}
            />
          </button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 w-full p-4 z-10">
          <h1 className="text-white text-xl font-semibold">{title}</h1>
          <div className="flex justify-between text-gray-300 text-sm mt-1">
            <p>by {author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallRecipeCard;
