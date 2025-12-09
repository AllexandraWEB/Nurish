import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../../.env") });

const POPULAR_RECIPES = [
  {
    title: "Easy Meatballs with Arugula",
    subtitle: "for healthy lifestyle",
    author: "Chef Mario",
    minutes: "120",
    image: "/recipe-images/Recipe-1.jpeg",
    imageDetails: "/recipe-images/Recipe-1.png",
    video: "https://www.youtube.com/embed/qc9cHXwp_Xc?si=b5Y_V9FN616VzqLB",
    servings: "2 servings",
    prepTime: "35 min",
    cookTime: "40 min",
    recipeDetails: ["2 servings", "35 min prep", "40 min cook"],
    isPublic: true,
    category: "dinner",
    featured: "popular",
    ingredients: [
      "500g ground beef",
      "2 cups fresh arugula",
      "1 onion, finely chopped",
      "2 cloves garlic, minced",
      "1 egg",
      "1/2 cup breadcrumbs",
      "Salt and pepper to taste",
      "2 tbsp olive oil",
    ],
    instructions: [
      {
        number: 1,
        text: "In a large bowl, combine ground beef, chopped onion, minced garlic, egg, breadcrumbs, salt, and pepper. Mix well until all ingredients are evenly distributed.",
      },
      {
        number: 2,
        text: "Shape the mixture into medium-sized meatballs, about 1.5 inches in diameter. Make sure they are evenly sized for consistent cooking.",
      },
      {
        number: 3,
        text: "Heat olive oil in a large skillet over medium-high heat. Add meatballs and cook for 8-10 minutes, turning occasionally, until browned on all sides and cooked through.",
      },
      {
        number: 4,
        text: "Remove meatballs from heat and let them rest for 2-3 minutes. This helps retain the juices.",
      },
      {
        number: 5,
        text: "Arrange fresh arugula on serving plates, place meatballs on top, and drizzle with remaining pan juices. Serve immediately while hot.",
      },
    ],
  },
  {
    title: "Vegan Avocado Salad",
    subtitle: "fresh and healthy",
    author: "Chef Lina",
    minutes: "45",
    image: "/recipe-images/Recipe-2.jpeg",
    imageDetails: "/recipe-images/Recipe-2.png",
    video: "https://www.youtube.com/embed/MzTRzSwBnVk?si=aWQqgKW3cDtbC2z4",
    servings: "4 servings",
    prepTime: "15 min",
    cookTime: "0 min",
    recipeDetails: ["4 servings", "15 min prep", "No cooking"],
    isPublic: true,
    category: "salads",
    featured: "popular",
    ingredients: [
      "2 ripe avocados",
      "2 cups mixed greens",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, thinly sliced",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "Salt and pepper to taste",
      "1/4 cup sunflower seeds",
    ],
    instructions: [
      {
        number: 1,
        text: "Wash and dry the mixed greens thoroughly. Place them in a large salad bowl.",
      },
      {
        number: 2,
        text: "Cut avocados in half, remove the pit, and slice into thin wedges. Add to the bowl with the greens.",
      },
      {
        number: 3,
        text: "Add halved cherry tomatoes and thinly sliced red onion to the bowl.",
      },
      {
        number: 4,
        text: "In a small bowl, whisk together olive oil, lemon juice, salt, and pepper to create the dressing.",
      },
      {
        number: 5,
        text: "Drizzle the dressing over the salad, toss gently, and top with sunflower seeds. Serve immediately.",
      },
    ],
  },
  {
    title: "Spicy Thai Noodles",
    subtitle: "bold and flavorful",
    author: "Chef Aisha",
    minutes: "60",
    image: "/recipe-images/Recipe-3.jpeg",
    imageDetails: "/recipe-images/Recipe-3.png",
    video: "https://www.youtube.com/embed/LyYBUsAhUUU?si=paRCsoyun-7yAD5r",
    servings: "3 servings",
    prepTime: "20 min",
    cookTime: "15 min",
    recipeDetails: ["3 servings", "20 min prep", "15 min cook"],
    isPublic: true,
    category: "asian",
    featured: "popular",
    ingredients: [
      "200g rice noodles",
      "2 tbsp vegetable oil",
      "2 cloves garlic, minced",
      "1 red chili, sliced",
      "1 bell pepper, sliced",
      "2 tbsp soy sauce",
      "1 tbsp fish sauce",
      "1 tbsp lime juice",
      "Fresh cilantro for garnish",
      "Crushed peanuts for topping",
    ],
    instructions: [
      {
        number: 1,
        text: "Cook rice noodles according to package instructions. Drain and set aside.",
      },
      {
        number: 2,
        text: "Heat vegetable oil in a large wok or skillet over high heat. Add minced garlic and sliced chili, stir-fry for 30 seconds.",
      },
      {
        number: 3,
        text: "Add sliced bell pepper and stir-fry for 2-3 minutes until slightly softened.",
      },
      {
        number: 4,
        text: "Add cooked noodles, soy sauce, fish sauce, and lime juice. Toss everything together for 2-3 minutes.",
      },
      {
        number: 5,
        text: "Serve hot, garnished with fresh cilantro and crushed peanuts on top.",
      },
    ],
  },
  {
    title: "Creamy Garlic Pasta",
    subtitle: "comfort food classic",
    author: "Chef Marco",
    minutes: "90",
    image: "/recipe-images/Recipe-6.jpeg",
    imageDetails: "/recipe-images/Recipe-6.png",
    video: "https://www.youtube.com/embed/oYiRKd5l2rU?si=BDhHm3UnxLPDt8Q3",
    servings: "4 servings",
    prepTime: "10 min",
    cookTime: "20 min",
    recipeDetails: ["4 servings", "10 min prep", "20 min cook"],
    isPublic: true,
    category: "pasta",
    featured: "popular",
    ingredients: [
      "400g fettuccine pasta",
      "4 cloves garlic, minced",
      "2 cups heavy cream",
      "1/2 cup grated Parmesan cheese",
      "3 tbsp butter",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
      "1/4 tsp nutmeg (optional)",
    ],
    instructions: [
      {
        number: 1,
        text: "Cook fettuccine pasta in salted boiling water according to package instructions. Reserve 1 cup of pasta water before draining.",
      },
      {
        number: 2,
        text: "In a large pan, melt butter over medium heat. Add minced garlic and sauté for 1-2 minutes until fragrant.",
      },
      {
        number: 3,
        text: "Pour in heavy cream and bring to a gentle simmer. Cook for 5 minutes, stirring occasionally.",
      },
      {
        number: 4,
        text: "Add Parmesan cheese, salt, pepper, and nutmeg. Stir until cheese is melted and sauce is smooth. If too thick, add reserved pasta water.",
      },
      {
        number: 5,
        text: "Toss drained pasta in the sauce until well coated. Garnish with fresh parsley and serve immediately.",
      },
    ],
  },
  {
    title: "Salmon Arugula Delight",
    subtitle: "Fresh & Nutritious",
    author: "Chef Marina",
    minutes: "15",
    image: "/recipe-images/Recipe-10.jpeg",
    imageDetails: "/recipe-images/Recipe-10.png",
    servings: "2 servings",
    prepTime: "10 min",
    cookTime: "5 min",
    recipeDetails: ["2 servings", "10 min prep", "5 min cook"],
    video: "https://www.youtube.com/embed/39ySJGnS0E0?si=c5eH02c3NaZTe8zd",
    isPublic: true,
    category: "salads",
    ingredients: [
      "150g smoked or grilled salmon, sliced",
      "3 cups fresh arugula",
      "1/2 avocado, sliced",
      "1/4 red onion, thinly sliced",
      "1 tbsp olive oil",
      "1 tsp lemon juice",
      "Salt to taste",
      "Black pepper to taste",
      "Optional: cherry tomatoes, halved",
    ],
    instructions: [
      {
        number: 1,
        text: "Place fresh arugula in a large salad bowl.",
      },
      {
        number: 2,
        text: "Add sliced smoked or grilled salmon on top.",
      },
      {
        number: 3,
        text: "Add avocado slices and thinly sliced red onion.",
      },
      {
        number: 4,
        text: "Drizzle with olive oil and lemon juice.",
      },
      {
        number: 5,
        text: "Season with salt and pepper, toss gently, and serve immediately.",
      },
    ],
  },
  {
    title: "Violet Bloom Cocktail",
    subtitle: "Floral & Refreshing",
    author: "Mixologist Elena",
    minutes: "8",
    image: "/recipe-images/Recipe-11.jpeg",
    imageDetails: "/recipe-images/Recipe-11.png",
    servings: "1 serving",
    prepTime: "8 min",
    cookTime: "0 min",
    recipeDetails: ["1 serving", "8 min prep", "no cook"],
    video: "https://www.youtube.com/embed/Ttnf3PbJqnA?si=eOEWTbAlepMMwBj-",
    isPublic: true,
    category: "drinks",
    ingredients: [
      "50ml gin",
      "20ml violet liqueur",
      "15ml fresh lemon juice",
      "10ml simple syrup",
      "Ice cubes",
      "Edible violets for garnish",
      "Optional: tonic water for a lighter version",
    ],
    instructions: [
      {
        number: 1,
        text: "Fill a shaker with ice.",
      },
      {
        number: 2,
        text: "Add gin, violet liqueur, lemon juice, and simple syrup.",
      },
      {
        number: 3,
        text: "Shake well for 10–12 seconds.",
      },
      {
        number: 4,
        text: "Strain into a chilled cocktail glass.",
      },
      {
        number: 5,
        text: "Garnish with a few edible violet flowers and serve.",
      },
    ],
  },
  {
    title: "Mint Lemonade Cooler",
    subtitle: "Fresh & Zesty",
    author: "Chef Liora",
    minutes: "10",
    image: "/recipe-images/Recipe-12.jpeg",
    imageDetails: "/recipe-images/Recipe-12.png",
    servings: "3 servings",
    prepTime: "10 min",
    cookTime: "0 min",
    recipeDetails: ["3 servings", "10 min prep", "no cook"],
    video: "https://www.youtube.com/embed/5_sHXJC9ocA?si=wTwBw-Yvk5Gu8E0q",
    isPublic: true,
    category: "drinks",
    ingredients: [
      "3 lemons, juiced",
      "3 tbsp sugar or honey",
      "3 cups cold water",
      "A handful of fresh mint leaves",
      "Ice cubes",
      "Optional: lemon slices for garnish",
    ],
    instructions: [
      {
        number: 1,
        text: "In a pitcher, mix lemon juice with sugar or honey until dissolved.",
      },
      {
        number: 2,
        text: "Add cold water and stir well.",
      },
      {
        number: 3,
        text: "Gently crush the mint leaves with your hands to release aroma, then add them to the pitcher.",
      },
      {
        number: 4,
        text: "Add plenty of ice and stir again.",
      },
      {
        number: 5,
        text: "Serve with extra mint leaves and lemon slices if desired.",
      },
    ],
  },
  {
    title: "Iced Green Tea Refresh",
    subtitle: "Light & Cooling",
    author: "Tea Master Hana",
    minutes: "10",
    image: "/recipe-images/Recipe-13.jpeg",
    imageDetails: "/recipe-images/Recipe-13.png",
    servings: "2 servings",
    prepTime: "5 min",
    cookTime: "5 min",
    recipeDetails: ["2 servings", "5 min prep", "5 min brew"],
    video: "https://www.youtube.com/embed/zZh1KNgk2W8?si=evhUbk8S4zK1KUpT",
    isPublic: true,
    category: "drinks",
    ingredients: [
      "2 green tea bags (or 2 tsp loose leaf green tea)",
      "2 cups hot water (not boiling, ~80°C)",
      "1–2 tsp honey or sweetener (optional)",
      "Ice cubes",
      "2 lemon slices",
      "Fresh mint leaves (optional)",
    ],
    instructions: [
      {
        number: 1,
        text: "Heat water to about 80°C (not fully boiling) to avoid bitterness.",
      },
      {
        number: 2,
        text: "Steep green tea bags for 2–3 minutes, then remove.",
      },
      {
        number: 3,
        text: "If desired, stir in honey while the tea is still warm.",
      },
      {
        number: 4,
        text: "Let the tea cool for a few minutes, then pour into a glass filled with ice.",
      },
      {
        number: 5,
        text: "Garnish with lemon slices and optional mint leaves. Serve chilled.",
      },
    ],
  },
  {
    title: "Cucumber Edamame Garden Salad",
    subtitle: "Crisp, Colorful & Fresh",
    author: "Chef Aveline",
    minutes: "12",
    image: "/recipe-images/Recipe-14.jpeg",
    imageDetails: "/recipe-images/Recipe-14.png",
    servings: "2 servings",
    prepTime: "12 min",
    cookTime: "0 min",
    recipeDetails: ["2 servings", "12 min prep", "no cook"],
    video: "https://www.youtube.com/embed/nBveCvdl8_k?si=PSHYt3YFhsKAfdD4",
    isPublic: true,
    category: "salads",
    ingredients: [
      "1 medium cucumber, thinly sliced",
      "1 cup cooked edamame (shelled)",
      "1 small zucchini, shaved into ribbons",
      "A handful of edible flowers",
      "1 tbsp olive oil",
      "1 tsp rice vinegar or lemon juice",
      "Salt to taste",
      "Black pepper to taste",
      "Optional: sesame seeds",
    ],
    instructions: [
      {
        number: 1,
        text: "Thinly slice the cucumber and place it in a large bowl.",
      },
      {
        number: 2,
        text: "Shave the zucchini into thin ribbons using a peeler and add to the bowl.",
      },
      {
        number: 3,
        text: "Add the cooked, cooled edamame.",
      },
      {
        number: 4,
        text: "Drizzle with olive oil and rice vinegar (or lemon juice).",
      },
      {
        number: 5,
        text: "Season with salt, black pepper, and toss gently.",
      },
    ],
  },
  {
    title: "Green Pesto Pasta",
    subtitle: "Simple & Fragrant",
    author: "Chef Lucia",
    minutes: "20",
    image: "/recipe-images/Recipe-15.jpeg",
    imageDetails: "/recipe-images/Recipe-15.png",
    servings: "2 servings",
    prepTime: "5 min",
    cookTime: "15 min",
    recipeDetails: ["2 servings", "5 min prep", "15 min cook"],
    video: "https://www.youtube.com/embed/p7edUxCLOGw?si=R2b7APLa8MUCu45S",
    isPublic: true,
    category: "pasta",
    ingredients: [
      "200g pasta (spaghetti, penne, or fusilli)",
      "1/2 cup basil pesto (store-bought or homemade)",
      "1 tbsp olive oil",
      "2 tbsp grated Parmesan cheese",
      "Salt for pasta water",
      "Black pepper to taste",
      "Optional: cherry tomatoes, pine nuts, extra basil leaves",
    ],
    instructions: [
      {
        number: 1,
        text: "Bring a pot of salted water to a boil and cook the pasta according to package instructions.",
      },
      {
        number: 2,
        text: "Reserve 1/4 cup of the pasta water, then drain the pasta.",
      },
      {
        number: 3,
        text: "In a large bowl or pan, mix the pesto with olive oil and a splash of pasta water.",
      },
      {
        number: 4,
        text: "Add the hot pasta and toss until evenly coated in the green pesto sauce.",
      },
      {
        number: 5,
        text: "Season with black pepper and sprinkle Parmesan on top.",
      },
      {
        number: 6,
        text: "Serve immediately with optional cherry tomatoes, pine nuts, or fresh basil.",
      },
    ],
  },
  {
    title: "Asparagus Nut Crunch Salad",
    subtitle: "Creamy & Fresh",
    author: "Chef Emilia",
    minutes: "15",
    image: "/recipe-images/Recipe-16.jpeg",
    imageDetails: "/recipe-images/Recipe-16.png",
    servings: "2 servings",
    prepTime: "10 min",
    cookTime: "5 min",
    recipeDetails: ["2 servings", "10 min prep", "5 min cook"],
    video: "https://www.youtube.com/embed/JLEdb94FD_8?si=SEj9hlXmbAQCmjyQ",
    isPublic: true,
    category: "salads",
    ingredients: [
      "200g asparagus, trimmed",
      "A handful of mixed nuts (walnuts, almonds, cashews)",
      "1 cup mixed greens or arugula",
      "1 tbsp olive oil",
      "Salt to taste",
      "Black pepper to taste",
      "2 tbsp Greek yogurt or sour cream",
      "1 tsp lemon juice",
      "1 tsp honey",
      "1 tsp olive oil",
    ],
    instructions: [
      {
        number: 1,
        text: "Blanch the asparagus in boiling water for 2–3 minutes, then transfer to ice water. Pat dry and cut into pieces.",
      },
      {
        number: 2,
        text: "Toast the nuts lightly in a pan for 1–2 minutes until fragrant.",
      },
      {
        number: 3,
        text: "In a small bowl, whisk together the Greek yogurt, lemon juice, honey, and olive oil to create the white dressing.",
      },
      {
        number: 4,
        text: "Add the mixed greens to a bowl, then top with asparagus and toasted nuts.",
      },
      {
        number: 5,
        text: "Drizzle with the white dressing, season with salt and pepper, and toss gently before serving.",
      },
    ],
  },
  {
    title: "Creamy Garlic Mussels",
    subtitle: "Rich & Savory Seafood Classic",
    author: "Chef Roland",
    minutes: "25",
    image: "/recipe-images/Recipe-17.jpeg",
    imageDetails: "/recipe-images/Recipe-17.png",
    servings: "2 servings",
    prepTime: "10 min",
    cookTime: "15 min",
    recipeDetails: ["2 servings", "10 min prep", "15 min cook"],
    video: "https://www.youtube.com/embed/ZH0hV6HwGZw?si=zPRWgb6BOM66ZAV2",
    isPublic: true,
    category: "seafood",
    ingredients: [
      "1 kg fresh mussels, cleaned and debearded",
      "2 tbsp butter",
      "3 garlic cloves, minced",
      "1 small onion, finely chopped",
      "1/2 cup white wine",
      "1/2 cup heavy cream",
      "Salt to taste",
      "Black pepper to taste",
      "Fresh parsley, chopped",
      "Optional: lemon wedge for serving",
    ],
    instructions: [
      {
        number: 1,
        text: "Heat butter in a large pot over medium heat. Add the chopped onion and sauté until soft.",
      },
      {
        number: 2,
        text: "Add garlic and cook for 30 seconds until fragrant.",
      },
      {
        number: 3,
        text: "Pour in the white wine and bring to a simmer.",
      },
      {
        number: 4,
        text: "Add the mussels, cover, and cook for 5–7 minutes until all shells open.",
      },
      {
        number: 5,
        text: "Remove mussels with a slotted spoon, leaving the liquid in the pot.",
      },
      {
        number: 6,
        text: "Add the heavy cream to the pot, stir, and simmer for 2 minutes to thicken the sauce.",
      },
      {
        number: 7,
        text: "Season with salt, pepper, and stir in fresh parsley.",
      },
      {
        number: 8,
        text: "Return mussels to the pot, toss gently in the creamy sauce, and serve warm with optional lemon.",
      },
    ],
  },
  {
    title: "Steak with Sweet Potato Purée",
    subtitle: "Tender & Comforting",
    author: "Chef Danilo",
    minutes: "35",
    image: "/recipe-images/Recipe-18.jpeg",
    imageDetails: "/recipe-images/Recipe-18.png",
    servings: "2 servings",
    prepTime: "10 min",
    cookTime: "25 min",
    recipeDetails: ["2 servings", "10 min prep", "25 min cook"],
    video: "https://www.youtube.com/embed/05qThhjO2Gc?si=LVOjEhAWaw9IiT6t",
    isPublic: true,
    category: "dinner",
    ingredients: [
      "2 beef steaks (ribeye, sirloin, or tenderloin)",
      "1 tbsp olive oil",
      "Salt to taste",
      "Black pepper to taste",
      "1 garlic clove, smashed",
      "1 sprig fresh thyme or rosemary",
      "1 tbsp butter",
      "2 medium sweet potatoes, peeled and diced",
      "1 tbsp butter",
      "2 tbsp milk or cream",
      "Salt to taste",
      "Optional: pinch of nutmeg",
    ],
    instructions: [
      {
        number: 1,
        text: "Boil the diced sweet potatoes in salted water for 12–15 minutes until soft.",
      },
      {
        number: 2,
        text: "Drain the sweet potatoes and mash with butter, milk (or cream), salt, and optional nutmeg until smooth.",
      },
      {
        number: 3,
        text: "Season the steaks generously with salt and black pepper.",
      },
      {
        number: 4,
        text: "Heat olive oil in a pan over high heat. Add the steak and sear 2–3 minutes per side for medium-rare.",
      },
      {
        number: 5,
        text: "Add butter, garlic, and thyme/rosemary to the pan. Spoon the melted butter over the steaks for 30–40 seconds.",
      },
    ],
  },
];

const FAST_RECIPES = [
  {
    title: "Quick Chicken Stir-Fry",
    subtitle: "easy weeknight dinner",
    author: "Chef Mario",
    minutes: "25",
    image: "/recipe-images/Recipe-5.jpeg",
    imageDetails: "/recipe-images/Recipe-5.png",
    servings: "2 servings",
    prepTime: "10 min",
    cookTime: "15 min",
    recipeDetails: ["2 servings", "10 min prep", "15 min cook"],
    video: "https://www.youtube.com/embed/rR8Nm5aok0Y?si=4djfUwlccJgyMqJU",
    isPublic: true,
    category: "dinner",
    featured: "fast",
    ingredients: [
      "300g chicken breast, sliced",
      "2 cups mixed vegetables",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 cloves garlic, minced",
      "1 tsp ginger, grated",
      "Salt and pepper to taste",
    ],
    instructions: [
      {
        number: 1,
        text: "Heat sesame oil in a large wok over high heat. Add garlic and ginger, stir-fry for 30 seconds.",
      },
      {
        number: 2,
        text: "Add sliced chicken and cook for 5-6 minutes until browned.",
      },
      {
        number: 3,
        text: "Add mixed vegetables and stir-fry for 3-4 minutes.",
      },
      {
        number: 4,
        text: "Add soy sauce, season with salt and pepper. Toss for 2 minutes.",
      },
      {
        number: 5,
        text: "Serve hot over rice or noodles.",
      },
    ],
  },
  {
    title: "Quick Pesto Pasta",
    subtitle: "fresh and simple",
    author: "Chef Lina",
    minutes: "15",
    image: "/recipe-images/Recipe-4.jpeg",
    imageDetails: "/recipe-images/Recipe-4.png",
    servings: "3 servings",
    prepTime: "15 min",
    cookTime: "0 min",
    recipeDetails: ["3 servings", "15 min prep", "No cooking"],
    video: "https://www.youtube.com/embed/ldAINdBOjQY?si=uA7YGfoAxIxWtc3-",
    isPublic: true,
    category: "salads",
    featured: "fast",
    ingredients: [
      "4 large tomatoes, sliced",
      "250g fresh mozzarella, sliced",
      "Fresh basil leaves",
      "3 tbsp olive oil",
      "2 tbsp balsamic vinegar",
      "Salt and pepper to taste",
    ],
    instructions: [
      {
        number: 1,
        text: "Arrange tomato and mozzarella slices alternating on a serving platter.",
      },
      {
        number: 2,
        text: "Tuck fresh basil leaves between the slices.",
      },
      {
        number: 3,
        text: "Drizzle with olive oil and balsamic vinegar.",
      },
      {
        number: 4,
        text: "Season with salt and pepper to taste.",
      },
      {
        number: 5,
        text: "Serve immediately at room temperature.",
      },
    ],
  },
  {
    title: "Fast Pad Thai",
    subtitle: "restaurant quality",
    author: "Chef Aisha",
    minutes: "20",
    image: "/recipe-images/Recipe-8.jpeg",
    imageDetails: "/recipe-images/Recipe-8.png",
    servings: "2 servings",
    prepTime: "10 min",
    cookTime: "10 min",
    recipeDetails: ["2 servings", "10 min prep", "10 min cook"],
    video: "https://www.youtube.com/embed/l1GnRockuQw?si=D_2Vi7C2coT58M9w",
    isPublic: true,
    category: "asian",
    featured: "fast",
    ingredients: [
      "200g rice noodles",
      "2 eggs",
      "100g shrimp",
      "2 tbsp tamarind paste",
      "2 tbsp fish sauce",
      "1 tbsp sugar",
      "Bean sprouts",
      "Crushed peanuts",
      "Lime wedges",
    ],
    instructions: [
      {
        number: 1,
        text: "Soak rice noodles in warm water for 10 minutes, then drain.",
      },
      {
        number: 2,
        text: "Heat oil in wok, scramble eggs, then add shrimp and cook until pink.",
      },
      {
        number: 3,
        text: "Add noodles, tamarind paste, fish sauce, and sugar. Toss well.",
      },
      {
        number: 4,
        text: "Add bean sprouts and cook for 1 minute.",
      },
      {
        number: 5,
        text: "Serve topped with crushed peanuts and lime wedges.",
      },
    ],
  },
  {
    title: "Express Carbonara",
    subtitle: "Italian classic",
    author: "Chef Marco",
    minutes: "20",
    image: "/recipe-images/Recipe-7.jpeg",
    imageDetails: "/recipe-images/Recipe-7.png",
    servings: "3 servings",
    prepTime: "5 min",
    cookTime: "15 min",
    recipeDetails: ["3 servings", "5 min prep", "15 min cook"],
    video: "https://www.youtube.com/embed/4nAfxzE02Gw?si=vVEXwL2vXPdv8cZ5",
    isPublic: true,
    category: "pasta",
    featured: "fast",
    ingredients: [
      "300g spaghetti",
      "150g bacon, diced",
      "3 egg yolks",
      "1/2 cup Parmesan cheese, grated",
      "Black pepper to taste",
      "Salt for pasta water",
    ],
    instructions: [
      {
        number: 1,
        text: "Cook spaghetti in salted boiling water according to package instructions. Reserve 1 cup pasta water.",
      },
      {
        number: 2,
        text: "Fry bacon until crispy in a large pan.",
      },
      {
        number: 3,
        text: "In a bowl, whisk egg yolks with Parmesan cheese and black pepper.",
      },
      {
        number: 4,
        text: "Drain pasta and add to bacon pan. Remove from heat.",
      },
      {
        number: 5,
        text: "Quickly mix in egg mixture, adding pasta water to create creamy sauce. Serve immediately.",
      },
    ],
  },
];

async function seedRecipes() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Find or create a system user for these recipes
    let systemUser = await User.findOne({ email: "system@nurish.com" });

    if (!systemUser) {
      console.log("Creating system user...");
      systemUser = await User.create({
        name: "Nurish Chefs",
        email: "system@nurish.com",
        password: "system-generated-recipes-" + Date.now(),
        favorites: [],
      });
      console.log("System user created");
    }

    const allRecipes = [...POPULAR_RECIPES, ...FAST_RECIPES];

    console.log(`Seeding ${allRecipes.length} recipes...`);

    // Delete existing featured recipes to avoid duplicates
    // await Recipe.deleteMany({ featured: { $in: ["popular", "fast"] } });
    // console.log("Cleared existing featured recipes");

    for (const recipeData of allRecipes) {
      // Create recipe with system user as author
      const recipe = await Recipe.findOneAndUpdate(
        { title: recipeData.title }, // Find by title
        { ...recipeData, author: systemUser._id }, // Update or create
        { upsert: true, new: true } // upsert = create if doesn't exist
      );

      console.log(`✓ Created recipe: ${recipe.title} (${recipe.featured})`);
    }

    console.log("\n✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding recipes:", error);
    process.exit(1);
  }
}

seedRecipes();
