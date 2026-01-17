# Clipboard Sync 🔗📋

Clipboard Sync is a real-time, token-based clipboard sharing web app that lets you instantly sync text across multiple devices without login or accounts.

It uses WebSockets for low-latency communication, supports QR-based pairing, and works seamlessly across desktop and mobile browsers.

---

## ✨ Features

- 🔁 Real-time clipboard sync across devices
- 🔐 Token-based sessions (no login required)
- 📱 QR code pairing for instant mobile connection
- 👥 Live device count per session
- 🟢 Connection status (connecting / connected / disconnected)
- ⏱ Debounced updates to reduce network load
- 🌐 Works across devices on the same or different networks
- 🎨 Clean UI built with Tailwind CSS

---

## 🧠 How It Works

1. A user creates a new session
2. A unique session token is generated and added to the URL
3. Devices joining the same link connect to a shared WebSocket room
4. Clipboard text updates are broadcast in real time
5. Backend tracks connected devices and notifies clients on changes

No authentication, no database, no persistence — fast and ephemeral by design.

---

## 🏗 Tech Stack

### Frontend
- Vite
- Vanilla JavaScript (ES Modules)
- Tailwind CSS
- QR Code generation (`qrcode` library)

### Backend
- Node.js
- `ws` (WebSocket server)

### Hosting
- Frontend: Netlify
- Backend: Render (Free tier, may sleep when idle)
- HTTPS + WSS enabled

---

## 📁 Project Structure

```
clipboard-sync/
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── src/
│   │   ├── js/
│   │   │   ├── app.js          # App orchestration
│   │   │   ├── ui.js           # DOM & UI logic
│   │   │   ├── socket.js       # WebSocket client
│   │   │   └── config.js       # Environment config
│   │   └── css/
│   │       └── input.css
│   └── dist/                   # Vite build output
│
└── backend/
    ├── package.json
    ├── package-lock.json
    └── src/
        └── websocket.js        # WebSocket server
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- npm

---

### Backend

```bash
cd backend
npm install
npm start
