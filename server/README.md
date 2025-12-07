# 🍳 Nurish Server - Recipe Sharing API

The backend application for Nurish, a RESTful API built with Node.js, Express, and MongoDB. Features a clean MVC architecture with JWT authentication, Cloudinary integration, and comprehensive recipe management.

**API Base URL** - [Nurish API](https://nurish-api.onrender.com) *(if deployed)*

---

## 🛠 Tech Stack

<p>
  <img src="https://img.shields.io/badge/Node.js-2E2E2E?style=flat&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-2E2E2E?style=flat&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-2E2E2E?style=flat&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-2E2E2E?style=flat&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-2E2E2E?style=flat&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-2E2E2E?style=flat&logo=cloudinary&logoColor=white" />
</p>

---

## 📖 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [MVC Architecture](#-mvc-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)

---

## ✨ Features

### API Capabilities
- 🔐 **JWT Authentication** - Secure user registration and login
- 👤 **User Management** - Profile management with favorites array
- 🍽️ **Recipe CRUD** - Complete recipe management (Create, Read, Update, Delete)
- ⭐ **Favorites System** - Add/remove recipes to user favorites
- 🖼️ **Image Upload** - Cloudinary integration for recipe images
- 🌍 **Public/Private Recipes** - Control recipe visibility
- 🏷️ **Recipe Categorization** - 16 different category types
- 📊 **Featured Recipes** - Popular and fast recipe filtering

### Technical Features
- 🏗️ **MVC Architecture** - Clean separation of concerns
- 🔒 **Security** - bcrypt password hashing, JWT tokens
- 📝 **Validation** - Mongoose schema validation
- 🌐 **CORS Enabled** - Cross-origin resource sharing
- 🗄️ **MongoDB Atlas** - Cloud database integration
- 🔄 **ES Modules** - Modern JavaScript imports
- 📦 **Database Seeding** - Pre-populate with featured recipes

---

## 📁 Project Structure

### Overview

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

## 🏗️ MVC Architecture

### What is MVC Architecture?

MVC (Model-View-Controller) is a design pattern that separates application logic into three interconnected components, promoting organized code and separation of concerns.

### Architecture Flow
```
Client Request
↓
Express Router (routes/)
↓
Middleware Layer (auth.js, validation)
↓
Controller (controllers/)
↓
Service Layer (services/) [optional]
↓
Model (models/) - Mongoose
↓
MongoDB Database
↓
Response to Client

