import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    author: { type: String, required: true },
    minutes: { type: mongoose.Schema.Types.Mixed },
    image: { type: String, required: true },
    imageDetails: { type: String },
    servings: { type: String },
    prepTime: { type: String },
    cookTime: { type: String },
    video: { type: String },
    recipeDetails: [{ type: String }],
    ingredients: [{ type: String }],
    instructions: [
      {
        number: { type: Number },
        text: { type: String },
      },
    ],
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [favoriteSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);


