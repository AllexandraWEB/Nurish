import { Beef, Fish, Leaf, Soup, Utensils } from "lucide-react";

export const guestNavLinks = [
  { name: "Popular Recipes", href: "/popular-recipes" },
  { name: "Recipes", href: "/recipes" },
  { name: "AI Chef", href: "/ai-chef" },
];

export const userNavLinks = [
  { name: "Popular Recipes", href: "/popular-recipes" },
  { name: "Recipes", href: "/recipes" },
  // { name: "Categories", href: "/categories" },
  // { name: "AI Chef", href: "/ai-chef" },
  { name: "Favorites", href: "/favorites" },
  { name: "My Recipes", href: "/my-recipes" },
];

export const heroSlides = [
  {
    id: 1,
    title: "Premium Restaurant",
    subtitle: "in your home",
    image: "/images/hero-background-1.png",
  },
  {
    id: 2,
    title: "Premium Restaurant",
    subtitle: "in your home",
    image: "/images/hero-background-3.png",
  },
];

export const RECIPES = [
  {
    title: "Easy Meatballs with Arugula",
    subtitle: "for healthy lifestyle",
    author: "Chef Mario",
    minutes: 120,
    image: "/recipe-images/Recipe-1.jpeg",
    imageDetails: "/recipe-images/Recipe-1.png",
    video: "https://www.youtube.com/embed/XxQiY1qKv9Y?si=ic9FR0EOckMmNKew",
    servings: "2 servings",
    prepTime: "35 min",
    cookTime: "40 min",
    recipeDetails: ["2 servings", "35 min prep", "40 min cook"],
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
    minutes: 45,
    image: "/recipe-images/Recipe-2.jpeg",
    imageDetails: "/recipe-images/Recipe-2.png",
    video: "https://www.youtube.com/embed/XxQiY1qKv9Y?si=ic9FR0EOckMmNKew",
    servings: "4 servings",
    prepTime: "15 min",
    cookTime: "0 min",
    recipeDetails: ["4 servings", "15 min prep", "No cooking"],
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
    minutes: 60,
    image: "/recipe-images/Recipe-3.jpeg",
    imageDetails: "/recipe-images/Recipe-3.png",
    video: "https://www.youtube.com/embed/XxQiY1qKv9Y?si=ic9FR0EOckMmNKew",
    servings: "3 servings",
    prepTime: "20 min",
    cookTime: "15 min",
    recipeDetails: ["3 servings", "20 min prep", "15 min cook"],
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
    minutes: 90,
    image: "/recipe-images/Recipe-6.jpeg",
    imageDetails: "/recipe-images/Recipe-6.png",
    video: "https://www.youtube.com/embed/XxQiY1qKv9Y?si=ic9FR0EOckMmNKew",
    servings: "4 servings",
    prepTime: "10 min",
    cookTime: "20 min",
    recipeDetails: ["4 servings", "10 min prep", "20 min cook"],
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
];

export const CATEGORIES = [
  {
    name: "Meats",
    icon: Beef,
    link: "/categories/meats",
  },
  {
    name: "Seafood",
    icon: Fish,
    link: "/categories/seafood",
  },
  {
    name: "Vegetarian",
    icon: Leaf,
    link: "/categories/vegetarian",
  },
  {
    name: "Soups",
    icon: Soup,
    link: "/categories/soups",
  },
  {
    name: "World Cuisine",
    icon: Utensils,
    link: "/categories/world-cuisine",
  },
  {
    name: "Meats",
    icon: Beef,
    link: "/categories/meats",
  },
  {
    name: "Seafood",
    icon: Fish,
    link: "/categories/seafood",
  },
  {
    name: "Vegetarian",
    icon: Leaf,
    link: "/categories/vegetarian",
  },
];

export const fastRecipes = [
  {
    title: "Quick Chicken Stir-Fry",
    subtitle: "easy weeknight dinner",
    author: "Chef Mario",
    minutes: 25,
    image: "/recipe-images/Recipe-5.jpeg",
    imageDetails: "/recipe-images/Recipe-5.png",
    servings: "2 servings",
    prepTime: "10 min",
    cookTime: "15 min",
    recipeDetails: ["2 servings", "10 min prep", "15 min cook"],
    video: "https://www.youtube.com/embed/XxQiY1qKv9Y?si=ic9FR0EOckMmNKew",
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
    title: "Quick Caprese Salad",
    subtitle: "fresh and simple",
    author: "Chef Lina",
    minutes: 15,
    image: "/recipe-images/Recipe-4.jpeg",
    imageDetails: "/recipe-images/Recipe-4.png",
    servings: "3 servings",
    prepTime: "15 min",
    cookTime: "0 min",
    recipeDetails: ["3 servings", "15 min prep", "No cooking"],
    video: "https://www.youtube.com/embed/XxQiY1qKv9Y?si=ic9FR0EOckMmNKew",
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
    minutes: 20,
    image: "/recipe-images/Recipe-8.jpeg",
    imageDetails: "/recipe-images/Recipe-8.png",
    servings: "2 servings",
    prepTime: "10 min",
    cookTime: "10 min",
    recipeDetails: ["2 servings", "10 min prep", "10 min cook"],
    video: "https://www.youtube.com/embed/XxQiY1qKv9Y?si=ic9FR0EOckMmNKew",
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
    minutes: 20,
    image: "/recipe-images/Recipe-7.jpeg",
    imageDetails: "/recipe-images/Recipe-7.png",
    servings: "3 servings",
    prepTime: "5 min",
    cookTime: "15 min",
    recipeDetails: ["3 servings", "5 min prep", "15 min cook"],
    video: "https://www.youtube.com/embed/XxQiY1qKv9Y?si=ic9FR0EOckMmNKew",
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
