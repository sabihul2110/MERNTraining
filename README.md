# MERN Stack Training Repository

A structured collection of HTML, CSS, JavaScript, DOM, React, and Node.js/Express exercises and projects from MERN Stack training.

## Repository Structure

```text
MERNTraining/
├── practice/                        # Core language & browser fundamentals
│   ├── html/                        # HTML lists and tables exercises
│   │   ├── list.html
│   │   └── table.html
│   ├── dom/                         # DOM selection and manipulation practice
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   └── javascript/                  # JavaScript fundamentals, async & OOP
│       ├── basics.js                # Scope, closures, loops, and functions
│       ├── callbacks.js             # Asynchronous workflows with callbacks
│       ├── promises-async-await.js  # Promises, async/await, and event loop
│       └── oop-bank-management.js   # Classes, inheritance, and polymorphism
│
├── mini-projects/                   # HTML, CSS, and Vanilla JS mini-projects
│   ├── student-registration-form/   # Semantic HTML form & course tables
│   ├── website-layout/              # Responsive page layout using CSS Grid
│   ├── weather-app/                 # Live city weather lookup (wttr.in API)
│   └── github-profile-explorer/     # GitHub user & repository search (GitHub API)
│
├── react-projects/                  # Frontend React applications
│   └── ecommerce-website/           # React + Redux Toolkit + Tailwind CSS store (Vite)
│
└── backend/                         # Node.js, Express & MongoDB backend projects
    ├── express-basics/              # Basic Express.js server setup
    └── blog-rest-api/               # Full MVC Blog REST API (Express, Mongoose, JWT Auth)
```

## Running the Projects

### 1. Practice & Mini-Projects (`practice/`, `mini-projects/`)
- Open any `index.html` file directly in a browser or via the VS Code Live Server extension.
- Run standalone JavaScript files using Node.js:
  ```bash
  node practice/javascript/oop-bank-management.js
  ```

### 2. React E-Commerce Website (`react-projects/ecommerce-website/`)
```bash
cd react-projects/ecommerce-website
npm install
npm run dev
```

### 3. Backend Projects (`backend/`)
- **Express Basics (`backend/express-basics/`)**:
  ```bash
  cd backend/express-basics
  npm install
  npm start
  ```
- **Blog REST API (`backend/blog-rest-api/`)**:
  Create a `.env` file with `PORT`, `MONGO_URI`, and `JWT_SECRET`, then run:
  ```bash
  cd backend/blog-rest-api
  npm install
  npm start
  ```
