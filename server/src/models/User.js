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
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);


