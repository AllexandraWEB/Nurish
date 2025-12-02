import React, { useState, useEffect, useRef } from "react";
import { X, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { apiFetch } from "@/lib/api";
import { useModalClose } from "@/hooks/useModalClose";
import { Label } from "@/ui/label";
import { Recipe } from "@/types/recipe";
import { RECIPE_CATEGORIES } from "@/constants";

type RecipeFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipe: Recipe) => void | Promise<void>;
  recipe?: Recipe | null;
};

// Convert YouTube URL to embed format
const convertToEmbedUrl = (url: string): string => {
  if (!url) return "";

  if (url.includes("/embed/")) {
    return url;
  }

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) {
    const videoId = watchMatch[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) {
    const videoId = shortMatch[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
};

const RecipeForm: React.FC<RecipeFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  recipe,
}) => {
  const [formData, setFormData] = useState<Partial<Recipe>>({
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
    category: "", // Add category field
    ingredients: [""],
    instructions: [{ number: 1, text: "" }],
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  useModalClose({
    modalRef,
    onClose,
    enableSwipe: false,
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        ...recipe,
        ingredients: recipe.ingredients || [""],
        instructions: recipe.instructions || [{ number: 1, text: "" }],
      });
      setImagePreview(recipe.image || "");
    } else {
      // Get user info for author
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
      setImagePreview("");
    }
  }, [recipe, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;

          const response = await apiFetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({ image: base64String }),
          });

          if (response.url) {
            setFormData((prev) => ({
              ...prev,
              image: response.url,
              imageDetails: response.url,
            }));
            setImagePreview(response.url);
          } else {
            throw new Error("No URL returned from upload");
          }
        } catch (error: any) {
          console.error("Upload error:", error);
          alert(
            "Failed to upload image: " + (error?.message || "Unknown error")
          );
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        alert("Failed to read file");
        setIsUploading(false);
      };
    } catch (error: any) {
      console.error("Upload error:", error);
      alert("Failed to upload image: " + (error?.message || "Unknown error"));
      setIsUploading(false);
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...(formData.ingredients || [])];
    newIngredients[index] = value;
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), ""],
    }));
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients?.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...(formData.instructions || [])];
    newInstructions[index] = { number: index + 1, text: value };
    setFormData((prev) => ({ ...prev, instructions: newInstructions }));
  };

  const addInstruction = () => {
    const nextNumber = (formData.instructions?.length || 0) + 1;
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...(prev.instructions || []),
        { number: nextNumber, text: "" },
      ],
    }));
  };

  const removeInstruction = (index: number) => {
    const newInstructions = formData.instructions
      ?.filter((_, i) => i !== index)
      .map((inst, i) => ({ number: i + 1, text: inst.text }));
    setFormData((prev) => ({ ...prev, instructions: newInstructions }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get user info for author
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const processedData: Recipe = {
      _id: recipe?._id,
      title: formData.title || "",
      subtitle: formData.subtitle,
      author: user.name || formData.author || "Anonymous",
      authorId: user.id || formData.authorId,
      minutes: formData.minutes || "0",
      image: formData.image,
      imageDetails: formData.imageDetails || formData.image || "",
      servings: formData.servings,
      prepTime: formData.prepTime,
      cookTime: formData.cookTime,
      video: formData.video ? convertToEmbedUrl(formData.video) : "",
      category: formData.category,
      ingredients: formData.ingredients?.filter((i) => i.trim() !== ""),
      instructions: formData.instructions?.filter((i) => i.text.trim() !== ""),
      recipeDetails: formData.recipeDetails,
    };

    onSubmit(processedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blur-background overflow-hidden">
      <div
        ref={modalRef}
        className="backdrop-blur-[32px] rounded-none md:rounded-lg w-full md:max-w-[1290px] h-full md:h-[90vh] shadow-lg relative overflow-hidden flex flex-col glass-border"
      >
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-semibold text-white">
            {recipe ? "Edit Recipe" : "Add New Recipe"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
        >
          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Recipe Image</h3>

            <div className="flex flex-col items-center gap-4">
              {imagePreview ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setFormData((prev) => ({
                        ...prev,
                        image: "",
                        imageDetails: "",
                      }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  {isUploading ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p className="text-gray-300">Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <ImageIcon size={48} className="text-gray-400 mb-4" />
                      <p className="text-gray-300">Click to upload image</p>
                      <p className="text-sm text-gray-400 mt-2">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </label>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Basic Information
            </h3>
            <div>
              <Label htmlFor="title" className="text-white">
                Recipe Title *
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1 bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="subtitle" className="text-white">
                Subtitle
              </Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="mt-1 bg-white/10 border-white/20 text-white"
              />
            </div>

            {/* Category Selection */}
            <div>
              <Label htmlFor="category" className="text-white">
                Category *
              </Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                required
                className="mt-1 w-full px-3 py-3.5 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="" className="bg-neutral-900">Select a category</option>
                {RECIPE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-neutral-900">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prepTime" className="text-white">
                  Prep Time *
                </Label>
                <Input
                  id="prepTime"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleInputChange}
                  required
                  className="mt-1 bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="cookTime" className="text-white">
                  Cook Time
                </Label>
                <Input
                  id="cookTime"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleInputChange}
                  className="mt-1 bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minutes" className="text-white">
                  Total Minutes *
                </Label>
                <Input
                  id="minutes"
                  name="minutes"
                  type="number"
                  value={formData.minutes}
                  onChange={handleInputChange}
                  required
                  className="mt-1 bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="servings" className="text-white">
                  Servings
                </Label>
                <Input
                  id="servings"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                  className="mt-1 bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image" className="text-white">
                Image URL
              </Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="mt-1 bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="imageDetails" className="text-white">
                Detail Image URL
              </Label>
              <Input
                id="imageDetails"
                name="imageDetails"
                value={formData.imageDetails}
                onChange={handleInputChange}
                className="mt-1 bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="video" className="text-white">
                Video URL (YouTube embed)
              </Label>
              <Input
                id="video"
                name="video"
                value={formData.video}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const embedUrl = convertToEmbedUrl(e.target.value);
                  setFormData((prev) => ({ ...prev, video: embedUrl }));
                }}
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <p className="text-xs text-gray-400 mt-1">
                Paste any YouTube URL - it will be automatically converted to
                embed format
              </p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Ingredients</h3>
              <Button
                type="button"
                onClick={addIngredient}
                size="lg"
                variant="outline"
                className="glass-border-button"
              >
                <Plus size={16} className="mr-1" />
                Add Ingredient
              </Button>
            </div>
            {formData.ingredients?.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  placeholder={`Ingredient ${index + 1}`}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                {formData.ingredients && formData.ingredients.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    size="sm"
                    variant="default"
                    className="hover:bg-red-500/20"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Instructions</h3>
              <Button
                type="button"
                onClick={addInstruction}
                size="lg"
                variant="outline"
                className="glass-border-button"
              >
                <Plus size={16} className="mr-1" />
                Add Step
              </Button>
            </div>
            {formData.instructions?.map((instruction, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex items-center justify-center w-8 h-10 bg-white/10 rounded text-white font-semibold">
                  {index + 1}
                </div>
                <textarea
                  value={instruction.text}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  placeholder={`Step ${index + 1}`}
                  className="flex-1 min-h-[100px] px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                {formData.instructions && formData.instructions.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    size="sm"
                    variant="default"
                    className="hover:bg-red-500/20"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </form>

        <div className="border-t border-white/10 p-6 flex justify-end gap-4">
          <Button
            type="button"
            onClick={onClose}
            variant="default"
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isUploading}
            variant="outline"
            size="lg"
            className="glass-border-button"
          >
            {recipe ? "Update Recipe" : "Create Recipe"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
