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
<div align="center">

![Nexus Banner](https://img.shields.io/badge/Nexus-Professional%20Network-2563eb?style=for-the-badge&logo=linkedin&logoColor=white)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

**A LinkedIn-style professional networking app built with React, Node.js and MongoDB.**

[🚀 Live Demo](#) · [🐛 Report a Bug](../../issues) · [✨ Request a Feature](../../issues)

</div>

---

## 📸 What does it look like?

| Feed                        | Profile                          | Messages              |
| --------------------------- | -------------------------------- | --------------------- |
| See posts, like and comment | Edit your profile, upload photos | Chat with connections |

---

## ✨ What can you do?

- 🔐 **Sign up & Log in** — Your session stays active even after refreshing the page
- 👤 **Profile** — Upload your profile photo, cover photo, add skills and experience
- 📝 **Posts** — Share text, images or videos — like and comment on posts
- 💬 **Messages** — Chat with your connections
- 🔔 **Notifications** — See connection requests, likes and job alerts
- 🤝 **Connect** — Send and accept connection requests
- 💼 **Jobs** — Browse job listings and apply easily
- 🔍 **Search** — Find other users by name
- 📱 **Mobile Friendly** — Works great on phones too

---

## 🛠️ Built With

### Frontend

| Tool          | What it does                        |
| ------------- | ----------------------------------- |
| React 18      | Builds the user interface           |
| Vite          | Runs the app fast with live reload  |
| Context API   | Manages app-wide data (user, pages) |
| CSS Variables | Handles all styling and themes      |

### Backend

| Tool               | What it does                              |
| ------------------ | ----------------------------------------- |
| Node.js + Express  | Handles all API requests                  |
| MongoDB + Mongoose | Stores all data in the database           |
| JWT                | Keeps users logged in securely            |
| Multer             | Handles photo and video uploads           |
| Bcryptjs           | Hashes passwords so they stay safe        |
| Nodemon            | Auto-restarts server when you save a file |

---

## 📁 Project Structure

```
nexus-app/
│
├── 📄 package.json          ← Runs both frontend and backend together
├── 📄 .gitignore            ← Tells Git which files to ignore
├── 📄 README.md
│
├── 📁 backend/              ← The server (API + Database)
│   ├── server.js            ← Starting point of the server
│   ├── .env                 ← Secret keys (never share this!)
│   ├── .env.example         ← Shows others what keys they need
│   ├── config/db.js         ← Connects to MongoDB
│   ├── models/
│   │   ├── User.js          ← What a user looks like in the database
│   │   └── Post.js          ← What a post looks like in the database
│   ├── middleware/
│   │   ├── auth.js          ← Checks if the user is logged in
│   │   └── upload.js        ← Handles file uploads
│   ├── routes/
│   │   ├── auth.js          ← Sign up and log in routes
│   │   ├── users.js         ← Profile, avatar, connect routes
│   │   └── posts.js         ← Feed, create post, like, comment routes
│   └── uploads/             ← Where uploaded photos/videos are stored
│       ├── avatars/
│       ├── covers/
│       └── posts/
│
└── 📁 frontend/             ← The app (what users see)
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx          ← Decides which page to show
        ├── main.jsx         ← Starting point of the app
        ├── index.css        ← All the styles
        ├── context/
        │   └── AppContext.jsx   ← Shared data across all pages
        ├── services/
        │   └── api.js           ← All API calls to the backend
        └── components/
            ├── Auth/            ← Login and Signup pages
            ├── Navbar/          ← Top navigation bar
            ├── MobileNav/       ← Bottom navigation for mobile
            ├── Feed/            ← Home feed with posts
            ├── Profile/         ← User profile page
            ├── Messages/        ← Chat page
            ├── Notifications/   ← Alerts and notifications
            ├── Jobs/            ← Job listings page
            └── common/          ← Small reusable pieces (Avatar, Toast...)
```

---

## 🚀 How to Run It Locally

### What you need first

- [Node.js](https://nodejs.org) version 18 or higher
- [MongoDB](https://mongodb.com/try/download/community) installed on your computer
- [Git](https://git-scm.com)

---

### Step 1 — Download the project

```bash
git clone https://github.com/YOUR_USERNAME/nexus-app.git
cd nexus-app
```

---

### Step 2 — Create the backend `.env` file

Go inside the `backend` folder and create a file named `.env`, then paste this:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexus_db
JWT_SECRET=write_any_long_random_string_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

---

### Step 3 — Install everything

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

---

### Step 4 — Start MongoDB

```bash
mongod
```

---

### Step 5 — Start the app

Open **2 terminals** and run:

```bash
# Terminal 1 — Start the backend
cd backend
npm run dev
```

```bash
# Terminal 2 — Start the frontend
cd frontend
npm run dev
```

---

### ✅ You're all set!

| What              | Where                            |
| ----------------- | -------------------------------- |
| 🌐 App (Frontend) | http://localhost:5173            |
| 🔧 API (Backend)  | http://localhost:5000            |
| ❤️ Health Check   | http://localhost:5000/api/health |

> 💡 **Live Reload is already set up!** Save any file in `backend/` → server auto restarts. Save any file in `frontend/` → browser updates instantly. No need to restart manually.

---

## 📡 API Endpoints

### Auth

| Method | URL                | What it does         |
| ------ | ------------------ | -------------------- |
| `POST` | `/api/auth/signup` | Create a new account |
| `POST` | `/api/auth/login`  | Log in               |
| `GET`  | `/api/auth/me`     | Get your own profile |

### Users

| Method | URL                        | What it does            |
| ------ | -------------------------- | ----------------------- |
| `GET`  | `/api/users/suggestions`   | Get people you may know |
| `GET`  | `/api/users/search?q=name` | Search for a user       |
| `GET`  | `/api/users/:id`           | Get someone's profile   |
| `PUT`  | `/api/users/profile`       | Update your profile     |
| `POST` | `/api/users/avatar`        | Upload profile photo    |
| `POST` | `/api/users/cover`         | Upload cover photo      |
| `POST` | `/api/users/:id/connect`   | Connect or disconnect   |

### Posts

| Method   | URL                      | What it does          |
| -------- | ------------------------ | --------------------- |
| `GET`    | `/api/posts/feed`        | Get all posts in feed |
| `POST`   | `/api/posts`             | Create a new post     |
| `PUT`    | `/api/posts/:id/like`    | Like or unlike a post |
| `POST`   | `/api/posts/:id/comment` | Add a comment         |
| `DELETE` | `/api/posts/:id`         | Delete your post      |

---

## 🌍 Deploy for Free

| What     | Where to host | Link                                           |
| -------- | ------------- | ---------------------------------------------- |
| Database | MongoDB Atlas | [mongodb.com/atlas](https://mongodb.com/atlas) |
| Backend  | Render        | [render.com](https://render.com)               |
| Frontend | Vercel        | [vercel.com](https://vercel.com)               |

### Quick Steps:

1. **MongoDB Atlas** → Create a free cluster → Copy the connection string
2. **Render** → Connect your GitHub repo → Set root to `backend` → Add environment variables
3. **Vercel** → Connect your GitHub repo → Set root to `frontend` → Deploy

---

## 🔒 Environment Variables Explained

| Variable         | What it is                          | Example                              |
| ---------------- | ----------------------------------- | ------------------------------------ |
| `PORT`           | Which port the server runs on       | `5000`                               |
| `MONGO_URI`      | Address of your MongoDB database    | `mongodb://localhost:27017/nexus_db` |
| `JWT_SECRET`     | A secret string used to sign tokens | `any_long_random_string`             |
| `JWT_EXPIRES_IN` | How long a login session lasts      | `7d`                                 |
| `CLIENT_URL`     | Your frontend URL (used for CORS)   | `http://localhost:5173`              |

> ⚠️ **Never push your `.env` file to GitHub.** It contains secret keys.

---

## 🤝 Want to Contribute?

1. Fork this repository
2. Create a new branch — `git checkout -b feature/YourFeature`
3. Make your changes and commit — `git commit -m 'Add YourFeature'`
4. Push the branch — `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📄 License

This project is under the **MIT License** — free to use, change and share.

---

<div align="center">

⭐ **If you found this useful, please give it a star!** ⭐

</div>
**Built with ❤️ by [Chetan Prajapat](https://github.com/grchetan)**



</div>
