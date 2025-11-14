import { Heart } from "lucide-react";

interface RecipeCardProps {
  title: string;
  author: string;
  minutes: number | string;
  image: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  author,
  minutes,
  image,
}) => {
  return (
    <div className="flex gap-4 justify-center">
      <div
        className="relative w-[310px] h-[480px] rounded-2xl overflow-hidden cursor-pointer bg-center bg-cover glass-border 
        transform transition-transform duration-500 ease-out hover:scale-105"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 dark-gradient" />

        {/* Heart Icon */}
        <div className="absolute top-4 right-4 z-10">
          <Heart className="text-white w-6 h-6" />
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 w-full p-4 z-10">
          <h1 className="text-white text-2xl font-semibold">{title}</h1>
          <div className="flex justify-between text-gray-300 text-sm mt-1">
            <p>by {author}</p>
            <p>{minutes} minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
