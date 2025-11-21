import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { apiFetch } from "@/lib/api";

type Recipe = {
  _id?: string;
  title: string;
  subtitle?: string;
  minutes: string;
  image?: string;
  imageDetails?: string;
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  video?: string;
  recipeDetails?: string[];
  ingredients?: string[];
  instructions?: { number: number; text: string }[];
};

type RecipeFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipe: Recipe) => void | Promise<void>;
  recipe?: Recipe | null;
};

const RecipeForm: React.FC<RecipeFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  recipe,
}) => {
  const [formData, setFormData] = useState<Recipe>({
    title: "",
    subtitle: "",
    minutes: "",
    image: "",
    imageDetails: "",
    servings: "",
    prepTime: "",
    cookTime: "",
    video: "",
    recipeDetails: [],
    ingredients: [""],
    instructions: [{ number: 1, text: "" }],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (recipe) {
      setFormData({
        ...recipe,
        ingredients: recipe.ingredients || [""],
        instructions: recipe.instructions || [{ number: 1, text: "" }],
      });
      setImagePreview(recipe.image || "");
    } else {
      setFormData({
        title: "",
        subtitle: "",
        minutes: "",
        image: "",
        imageDetails: "",
        servings: "",
        prepTime: "",
        cookTime: "",
        video: "",
        recipeDetails: [],
        ingredients: [""],
        instructions: [{ number: 1, text: "" }],
      });
      setImagePreview("");
    }
  }, [recipe]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name, file.type, file.size);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);

      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          console.log('Base64 string created, length:', base64String.length);
          console.log('Base64 prefix:', base64String.substring(0, 100));
          
          // Upload to Cloudinary via your backend
          console.log('Sending to backend...');
          const response = await apiFetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify({ image: base64String }),
          });

          console.log('Upload response:', response);

          if (response.url) {
            setFormData((prev) => ({
              ...prev,
              image: response.url,
              imageDetails: response.url,
            }));
            setImagePreview(response.url);
            console.log('Image uploaded successfully:', response.url);
          } else {
            throw new Error('No URL returned from upload');
          }
        } catch (error: any) {
          console.error('Upload error:', error);
          alert('Failed to upload image: ' + (error?.message || 'Unknown error'));
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        alert('Failed to read file');
        setIsUploading(false);
      };
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Failed to upload image: ' + (error?.message || 'Unknown error'));
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
    
    // Convert video URL to embed format
    const processedData = {
      ...formData,
      video: formData.video ? convertToEmbedUrl(formData.video) : '',
    };
    
    onSubmit(processedData);
  };

  const convertToEmbedUrl = (url: string): string => {
    if (!url) return '';
    
    // Already an embed URL
    if (url.includes('/embed/')) {
      return url;
    }
    
    // Regular YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) {
      const videoId = watchMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Short URL: https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) {
      const videoId = shortMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Return original if not a YouTube URL
    return url;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-hidden">
      <div className="bg-red-400 rounded-lg w-full max-w-4xl h-[90vh] shadow-lg relative overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">
            {recipe ? "Edit Recipe" : "Add New Recipe"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Recipe Image</h3>
            
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
                      setFormData((prev) => ({ ...prev, image: "", imageDetails: "" }));
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
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                      <p className="text-gray-600">Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <ImageIcon size={48} className="text-gray-400 mb-4" />
                      <p className="text-gray-600">Click to upload image</p>
                      <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 5MB</p>
                    </>
                  )}
                </label>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h3>
            <div>
              <Label htmlFor="title">Recipe Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minutes">Cooking Time (minutes) *</Label>
                <Input
                  id="minutes"
                  name="minutes"
                  value={formData.minutes}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="servings">Servings</Label>
                <Input
                  id="servings"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prepTime">Prep Time</Label>
                <Input
                  id="prepTime"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cookTime">Cook Time</Label>
                <Input
                  id="cookTime"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="video">Video URL</Label>
              <Input
                id="video"
                name="video"
                value={formData.video}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Ingredients
              </h3>
              <Button
                type="button"
                onClick={addIngredient}
                size="sm"
                variant="outline"
              >
                <Plus size={16} className="mr-1" />
                Add Ingredient
              </Button>
            </div>
            {formData.ingredients?.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                />
                {formData.ingredients && formData.ingredients.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    size="sm"
                    variant="outline"
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
              <h3 className="text-lg font-semibold text-gray-900">
                Instructions
              </h3>
              <Button
                type="button"
                onClick={addInstruction}
                size="sm"
                variant="outline"
              >
                <Plus size={16} className="mr-1" />
                Add Step
              </Button>
            </div>
            {formData.instructions?.map((instruction, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex items-center justify-center w-8 h-10 bg-gray-100 rounded text-gray-700 font-semibold">
                  {index + 1}
                </div>
                <textarea
                  value={instruction.text}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  placeholder={`Step ${index + 1}`}
                  className="flex-1 min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.instructions && formData.instructions.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </form>

        <div className="border-t p-6 flex justify-end gap-4">
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isUploading}>
            {recipe ? "Update Recipe" : "Create Recipe"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;