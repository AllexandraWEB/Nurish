import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  minutes: {
    type: String,
    required: true,
  },
  image: String,
  imageDetails: String,
  servings: String,
  prepTime: String,
  cookTime: String,
  video: String,
  ingredients: [String],
  instructions: [{
    number: Number,
    text: String,
  }],
  recipeDetails: [String],
}, {
  timestamps: true,
});

export default mongoose.model('Recipe', recipeSchema);