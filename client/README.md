# 🍸 NURISH Client - Recipe Sharing Platform

The frontend application for Nurish, a modern recipe sharing platform built with React, TypeScript, and Vite. Features a clean, feature-based architecture for scalability and maintainability.

**Live Demo** - [Nurish Client](https://nurish.vercel.app)

<img width="2560" height="2040" alt="Image" src="https://github.com/user-attachments/assets/d78e5af2-646a-40f0-bf85-9e41156bbeeb" />

---

## 🛠 Tech Stack

<p>
  <img src="https://img.shields.io/badge/React-2E2E2E?style=flat&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-2E2E2E?style=flat&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-2E2E2E?style=flat&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-2E2E2E?style=flat&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-2E2E2E?style=flat&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn/ui-2E2E2E?style=flat&logo=shadcnui&logoColor=white" />
  <img src="https://img.shields.io/badge/Material_UI-2E2E2E?style=flat&logo=mui&logoColor=white" />
</p>

---

## 📖 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Feature-Based Architecture](#-feature-based-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Key Concepts](#-key-concepts)
- [Styling](#-styling)

---

## ✨ Features

### User Experience
- 🔐 Secure authentication with JWT
- 📱 Fully responsive design (mobile-first)
- ⚡ Lightning-fast page loads with Vite
- 🎨 Beautiful UI with Tailwind CSS and Material-UI
- 🌙 Dark-themed interface with glass morphism effects
- ♿ Accessible components following WCAG guidelines

### Recipe Features
- 📖 Browse popular and community recipes
- ⭐ Favorite system with real-time updates
- 🔍 Search by categories (16 different types)
- ⚡ Filter quick recipes (under 30 minutes)
- 🖼️ Image upload with Cloudinary integration
- 🎥 YouTube video embedding support
- ✏️ Create, edit, and delete personal recipes
- 🌍 Share recipes publicly with the community

### Technical Features
- 🎣 Custom hooks for reusable logic
- 🔄 Context API for global state management
- 🛡️ Protected routes with authentication guards
- 🧭 Client-side routing with React Router v7
- 📦 Code splitting and lazy loading
- 🎯 TypeScript for type safety

---

## 📁 Project Structure

### Overview
```
client/
├── public/ # Static assets
│ ├── category-images/ # Category thumbnails
│ ├── icons/ # App icons and favicons
│ ├── images/ # General images (hero backgrounds, etc.)
│ └── recipe-images/ # Recipe photos
├── src/
│ ├── App.tsx # Main app component with routing
│ ├── main.tsx # React entry point
│ ├── vite-env.d.ts # Vite environment type definitions
│ │
│ ├── constants/ # Application constants
│ │ └── index.ts # Nav links, hero slides, categories, etc.
│ │
│ ├── context/ # React Context providers
│ │ └── FavoritesContext.tsx # Global favorites state management
│ │
│ ├── features/ # Feature-based modules (self-contained)
│ │ │
│ │ ├── authentication/ # Authentication feature
│ │ │ ├── components/
│ │ │ │ ├── LoginForm.tsx
│ │ │ │ ├── LoginLayout.tsx
│ │ │ │ ├── RegisterForm.tsx
│ │ │ │ └── RegisterLayout.tsx
│ │ │ └── hooks/
│ │ │ ├── useLogin.ts
│ │ │ ├── useLogout.ts
│ │ │ └── useRegister.ts
│ │ │
│ │ ├── home/ # Home page feature
│ │ │ ├── Categories.tsx
│ │ │ └── HeroSection.tsx
│ │ │
│ │ └── recipes/ # Recipe management (main feature)
│ │ │
│ │ ├── categories/ # Browse recipes by category
│ │ │ ├── components/
│ │ │ │ └── CategoriesSection.tsx
│ │ │ └── hooks/
│ │ │
│ │ ├── community/ # Public community recipes
│ │ │ ├── components/
│ │ │ │ └── RecipesSection.tsx
│ │ │ └── hooks/
│ │ │ └── useCommunityRecipes.ts
│ │ │
│ │ ├── favorites/ # User's favorited recipes
│ │ │ ├── components/
│ │ │ │ └── FavoritesSection.tsx
│ │ │ └── hooks/
│ │ │
│ │ ├── my-recipes/ # User's personal recipes (CRUD)
│ │ │ ├── components/
│ │ │ │ ├── MyRecipeDetailsModal.tsx
│ │ │ │ └── MyRecipesSection.tsx
│ │ │ └── hooks/
│ │ │ └── useMyRecipes.ts
│ │ │
│ │ ├── popular/ # Featured popular recipes
│ │ │ ├── components/
│ │ │ │ ├── PopularSection.tsx
│ │ │ │ └── RecipeCatalog.tsx
│ │ │ └── hooks/
│ │ │ └── usePopularRecipes.ts
│ │ │
│ │ └── shared/ # Shared recipe components & hooks
│ │ ├── components/
│ │ │ ├── RecipeCard.tsx
│ │ │ ├── RecipeDetailsModal.tsx
│ │ │ ├── RecipeForm.tsx
│ │ │ └── SmallRecipeCard.tsx
│ │ └── hooks/
│ │ ├── useImageUpload.ts
│ │ ├── useRecipeFormData.ts
│ │ ├── useRecipeIngredients.ts
│ │ ├── useRecipeInstructions.ts
│ │ └── useVideoUrlConverter.ts
│ │
│ ├── hooks/ # Global custom hooks
│ │ └── useModalClose.ts
│ │
│ ├── layouts/ # Layout components (used across pages)
│ │ ├── Container.tsx
│ │ ├── Footer.tsx
│ │ ├── Navigation.tsx
│ │ └── ProtectedRoute.tsx
│ │
│ ├── lib/ # Utility libraries
│ │ ├── api.ts # API client with fetch wrapper
│ │ ├── auth.ts # Authentication helpers
│ │ └── utils.ts # General utility functions
│ │
│ ├── pages/ # Route page components
│ │ ├── CategoriesPage.tsx
│ │ ├── FavoritesPage.tsx
│ │ ├── LoginPage.tsx
│ │ ├── MyRecipesPage.tsx
│ │ ├── NotFoundPage.tsx
│ │ ├── PopularRecipesPage.tsx
│ │ ├── RecipesPage.tsx
│ │ └── RegisterPage.tsx
│ │
│ ├── styles/ # Global styles
│ │ └── global.css
│ │
│ ├── types/ # TypeScript type definitions
│ │ └── recipe.ts
│ │
│ └── ui/ # Reusable UI primitives (shadcn-style)
│ ├── button.tsx
│ ├── field.tsx
│ ├── input.tsx
│ ├── label.tsx
│ ├── separator.tsx
│ └── SeparatorTemplate.tsx
│
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── components.json # Shadcn UI configuration
├── eslint.config.js # ESLint configuration
├── index.html # HTML entry point
├── package.json # Dependencies and scripts
├── tsconfig.app.json # TypeScript config for app
├── tsconfig.json # Base TypeScript configuration
├── tsconfig.node.json # TypeScript config for Node
├── vite.config.ts # Vite configuration
└── vercel.json # Vercel deployment config
```

---

## 🏗️ Feature-Based Architecture

### What is Feature-Based Architecture?

Instead of organizing code by technical concerns (components, hooks, utils), we organize by **business features**. Each feature is a self-contained module with all its related code.

### Traditional Structure ❌
```
src/
├── components/ # All components mixed together
│ ├── LoginForm.tsx
│ ├── RecipeCard.tsx
│ ├── RegisterForm.tsx
│ └── RecipesSection.tsx
├── hooks/ # All hooks mixed together
│ ├── useLogin.ts
│ ├── useRecipes.ts
│ └── useRegister.ts
└── utils/
└── helpers.ts
```
**Problems:**
- Hard to find related code
- Components and logic are far apart
- Difficult to understand feature scope
- Challenging to refactor or remove features
- Poor scalability as app grows

### Feature-Based Structure ✅
```
src/
├── features/
│ ├── authentication/ # Everything auth-related
│ │ ├── components/
│ │ │ ├── LoginForm.tsx
│ │ │ └── RegisterForm.tsx
│ │ └── hooks/
│ │ ├── useLogin.ts
│ │ └── useRegister.ts
│ │
│ └── recipes/ # Everything recipe-related
│ ├── community/
│ │ ├── components/
│ │ │ └── RecipesSection.tsx
│ │ └── hooks/
│ │ └── useCommunityRecipes.ts
│ └── shared/ # Shared across recipe features
│ ├── components/
│ │ └── RecipeCard.tsx
│ └── hooks/
```

**Benefits:**
- ✅ Related code lives together (colocation)
- ✅ Easy to find feature-specific code
- ✅ Clear feature boundaries
- ✅ Simple to add/remove entire features
- ✅ Better team collaboration (work on separate features)
- ✅ Improved testability
- ✅ Scales well with app growth

---

## 🎯 Feature Structure Pattern

Each feature follows this consistent pattern:
```
feature-name/
├── components/ # UI components for this feature
│ ├── FeatureComponent.tsx
│ └── FeatureModal.tsx
└── hooks/ # Business logic hooks for this feature
├── useFeatureData.ts
└── useFeatureActions.ts
```

## 🎨 Styling
### Tailwind CSS
Utility-first CSS framework
Custom configuration in tailwind.config.js
Dark theme with glass morphism effects

---

### shadcn/ui
Accessible, customizable UI components
Built on Radix UI primitives
Components in src/ui/

---

### Material-UI
Icon library (@mui/icons-material)
Used for specific icons

---

### Global Styles
Custom CSS in src/styles/global.css
CSS variables for theming

---

## 📧 Contact

For questions or feedback, please contact:

- **LinkedIn** - [My Profile](https://www.linkedin.com/in/alexandra-tsimentarova-41a5b9274/)
- **Project Repository** - [GitHub](https://github.com/AllexandraWEB/Nurish)

---

Thank you for checking out the Nurish recipe sharing platform! We hope you enjoy exploring and sharing delicious recipes.