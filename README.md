<div align="center">

```
███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗
████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝
██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗
██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║
██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║
╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

### A Professional Networking Platform — Built from Scratch

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-2563EB?style=for-the-badge)](https://nexus-ly76pli9r-grchetans-projects.vercel.app/)
[![Made by Chetan](https://img.shields.io/badge/Made_by-Chetan_Prajapat-06B6D4?style=for-the-badge&logo=github)](https://github.com/grchetan)
[![License MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](./LICENSE)

<br/>

![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT_Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)

</div>

---

## 💡 Why I Built This

> *"The best way to learn full-stack development is not to follow tutorials — it's to build something real, break it, fix it, and ship it."*

I built **Nexus** because I wanted a project that wasn't just a single page or a single feature — but a **complete, production-ready product** I could genuinely be proud of.

My goals going in:

- Write **everything myself** — frontend to backend, no shortcuts
- Build a **real authentication system** using JWT that survives browser refreshes
- Practice **file uploads, database modeling, and REST API design** all in one project
- Create something that looks and feels genuinely **professional**

Nexus is inspired by LinkedIn — but every single line of code is my own.

---

## 🚀 What is Nexus?

**Nexus is a full-stack professional networking platform** where users can:

| Feature | What you can do |
|---|---|
| 🔐 Auth | Create an account and log in — session stays active even after page refresh |
| 👤 Profile | Upload your photo, cover image, add skills and work experience |
| 📝 Feed | Share posts — with text, images, or videos |
| ❤️ Like & Comment | React to other people's posts |
| 💬 Messages | Chat with your connections in real time |
| 🤝 Connect | Send and accept connection requests |
| 🔔 Notifications | Get alerts for likes, connections, and job matches |
| 💼 Jobs | Browse job listings and apply directly |
| 🔍 Search | Find any user by name |
| 📱 Mobile Ready | Works perfectly on both phones and desktops |

---

## 🧠 Tech Stack — And Why I Chose It

### Frontend
```
React 18     →  Component-based UI — makes the app modular and maintainable
Vite         →  Lightning-fast build tool with instant hot reload in development
Context API  →  Global state management (user session, notifications, page routing)
CSS Variables → Consistent design system — theming without any extra library
```

### Backend
```
Node.js + Express  →  Lightweight REST API server — fast and flexible
MongoDB + Mongoose →  Document-based database — flexible schema for evolving data
JWT                →  Token-based auth — stateless, secure, survives page refreshes
Multer             →  Handles photo and video file uploads on the server
Bcryptjs           →  Password hashing — plain text passwords are never stored
Nodemon            →  Auto-restarts the server on every file save during development
```

### Why the MERN Stack?

1. **One language everywhere** — JavaScript on both frontend and backend
2. **MongoDB's flexible schema** keeps the codebase clean as the app evolves
3. **React + Vite** is the fastest developer experience available in 2024
4. **MERN developers are in high demand** across the industry

---

## 📁 Project Structure

```
nexus-app/
│
├── 📄 package.json          ← Root config: runs frontend and backend together
├── 📄 .gitignore
├── 📄 README.md
│
├── 📁 backend/              ← Server — all API logic and database work lives here
│   ├── server.js            ← Entry point — Express server starts here
│   ├── .env                 ← Secret keys — NEVER push this to GitHub
│   ├── .env.example         ← Shows other developers which keys they need
│   │
│   ├── config/
│   │   └── db.js            ← MongoDB connection setup
│   │
│   ├── models/              ← Database schemas
│   │   ├── User.js          ← Defines what a user looks like in the database
│   │   └── Post.js          ← Defines what a post looks like in the database
│   │
│   ├── middleware/
│   │   ├── auth.js          ← Protects routes — verifies the user is logged in
│   │   └── upload.js        ← Multer config for handling file uploads
│   │
│   ├── routes/
│   │   ├── auth.js          ← /api/auth  →  Signup, Login, Me
│   │   ├── users.js         ← /api/users →  Profile, Avatar, Connect, Search
│   │   └── posts.js         ← /api/posts →  Feed, Create, Like, Comment, Delete
│   │
│   └── uploads/             ← Uploaded files are stored here
│       ├── avatars/         ← Profile photos
│       ├── covers/          ← Cover photos
│       └── posts/           ← Post images and videos
│
└── 📁 frontend/             ← Client — everything the user sees in the browser
    ├── index.html
    ├── vite.config.js       ← Vite config with API proxy to the backend
    │
    └── src/
        ├── App.jsx          ← Root component — decides which page to render
        ├── main.jsx         ← React app mounts here
        ├── index.css        ← All styles — design system via CSS variables
        │
        ├── context/
        │   └── AppContext.jsx   ← Global state: user, toasts, current page
        │
        ├── services/
        │   └── api.js           ← All API calls in one place — clean and organized
        │
        └── components/
            ├── Auth/            ← Login and Signup screens
            ├── Navbar/          ← Top navigation bar
            ├── MobileNav/       ← Bottom navigation bar for mobile
            ├── Feed/            ← Home feed — posts, stories, create post
            ├── Profile/         ← User profile page
            ├── Messages/        ← Chat window and conversation list
            ├── Notifications/   ← Alerts and activity feed
            ├── Jobs/            ← Job listings and apply flow
            └── common/          ← Reusable pieces: Avatar, Toast, Modal, Button...
```

---

## ⚙️ Running It Locally — Step by Step

### Prerequisites

- [Node.js v18+](https://nodejs.org)
- [MongoDB Community](https://mongodb.com/try/download/community)
- [Git](https://git-scm.com)

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/nexus-app.git
cd nexus-app
```

---

### Step 2 — Create the backend `.env` file

Navigate into the `backend/` folder and create a file named `.env`, then paste this:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexus_db
JWT_SECRET=any_long_random_string_you_choose
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

> ⚠️ Never push your `.env` file to GitHub — it contains your secret keys.

---

### Step 3 — Install all dependencies

```bash
# Root
npm install

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

---

### Step 4 — Start MongoDB

```bash
mongod
```

---

### Step 5 — Start the app (2 terminals)

```bash
# Terminal 1 — Backend
cd backend
npm run dev
```

```bash
# Terminal 2 — Frontend
cd frontend
npm run dev
```

---

### ✅ You're all set! Open these in your browser:

| | URL |
|---|---|
| 🌐 App | `http://localhost:5173` |
| 🔧 API | `http://localhost:5000` |
| ❤️ Health Check | `http://localhost:5000/api/health` |

> 💡 **Live reload is already configured.** Save any file in `backend/` and the server restarts automatically. Save any file in `frontend/` and the browser updates instantly — no manual restarts needed.

---

## 📡 API Reference

### 🔐 Auth Routes

| Method | Endpoint | What it does |
|---|---|---|
| `POST` | `/api/auth/signup` | Creates a new user account |
| `POST` | `/api/auth/login` | Logs in and returns a JWT token |
| `GET` | `/api/auth/me` | Returns the currently logged-in user's data |

### 👤 User Routes

| Method | Endpoint | What it does |
|---|---|---|
| `GET` | `/api/users/suggestions` | Returns "People you may know" list |
| `GET` | `/api/users/search?q=name` | Searches users by name |
| `GET` | `/api/users/:id` | Returns any user's public profile |
| `PUT` | `/api/users/profile` | Updates your own profile |
| `POST` | `/api/users/avatar` | Uploads a profile photo |
| `POST` | `/api/users/cover` | Uploads a cover photo |
| `POST` | `/api/users/:id/connect` | Sends or cancels a connection request |

### 📝 Post Routes

| Method | Endpoint | What it does |
|---|---|---|
| `GET` | `/api/posts/feed` | Returns all posts for the home feed |
| `POST` | `/api/posts` | Creates a new post |
| `PUT` | `/api/posts/:id/like` | Toggles like on a post |
| `POST` | `/api/posts/:id/comment` | Adds a comment to a post |
| `DELETE` | `/api/posts/:id` | Deletes your own post |

---

## 🌍 Deploy for Free

| Service | Platform | Link |
|---|---|---|
| Database | MongoDB Atlas | [mongodb.com/atlas](https://mongodb.com/atlas) |
| Backend | Render | [render.com](https://render.com) |
| Frontend | Vercel | [vercel.com](https://vercel.com) |

**Quick deployment steps:**
1. **MongoDB Atlas** → Create a free cluster → Copy the connection string → use it as `MONGO_URI`
2. **Render** → Connect your GitHub repo → Set root directory to `backend` → Add all environment variables
3. **Vercel** → Connect your GitHub repo → Set root directory to `frontend` → Deploy

---

## 🔒 Environment Variables Explained

| Variable | What it is | Example |
|---|---|---|
| `PORT` | The port your server runs on | `5000` |
| `MONGO_URI` | Your MongoDB connection address | `mongodb://localhost:27017/nexus_db` |
| `JWT_SECRET` | Secret key used to sign authentication tokens | `any_long_random_string` |
| `JWT_EXPIRES_IN` | How long a login session lasts | `7d` |
| `CLIENT_URL` | Your frontend URL — used for CORS configuration | `http://localhost:5173` |

---

## 🎯 What I Learned Building This

This project is where I stopped just reading about concepts and actually applied them:

- ✅ **JWT Authentication** — full flow from signup to protected routes
- ✅ **REST API Design** — clean endpoints with proper HTTP methods and status codes
- ✅ **MongoDB Schema Design** — modeling relationships between Users and Posts
- ✅ **File Upload Handling** — Multer with profile photos, cover images, and post media
- ✅ **React Context API** — global state management without Redux overhead
- ✅ **Component Architecture** — building reusable, readable UI components
- ✅ **CSS Design System** — consistent theming using CSS custom properties
- ✅ **Responsive Design** — mobile and desktop layouts from a single codebase
- ✅ **Error Handling** — graceful errors on both the frontend and backend

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork this repository
2. Create your branch — `git checkout -b feature/YourFeature`
3. Commit your changes — `git commit -m 'Add YourFeature'`
4. Push to the branch — `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📄 License

This project is under the **MIT License** — free to use, modify, and share.

---

<div align="center">

**Built with ❤️ by [Chetan Prajapat](https://github.com/grchetan)**


</div>
