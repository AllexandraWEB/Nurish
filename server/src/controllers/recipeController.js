import Recipe from '../models/Recipe.js';

// Get all PUBLIC recipes only (for Community Recipes page)
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ isPublic: true })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    
    const recipesWithAuthor = recipes.map(recipe => ({
      ...recipe.toObject(),
      author: recipe.author?.name || 'Unknown',
      authorId: recipe.author?._id,
    }));
    
    res.json(recipesWithAuthor);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
};

// Get user's recipes (both public and private, only recipes they created)
export const getMyRecipes = async (req, res) => {
  try {
    console.log('Getting recipes for user:', req.user.userId);
    
    // Find ALL recipes created by this user (public and private)
    const recipes = await Recipe.find({ author: req.user.userId })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${recipes.length} recipes created by user`);
    
    const recipesWithAuthor = recipes.map(recipe => ({
      ...recipe.toObject(),
      author: recipe.author?.name || 'You',
      authorId: recipe.author?._id,
    }));
    
    res.json(recipesWithAuthor);
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
};

// Get single recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'name');
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if recipe is public or if user is the author
    if (!recipe.isPublic && recipe.author._id.toString() !== req.user?.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const recipeWithAuthor = {
      ...recipe.toObject(),
      author: recipe.author?.name || 'Unknown',
      authorId: recipe.author?._id,
    };
    
    res.json(recipeWithAuthor);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Failed to fetch recipe' });
  }
};

// Create new recipe
export const createRecipe = async (req, res) => {
  try {
    console.log('Create recipe - req.user:', req.user);
    console.log('Create recipe - userId:', req.user?.userId);
    console.log('Create recipe - body:', req.body);
    
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const recipeData = {
      ...req.body,
      author: req.user.userId,
      // isPublic is included from req.body
    };
    
    console.log('Create recipe - recipeData:', recipeData);
    
    const recipe = new Recipe(recipeData);
    await recipe.save();
    
    const populatedRecipe = await Recipe.findById(recipe._id)
      .populate('author', 'name');
    
    const recipeWithAuthor = {
      ...populatedRecipe.toObject(),
      author: populatedRecipe.author?.name || 'You',
      authorId: populatedRecipe.author?._id,
    };
    
    res.status(201).json(recipeWithAuthor);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Failed to create recipe', error: error.message });
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
    if (recipe.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this recipe' });
    }
    
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name');
    
    const recipeWithAuthor = {
      ...updatedRecipe.toObject(),
      author: updatedRecipe.author?.name || 'You',
      authorId: updatedRecipe.author?._id,
    };
    
    res.json(recipeWithAuthor);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Failed to update recipe' });
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
    if (recipe.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this recipe' });
    }
    
    await Recipe.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Failed to delete recipe' });
  }
};