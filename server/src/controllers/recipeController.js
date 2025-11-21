import Recipe from '../models/Recipe.js';

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username email');
    res.json(recipes);
  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's recipes
export const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user.id });
    res.json(recipes);
  } catch (error) {
    console.error('Get user recipes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single recipe
export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username email');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Get recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create recipe
export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      minutes,
      image,
      imageDetails,
      servings,
      prepTime,
      cookTime,
      video,
      recipeDetails,
      ingredients,
      instructions,
    } = req.body;

    if (!title || !minutes) {
      return res.status(400).json({ message: 'Title and cooking time are required' });
    }

    const recipe = new Recipe({
      title,
      subtitle,
      author: req.user.id,
      authorName: req.user.username,
      minutes,
      image,
      imageDetails: imageDetails || image,
      servings,
      prepTime,
      cookTime,
      video,
      recipeDetails,
      ingredients,
      instructions,
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// Update recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is the author
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this recipe' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    res.json(updatedRecipe);
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is the author
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this recipe' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};