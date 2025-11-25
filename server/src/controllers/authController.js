import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import mongoose from 'mongoose';

// Register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT token with userId (consistent naming)
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token with userId (consistent naming)
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

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
      // Create new recipe if it doesn't exist
      existingRecipe = new Recipe({
        title: recipe.title,
        subtitle: recipe.subtitle,
        author: req.user.userId,
        minutes: recipe.minutes || '0',
        image: recipe.image,
        imageDetails: recipe.imageDetails || recipe.image,
        servings: recipe.servings,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        video: recipe.video,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        recipeDetails: recipe.recipeDetails,
      });
      await existingRecipe.save();
    }

    // Add to user's favorites
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already in favorites
    if (!user.favorites.includes(existingRecipe._id)) {
      user.favorites.push(existingRecipe._id);
      await user.save();
    }

    res.json({ message: 'Added to favorites', recipe: existingRecipe });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Failed to add to favorites' });
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

    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== recipe._id.toString()
    );
    await user.save();

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ message: 'Failed to remove from favorites' });
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

    // Filter out invalid ObjectIds (clean up corrupted data)
    const validFavoriteIds = user.favorites.filter(id => 
      mongoose.Types.ObjectId.isValid(id)
    );

    // Update user if we had to clean up invalid IDs
    if (validFavoriteIds.length !== user.favorites.length) {
      user.favorites = validFavoriteIds;
      await user.save();
      console.log('Cleaned up invalid favorite IDs');
    }

    // Fetch the actual recipe documents
    const favorites = await Recipe.find({ _id: { $in: validFavoriteIds } })
      .populate('author', 'name');

    const favoritesWithAuthor = favorites.map(recipe => ({
      ...recipe.toObject(),
      author: recipe.author?.name || 'Unknown',
      authorId: recipe.author?._id,
    }));

    res.json(favoritesWithAuthor);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
};


