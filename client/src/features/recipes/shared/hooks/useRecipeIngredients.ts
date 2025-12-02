export const useRecipeIngredients = (
  ingredients: string[],
  onChange: (ingredients: string[]) => void
) => {
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    onChange(newIngredients);
  };

  const addIngredient = () => {
    onChange([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      onChange(newIngredients);
    }
  };

  return {
    handleIngredientChange,
    addIngredient,
    removeIngredient,
  };
};