import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";

interface FormData {
  title: string;
  subtitle?: string;
  author: string;
  authorId?: string;
  minutes: string;
  image?: string;
  imageDetails: string;
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  video?: string;
  category?: string;
  ingredients?: string[];
  instructions?: { number: number; text: string }[];
  recipeDetails?: string[];
}

export const useRecipeFormData = (recipe?: Recipe | null, isOpen?: boolean) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    author: "",
    minutes: "",
    image: "",
    imageDetails: "",
    servings: "",
    prepTime: "",
    cookTime: "",
    video: "",
    category: "",
    ingredients: [""],
    instructions: [{ number: 1, text: "" }],
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || "",
        subtitle: recipe.subtitle || "",
        author: recipe.author || "",
        authorId: recipe.authorId,
        minutes: recipe.minutes?.toString() || "",
        image: recipe.image || "",
        imageDetails: recipe.imageDetails || "",
        servings: recipe.servings || "",
        prepTime: recipe.prepTime || "",
        cookTime: recipe.cookTime || "",
        video: recipe.video || "",
        category: recipe.category || "",
        ingredients: recipe.ingredients || [""],
        instructions: recipe.instructions || [{ number: 1, text: "" }],
      });
    } else if (isOpen) {
      // Reset form when opening for new recipe
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setFormData({
        title: "",
        subtitle: "",
        author: user.name || "",
        authorId: user.id,
        minutes: "",
        image: "",
        imageDetails: "",
        servings: "",
        prepTime: "",
        cookTime: "",
        video: "",
        category: "",
        ingredients: [""],
        instructions: [{ number: 1, text: "" }],
      });
    }
  }, [recipe, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleSelectChange,
    updateFormData,
  };
};