import User from "../models/User.js";

// Get user's favorites
export const getFavorites = async (req, res) => {
  try {
    console.log("Getting favorites for user:", req.user.id);
    
    const user = await User.findById(req.user.id).select("favorites");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ favorites: user.favorites || [] });
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add recipe to favorites
export const addFavorite = async (req, res) => {
  try {
    console.log("Adding favorite for user:", req.user.id);
    console.log("Recipe data:", req.body);
    
    const { recipe } = req.body;

    if (!recipe || !recipe.title) {
      console.log("Invalid recipe data");
      return res.status(400).json({ message: "Recipe data is required" });
    }

    // Check if recipe is already in favorites
    const user = await User.findById(req.user.id).select("favorites");
    
    if (!user) {
      console.log("User not found:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyFavorited = user.favorites.some(
      (fav) => fav.title === recipe.title
    );

    if (alreadyFavorited) {
      console.log("Recipe already favorited:", recipe.title);
      return res.status(400).json({ message: "Recipe already in favorites" });
    }

    // Add recipe to favorites using findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          favorites: {
            title: recipe.title,
            subtitle: recipe.subtitle || "",
            author: recipe.author,
            minutes: recipe.minutes,
            image: recipe.image,
            imageDetails: recipe.imageDetails || recipe.image,
            servings: recipe.servings || "",
            prepTime: recipe.prepTime || "",
            cookTime: recipe.cookTime || "",
            video: recipe.video || "",
            recipeDetails: recipe.recipeDetails || [],
            ingredients: recipe.ingredients || [],
            instructions: recipe.instructions || [],
            addedAt: new Date(),
          },
        },
      },
      { new: true, select: "favorites" }
    );
    
    console.log("Recipe added successfully:", recipe.title);

    res.status(201).json({
      message: "Recipe added to favorites",
      favorites: updatedUser.favorites,
    });
  } catch (error) {
    console.error("Add favorite error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove recipe from favorites
export const removeFavorite = async (req, res) => {
  try {
    const { recipeTitle } = req.params;
    console.log("Removing favorite:", recipeTitle);

    if (!recipeTitle) {
      return res.status(400).json({ message: "Recipe title is required" });
    }

    const decodedTitle = decodeURIComponent(recipeTitle);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          favorites: { title: decodedTitle },
        },
      },
      { new: true, select: "favorites" }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Recipe removed successfully");

    res.json({
      message: "Recipe removed from favorites",
      favorites: updatedUser.favorites,
    });
  } catch (error) {
    console.error("Remove favorite error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Clear all favorites
export const clearFavorites = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { favorites: [] } },
      { new: true, select: "favorites" }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "All favorites cleared" });
  } catch (error) {
    console.error("Clear favorites error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};