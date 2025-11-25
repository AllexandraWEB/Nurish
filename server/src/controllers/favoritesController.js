import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import mongoose from 'mongoose';

// Add recipe to favorites
export const addToFavorites = async (req, res) => {
  try {
    console.log('Add to favorites - req.user:', req.user);
    console.log('Adding favorite for user:', req.user?.userId);
    console.log('Recipe data:', req.body);

    if (!req.user?.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { recipe } = req.body;

    // Find or create the recipe in the database
    let existingRecipe = await Recipe.findOne({ title: recipe.title });

    if (!existingRecipe) {
      console.log('Recipe not found, creating new recipe...');
      // Create new recipe if it doesn't exist
      existingRecipe = new Recipe({
        title: recipe.title,
        subtitle: recipe.subtitle || '',
        author: req.user.userId,
        minutes: recipe.minutes?.toString() || '0',
        image: recipe.image || '',
        imageDetails: recipe.imageDetails || recipe.image || '',
        servings: recipe.servings || '',
        prepTime: recipe.prepTime || '',
        cookTime: recipe.cookTime || '',
        video: recipe.video || '',
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        recipeDetails: recipe.recipeDetails || [],
      });
      await existingRecipe.save();
      console.log('New recipe created:', existingRecipe._id);
    } else {
      console.log('Recipe already exists:', existingRecipe._id);
    }

    // Find user and update favorites using findByIdAndUpdate
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already in favorites
    const alreadyFavorite = user.favorites.some(
      fav => fav.toString() === existingRecipe._id.toString()
    );

    if (alreadyFavorite) {
      return res.json({ 
        message: 'Already in favorites', 
        recipe: existingRecipe 
      });
    }

    // Add to favorites using updateOne to avoid validation issues
    await User.updateOne(
      { _id: req.user.userId },
      { $push: { favorites: existingRecipe._id } }
    );

    console.log('Recipe added to favorites successfully');

    res.json({ 
      message: 'Added to favorites', 
      recipe: existingRecipe 
    });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ 
      message: 'Failed to add to favorites',
      error: error.message 
    });
  }
};

// Remove recipe from favorites
export const removeFromFavorites = async (req, res) => {
  try {
    console.log('Remove from favorites - req.user:', req.user);
    console.log('Removing favorite for user:', req.user?.userId);

    if (!req.user?.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { title } = req.body;

    const recipe = await Recipe.findOne({ title });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Remove from favorites using updateOne
    await User.updateOne(
      { _id: req.user.userId },
      { $pull: { favorites: recipe._id } }
    );

    console.log('Recipe removed from favorites successfully');

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ 
      message: 'Failed to remove from favorites',
      error: error.message 
    });
  }
};

// Get user's favorites
export const getFavorites = async (req, res) => {
  try {
    console.log('Get favorites - req.user:', req.user);
    console.log('Getting favorites for user:', req.user?.userId);

    if (!req.user?.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User favorites before cleaning:', user.favorites);

    // Filter out invalid ObjectIds (clean up corrupted data)
    const validFavoriteIds = user.favorites.filter(id => {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) {
        console.log('Invalid favorite ID found:', id);
      }
      return isValid;
    });

    console.log('Valid favorite IDs:', validFavoriteIds);

    // Update user if we had to clean up invalid IDs
    if (validFavoriteIds.length !== user.favorites.length) {
      console.log('Cleaning up invalid favorite IDs...');
      await User.updateOne(
        { _id: req.user.userId },
        { $set: { favorites: validFavoriteIds } }
      );
      console.log('Cleaned up invalid favorite IDs');
    }

    // Fetch the actual recipe documents
    const favorites = await Recipe.find({ _id: { $in: validFavoriteIds } })
      .populate('author', 'name');

    console.log('Fetched favorites:', favorites.length);

    const favoritesWithAuthor = favorites.map(recipe => ({
      ...recipe.toObject(),
      author: recipe.author?.name || 'Unknown',
      authorId: recipe.author?._id,
    }));

    res.json(favoritesWithAuthor);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ 
      message: 'Failed to fetch favorites', 
      error: error.message 
    });
  }
};