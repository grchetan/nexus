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

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-2563EB?style=for-the-badge)](https://nexus-app.vercel.app)
[![Made by Chetan](https://img.shields.io/badge/Made_by-Chetan_Prajapat-06B6D4?style=for-the-badge&logo=github)](https://github.com/chetanprajapat)
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

Maine **Nexus** isliye banaya kyunki mujhe ek aisa project chahiye tha jo **sirf ek page ya ek feature** nahi — balki ek **complete, production-ready product** ho.

Mera goal tha:

- **Frontend se backend tak** — sab kuch khud likhna
- **Real authentication system** banana — JWT ke saath, jo browser refresh pe bhi kaam kare
- **File upload, database modeling, REST APIs** — sab ek hi project mein practice karna
- Ek aisi app banana jo dekh ke koi bhi kahe — *"Yeh professional lagti hai"*

Nexus LinkedIn se inspired hai — lekin har line of code mera khud ka hai.

---

## 🚀 What is Nexus?

**Nexus ek full-stack professional networking platform hai** — jisme aap:

| Feature | Kya kar sakte ho |
|---|---|
| 🔐 Auth | Account banao, login karo — session refresh karne ke baad bhi active rahega |
| 👤 Profile | Apna photo, cover, skills aur experience add karo |
| 📝 Feed | Posts share karo — text, image ya video ke saath |
| ❤️ Like & Comment | Doosron ke posts pe react karo |
| 💬 Messages | Apne connections ke saath real-time chat karo |
| 🤝 Connect | Connection requests bhejo aur accept karo |
| 🔔 Notifications | Likes, connections aur job alerts ke alerts pao |
| 💼 Jobs | Job listings dekho aur directly apply karo |
| 🔍 Search | Naam se kisi bhi user ko dhundo |
| 📱 Mobile Ready | Phone aur desktop — dono pe perfectly chalti hai |

---

## 🧠 Tech Stack — Aur Maine Yeh Kyun Chuna

### Frontend
```
React 18  →  UI banana ke liye — component-based structure ke saath
Vite      →  Fast build tool — development mein instant reload
Context API → Global state manage karna (user, page, notifications)
CSS Variables → Theming aur consistent design system
```

### Backend
```
Node.js + Express  →  REST API server banana ke liye
MongoDB + Mongoose →  Database — flexible document structure ke liye
JWT (JSON Web Token) → Secure login sessions — cookie nahi, token-based
Multer             →  Photo aur video file uploads handle karna
Bcryptjs           →  Passwords hash karna — plain text kabhi store nahi hote
Nodemon            →  Development mein auto-restart
```

### Why MERN Stack?
Maine MERN Stack isliye chuna kyunki:
1. **JavaScript — ek hi language** frontend aur backend dono mein
2. **MongoDB** ka flexible schema beginners ke liye production mein bhi clean rehta hai
3. **React + Vite** ka combination 2024 mein fastest developer experience deta hai
4. Industry mein **sabse zyada demand** MERN developers ki hai

---

## 📁 Folder Structure — Seedha aur Saaf

```
nexus-app/
│
├── 📄 package.json          ← Root: frontend + backend dono ek saath run karta hai
├── 📄 .gitignore
├── 📄 README.md
│
├── 📁 backend/              ← Server — API + Database ka poora kaam yahan hota hai
│   ├── server.js            ← Entry point — Express server yahan start hota hai
│   ├── .env                 ← Secret keys — kabhi GitHub pe mat daalna!
│   ├── .env.example         ← Doosron ko batata hai ki kaunse keys chahiye
│   │
│   ├── config/
│   │   └── db.js            ← MongoDB se connection yahan hota hai
│   │
│   ├── models/              ← Database ka structure
│   │   ├── User.js          ← User ka data kaisa dikhta hai database mein
│   │   └── Post.js          ← Post ka data kaisa dikhta hai database mein
│   │
│   ├── middleware/
│   │   ├── auth.js          ← Har protected route pe check karta hai — login hai ya nahi
│   │   └── upload.js        ← Multer config — file upload handle karta hai
│   │
│   ├── routes/
│   │   ├── auth.js          ← /api/auth → Signup, Login, Me
│   │   ├── users.js         ← /api/users → Profile, Avatar, Connect, Search
│   │   └── posts.js         ← /api/posts → Feed, Create, Like, Comment, Delete
│   │
│   └── uploads/             ← Uploaded files yahan store hoti hain
│       ├── avatars/         ← Profile photos
│       ├── covers/          ← Cover photos
│       └── posts/           ← Post images/videos
│
└── 📁 frontend/             ← Client — jo user browser mein dekhta hai
    ├── index.html
    ├── vite.config.js       ← Vite config + API proxy setup
    │
    └── src/
        ├── App.jsx          ← Root component — kaunsa page dikhana hai decide karta hai
        ├── main.jsx         ← React app yahan mount hoti hai
        ├── index.css        ← Saari CSS — CSS variables se theming
        │
        ├── context/
        │   └── AppContext.jsx   ← Global state: user, toast, current page
        │
        ├── services/
        │   └── api.js           ← Saare API calls ek jagah — clean aur organized
        │
        └── components/
            ├── Auth/            ← Login + Signup pages
            ├── Navbar/          ← Top navigation
            ├── MobileNav/       ← Bottom nav (phones ke liye)
            ├── Feed/            ← Home feed — posts + create post
            ├── Profile/         ← User profile page
            ├── Messages/        ← Chat window + conversation list
            ├── Notifications/   ← Alerts page
            ├── Jobs/            ← Job listings + apply
            └── common/          ← Reusable: Avatar, Toast, Modal, Button...
```

---

## ⚙️ Local Setup — Step by Step

### Pehle yeh install karo

- [Node.js v18+](https://nodejs.org)
- [MongoDB Community](https://mongodb.com/try/download/community)
- [Git](https://git-scm.com)

---

### Step 1 — Project clone karo

```bash
git clone https://github.com/YOUR_USERNAME/nexus-app.git
cd nexus-app
```

---

### Step 2 — Backend ka `.env` file banao

`backend/` folder ke andar jaao aur `.env` naam ki file banao:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexus_db
JWT_SECRET=koi_bhi_lamba_random_string_yahan_likhdo
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

> ⚠️ `.env` file kabhi GitHub pe push mat karo — usme secret keys hain

---

### Step 3 — Dependencies install karo

```bash
# Root mein
npm install

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

---

### Step 4 — MongoDB start karo

```bash
mongod
```

---

### Step 5 — App start karo (2 terminals)

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

### ✅ Done! Yahan open karo:

| | URL |
|---|---|
| 🌐 App | `http://localhost:5173` |
| 🔧 API | `http://localhost:5000` |
| ❤️ Health Check | `http://localhost:5000/api/health` |

> 💡 **Auto Reload on hai!** Backend mein koi bhi file save karo — server khud restart hoga. Frontend mein koi bhi change karo — browser turant update ho jaega.

---

## 📡 API Reference

### 🔐 Auth Routes

| Method | Endpoint | Kya karta hai |
|---|---|---|
| `POST` | `/api/auth/signup` | Naya account banata hai |
| `POST` | `/api/auth/login` | Login karta hai, JWT token deta hai |
| `GET` | `/api/auth/me` | Apna khud ka profile data laata hai |

### 👤 User Routes

| Method | Endpoint | Kya karta hai |
|---|---|---|
| `GET` | `/api/users/suggestions` | "People you may know" list |
| `GET` | `/api/users/search?q=naam` | Naam se user dhundta hai |
| `GET` | `/api/users/:id` | Kisi ka bhi profile data |
| `PUT` | `/api/users/profile` | Apna profile update karo |
| `POST` | `/api/users/avatar` | Profile photo upload karo |
| `POST` | `/api/users/cover` | Cover photo upload karo |
| `POST` | `/api/users/:id/connect` | Connect ya disconnect karo |

### 📝 Post Routes

| Method | Endpoint | Kya karta hai |
|---|---|---|
| `GET` | `/api/posts/feed` | Feed ke saare posts |
| `POST` | `/api/posts` | Naya post banao |
| `PUT` | `/api/posts/:id/like` | Like ya unlike karo |
| `POST` | `/api/posts/:id/comment` | Comment daalo |
| `DELETE` | `/api/posts/:id` | Apna post delete karo |

---

## 🌍 Free Mein Deploy Karo

| Kya | Kahan | Link |
|---|---|---|
| Database | MongoDB Atlas | [mongodb.com/atlas](https://mongodb.com/atlas) |
| Backend | Render | [render.com](https://render.com) |
| Frontend | Vercel | [vercel.com](https://vercel.com) |

**Quick Steps:**
1. **MongoDB Atlas** → Free cluster banao → Connection string copy karo
2. **Render** → GitHub repo connect karo → Root: `backend` → Environment variables daalo
3. **Vercel** → GitHub repo connect karo → Root: `frontend` → Deploy!

---

## 🔒 Environment Variables

| Variable | Kya hai | Example |
|---|---|---|
| `PORT` | Server kis port pe chalega | `5000` |
| `MONGO_URI` | MongoDB ka address | `mongodb://localhost:27017/nexus_db` |
| `JWT_SECRET` | Token sign karne ki secret key | `koi_bhi_lamba_string` |
| `JWT_EXPIRES_IN` | Login session kitne time tak chale | `7d` |
| `CLIENT_URL` | Frontend ka URL — CORS ke liye | `http://localhost:5173` |

---

## 🎯 Maine Kya Seekha Is Project Se

Is project ko banate time maine yeh skills actually practice mein seekhi:

- ✅ **JWT Authentication** — signup se lekar protected routes tak
- ✅ **REST API design** — clean endpoints with proper HTTP methods
- ✅ **MongoDB Schema Design** — relationships between User aur Post models
- ✅ **File Upload handling** — Multer ke saath profile aur cover photos
- ✅ **React Context API** — global state without Redux
- ✅ **Component Architecture** — reusable, readable components
- ✅ **CSS Design System** — CSS variables se consistent theming
- ✅ **Mobile Responsive Design** — phone aur desktop dono ke liye
- ✅ **Error Handling** — frontend aur backend dono mein

---

## 🤝 Contribute Karna Chahte Ho?

1. Is repo ko **Fork** karo
2. Apni branch banao: `git checkout -b feature/NayaFeature`
3. Changes karo aur commit karo: `git commit -m 'Add NayaFeature'`
4. Push karo: `git push origin feature/NayaFeature`
5. **Pull Request** kholo

---

## 📄 License

MIT License — Free to use, modify and share.

---

<div align="center">

**Built with ❤️ by [Chetan Prajapat](https://github.com/grchetan)**

*Indore, Madhya Pradesh 🇮🇳*

<br/>

*Agar yeh project helpful laga toh ek ⭐ zaroor do — bahut motivation milta hai!*

</div>
