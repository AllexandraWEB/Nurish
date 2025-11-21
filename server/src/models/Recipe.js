import mongoose from 'mongoose';

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
  authorName: String,
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
  recipeDetails: [String],
  ingredients: [String],
  instructions: [{
    number: Number,
    text: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Recipe', recipeSchema);