import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Recipe author is required"],
    },
    minutes: {
      type: String,
      required: [true, "Total cooking time is required"],
      trim: true,
    },
    image: String,
    imageDetails: String,
    servings: {
      type: String,
      required: [true, "Number of servings is required"],
      trim: true,
    },
    prepTime: {
      type: String,
      required: [true, "Preparation time is required"],
      trim: true,
    },
    cookTime: {
      type: String,
      trim: true,
    },
    video: {
      type: String,
      required: [true, "Video URL is required"],
      trim: true,
    },
    ingredients: {
      type: [String],
      required: [true, "At least one ingredient is required"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Please add at least one ingredient to your recipe",
      },
    },
    instructions: {
      type: [
        {
          number: {
            type: Number,
            required: [true, "Instruction number is required"],
          },
          text: {
            type: String,
            required: [true, "Instruction text is required"],
            trim: true,
          },
        },
      ],
      required: [true, "At least one instruction is required"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Please add at least one instruction to your recipe",
      },
    },
    recipeDetails: [String],
    isPublic: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [true, "Recipe category is required"],
      enum: {
        values: [
          "breakfast",
          "lunch",
          "dinner",
          "desserts",
          "snacks",
          "drinks",
          "vegan",
          "healthy",
          "salads",
          "soups",
          "pasta",
          "seafood",
          "grilling",
          "baking",
          "asian",
          "italian",
        ],
        message: "Please select a valid category for your recipe",
      },
    },
    featured: {
      type: String,
      enum: {
        values: ["popular", "fast", null],
        message: 'Featured type must be either "popular", "fast", or null',
      },
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Recipe", recipeSchema);
