# 🌐 CollabVerse

**CollabVerse** is a collaborative virtual platform where users can connect, interact, and collaborate in real time. It brings together shared rooms, live communication, and immersive experiences to create a dynamic digital space for teamwork and creativity.

Users can create or join rooms, interact with others through chat and movement, customize avatars, and collaborate seamlessly in a shared environment. CollabVerse is designed to be scalable, interactive, and developer-friendly, making it ideal for hackathons, collaborative projects, and real-time applications.

🚀 Built with modern web technologies, CollabVerse focuses on real-time interaction, smooth user experience, and a flexible architecture for future expansion.

**Status:** 🚧 In Development 

**Goal:** Real-time collaboration, multiplayer interaction, and immersive shared spaces

---

## 🛠 Tech Stack

### Frontend

* React + Vite
* Clerk (Authentication)

### Backend

* **Motia** (REST APIs, database handling, streams)
* **Colyseus** (Multiplayer game server)
* MongoDB (Offline / Local)

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository

```bash
https://github.com/unknowdeepanshu/collabVerse.git
cd collabVerse
```

---

---

### ⚠️ Redis Required

Motia **requires a running Redis server** to work properly.
Since this project uses:

```bash
npx motia@latest create my-app --skip-redis
```

Redis must be **installed and started manually** before running the Motia server.

Motia will not start if Redis is not running.

---

## 📦 Install Dependencies

Run this command in **all three folders** (frontend, motia backend, colyseus server):

```bash
npm install
```

---

## ▶️ Running the Project

### 🔹 Frontend

```bash
npm run dev
```

Runs on:
`http://localhost:5173`

---

### 🔹 Colyseus Server

```bash
npm run start
```

Runs on:
`http://localhost:2567`

---

### 🔹 Motia Server

```bash
npm run start
```

Runs on:
`http://localhost:3000`

---

## 🔐 Environment Variables

### 📁 Frontend (`frontend/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=your_own_clerk_key
VITE_MOTIA_WEB=ws://localhost:3000
VITE_COLYSEUS=http://localhost:2567
```

---

### 📁 Colyseus Server (`colyseus/.env`)

```env
FRONTEND_URL=http://localhost:5173
MOTIA_API_URL=http://localhost:3000
```

---

### 📁 Motia Server (`motia/.env`)

```env
MONGO_URL=mongodb://127.0.0.1:27017/collabVerse
COLYSEUS_API_URL=http://localhost:2567
```

---

## 🧩 Architecture Overview

* **Frontend** handles UI, user interaction, and authentication via Clerk
* **Motia** manages REST APIs, MongoDB operations, and real-time streams
* **Colyseus** handles multiplayer rooms, player movement, and game logic
* All services communicate via HTTP/WebSocket locally

---

## ✨ Features

* User authentication (Clerk)
* Room creation & joining
* Multiplayer movement (Colyseus)
* Global & proximity-based chat
* Avatar customization
* Real-time collaboration

---

