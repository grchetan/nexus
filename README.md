# 🚀 Nexus — Professional Network

Full-stack LinkedIn-style app built with **React + Node.js + MongoDB**.

## 📁 Folder Structure

```
nexus-app/
├── backend/       → Express API (Port 5000)
├── frontend/      → React + Vite (Port 5173)
├── package.json   → Root scripts
└── .gitignore
```

## ⚙️ Setup

### 1. MongoDB chalu karo
```bash
mongod
```

### 2. Backend ka .env banao
```bash
cd backend
cp .env.example .env   # ya manually banao
```

`.env` file mein ye likho:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexus_db
JWT_SECRET=apna_koi_bhi_secret_likho
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### 3. Sabka npm install karo (ek baar)
```bash
# Root folder mein (nexus-app/)
npm run install:all
```

### 4. Dono ek saath chalu karo
```bash
# Root folder mein
npm run dev
```

✅ Frontend: http://localhost:5173  
✅ Backend:  http://localhost:5000  

## 🛠️ Alag-alag chalana ho toh

```bash
# Sirf backend
npm run server

# Sirf frontend
npm run client
```

## 📡 API Endpoints

| Method | Route | Kya karta hai |
|--------|-------|---------------|
| POST | /api/auth/signup | Naya account banao |
| POST | /api/auth/login  | Login karo |
| GET  | /api/auth/me     | Apna profile lo |
| PUT  | /api/users/profile | Profile update karo |
| POST | /api/users/avatar  | Profile photo upload |
| POST | /api/users/cover   | Cover photo upload |
| GET  | /api/posts/feed    | Feed posts lo |
| POST | /api/posts         | Naya post banao |
| PUT  | /api/posts/:id/like | Like/unlike |
