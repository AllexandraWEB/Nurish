# 🌱 NURISH - Recipe Sharing Platform

A modern, full-stack recipe sharing application built with React, TypeScript, Node.js, Express, and MongoDB. Users can browse popular recipes, share their own recipes with the community, manage personal recipes, and favorite their preferred dishes.

<img width="2560" height="2040" alt="Image" src="https://github.com/user-attachments/assets/a23b50fb-e3b8-48a5-9e8d-94da76435f95" />

---
### Client Side
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

### Server Side
<p>
  <img src="https://img.shields.io/badge/Node.js-2E2E2E?style=flat&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-2E2E2E?style=flat&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-2E2E2E?style=flat&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-2E2E2E?style=flat&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-2E2E2E?style=flat&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-2E2E2E?style=flat&logo=cloudinary&logoColor=white" />
</p> 

---

### Tools & DevOps
<p>
  <img src="https://img.shields.io/badge/Git-2E2E2E?style=flat&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-2E2E2E?style=flat&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-2E2E2E?style=flat&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-2E2E2E?style=flat&logo=vercel&logoColor=white" />
</p> 

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Seeding](#-database-seeding)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Contributing](#-contributing)

---

## 🗝️ Features

### User Features
- 🔐 **Authentication & Authorization** - JWT-based secure login and registration
- 👤 **User Profiles** - Personal account management with favorites
- 📖 **Browse Recipes** - View popular and community-shared recipes
- ⭐ **Favorites System** - Save and manage favorite recipes
- 🍽️ **Recipe Management** - Create, edit, and delete personal recipes
- 🌍 **Community Recipes** - Share recipes publicly with other users
- 🔍 **Recipe Categories** - Search by breakfast, lunch, dinner, desserts, and more
- ⚡ **Quick Recipes** - Filter recipes under 30 minutes
- 📱 **Responsive Design** - Mobile-first, works on all devices

### Recipe Features
- 📝 **Detailed Information** - Ingredients, instructions, preparation time, cook time
- 🖼️ **Image Upload** - Cloudinary integration for recipe images
- 🎥 **Video Support** - Embed YouTube videos for recipes
- 🏷️ **Categorization** - 16 different recipe categories
- 🔒 **Privacy Control** - Public/private recipe visibility

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19.1.1
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 5.x
- **Routing:** React Router DOM 7.x
- **Styling:** 
  - Tailwind CSS 4.x
  - Material-UI (MUI) 7.x
  - Custom CSS with GSAP animations
- **Icons:** Lucide React, MUI Icons
- **State Management:** React Context API
- **HTTP Client:** Native Fetch API

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js 4.x
- **Database:** MongoDB with Mongoose 8.x
- **Authentication:** JWT (jsonwebtoken)
- **File Upload:** Cloudinary, Multer
- **Security:** bcryptjs for password hashing
- **CORS:** Enabled for client-server communication

### DevOps & Tools
- **Version Control:** Git
- **Package Manager:** npm
- **Development:** 
  - Nodemon (backend hot-reload)
  - Vite HMR (frontend hot-reload)
- **Linting:** ESLint
- **Deployment:** Vercel-ready configuration

---

## 📁 Project Structure

### Root Directory
```
.
├── client                  # Frontend application (React)
│   ├── public              # Public assets
│   ├── src                 # Source files
|   ├── .env                # Environment variables
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Client Documentation
├── server                  # Backend application (Node.js, Express)
│   ├── src                 # Source files
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   └── README.md           # Server Documentation
└── README.md               # Overall Project documentation
```

### Client Directory
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

### Server Directory
```
server/
├── src/ # Source code directory
│ ├── index.js # Express app entry point & server setup
│ │
│ ├── config/ # Configuration files
│ │ └── cloudinary.js # Cloudinary SDK configuration
│ │
│ ├── controllers/ # Route handlers (business logic)
│ │ ├── authController.js # Register, login, authentication
│ │ ├── favoritesController.js # Add/remove/get favorites
│ │ ├── recipeController.js # Recipe CRUD operations
│ │ └── uploadController.js # Image upload to Cloudinary
│ │
│ ├── middleware/ # Express middleware
│ │ └── auth.js # JWT authentication & authorization
│ │
│ ├── models/ # Mongoose schemas & models
│ │ ├── Recipe.js # Recipe schema with author ref
│ │ └── User.js # User schema with favorites array
│ │
│ ├── routes/ # API route definitions
│ │ ├── authRoutes.js # /api/auth/* endpoints
│ │ ├── favoritesRoutes.js # /api/favorites/* endpoints
│ │ ├── recipeRoutes.js # /api/recipes/* endpoints
│ │ └── uploadRoutes.js # /api/upload/* endpoints
│ │
│ ├── services/ # Business logic layer
│ │ └── authService.js # Authentication service functions
│ │
│ └── utils/ # Helper utilities
│ ├── seedRecipes.js # Database seeding script
│ └── tokenUtils.js # JWT token utilities
│
├── .env # Environment variables (NEVER commit!)
├── .gitignore # Git ignore rules
├── ENV.md # Environment variable documentation
├── package.json # Dependencies and npm scripts
└── README.md # Server documentation
```

---

## 🫧 Getting Started

### Prerequisites
- Node.js (18.x or later)
- npm (6.x or later)
- MongoDB Atlas account or the provided .env files

### Client Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure enviroment variables:
   - Copy the provided .env variables and create `.env` file in the root
   - If needed, you can access the .env variables from this link. (Time limited) https://drive.google.com/drive/folders/1Fn6w2tuzCwl7MY-2PjQ-xBqRpap4_8mU?usp=sharing
4. Start the development client:
   ```bash
   npm run dev
   ```

### Server Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy the provided .env variables and create `.env` file in the root
   - If needed, you can access the .env variables from this link. (Time limited) https://drive.google.com/drive/folders/1Fn6w2tuzCwl7MY-2PjQ-xBqRpap4_8mU?usp=sharing
4. Start the server:
   ```bash
   npm run dev
   ```

---

## 🌱 Environment Variables

| Variable            | Description                          |
|---------------------|--------------------------------------|
| `PORT`             | Project starting Port                |
| `CLIENT_ORIGIN`    | URL and connection to the Client     |
| `MONGODB_URI`      | MongoDB connection string            |
| `JWT_SECRET`       | JWT secret for signing tokens        |
| `CLOUDINARY_URL`   | Cloudinary URL for image uploads     |
| `CLOUDINARY_API_SECRET`   | Cloudinary API secret for image uploads     |

---

## 🌿 Database Seeding

To populate the database with initial data, run the following command:

```bash
npm run seed
```

This will add default recipes and categories to the database.

---

## 📖 API Documentation

- **Base URL:** `http://localhost:5000/api`
- **Authentication:**
  - `POST /auth/register` - Register a new user
  - `POST /auth/login` - Login an existing user
- **Users:**
  - `GET /users` - Get all users
  - `GET /users/:id` - Get a user by ID
- **Recipes:**
  - `GET /recipes` - Get all recipes
  - `GET /recipes/popular` - Get popular recipes
  - `GET /recipes/quick` - Get quick recipes
  - `GET /recipes/:id` - Get a recipe by ID
  - `POST /recipes` - Create a new recipe
  - `PUT /recipes/:id` - Update a recipe by ID
  - `DELETE /recipes/:id` - Delete a recipe by ID

---

## 🏙 Architecture

The application follows a modular architecture with separate directories for the client and server. The client is built with React and communicates with the server via RESTful APIs. The server is built with Node.js and Express, and interacts with a MongoDB database.

---

## 💫 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add your feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Create a pull request

Please ensure your code follows the project's coding standards and passes all tests.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For questions or feedback, please contact:

- **LinkedIn** - [My Profile](https://www.linkedin.com/in/alexandra-tsimentarova-41a5b9274/)
- **Project Repository** - [GitHub](https://github.com/AllexandraWEB/Nurish)

---

Thank you for checking out the Nurish recipe sharing platform! We hope you enjoy exploring and sharing delicious recipes.