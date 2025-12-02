export type Recipe = {
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
  isPublic?: boolean;
  category?: string;
};

export type RecipeFormData = Omit<Recipe, "_id">;

export type RecipeCardProps = {
  title: string;
  author: string;
  minutes: number | string;
  image: string;
  imageDetails: string;
  onClick?: () => void;
  recipe?: Recipe;
  onEdit?: () => void;
  onDelete?: () => void;
};

export type SmallRecipeCardProps = {
  title: string;
  author: string;
  image: string;
  onClick?: () => void;
  recipe?: Recipe;
  onEdit?: () => void;
  onDelete?: () => void;
};

export type RecipeDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
  onEdit?: () => void;
  onDelete?: () => void;
};

export type RecipeFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipe: Recipe) => void | Promise<void>;
  recipe?: Recipe | null;
};
