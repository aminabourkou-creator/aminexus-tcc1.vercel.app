# 🚀 Nexora Studio

**Private real-time collaboration rooms with AI, chat, tasks and voice.**

A modern, production-ready Progressive Web App (PWA) built with Firebase, WebRTC, and Google Gemini API. Deploy to Vercel in minutes.

---

## ✨ Features

### Core Collaboration
- **🎯 Private Rooms** — Create and manage secure collaboration spaces
- **💬 Real-time Chat** — Instant messaging with file uploads
- **📋 Tasks** — Track and manage room tasks
- **🎨 Whiteboard** — Collaborative drawing canvas
- **☎️ Voice Chat** — WebRTC peer-to-peer audio

### User Experience
- **👥 Friends System** — Add friends and see online status
- **💌 Direct Messages** — Private conversations
- **🤖 AI Assistant** — Google Gemini integration (@Nexora)
- **📱 PWA Ready** — Install as native app on iOS/Android
- **🌙 Dark Luxury Theme** — Gold accent, Playfair typography
- **⚡ Offline Support** — Service worker caching

### Security & Privacy
- ✅ GDPR-compliant privacy policy
- ✅ Firestore security rules (member-only access)
- ✅ Firebase Authentication (email/password + Google)
- ✅ Terms of Service included
- ✅ Rate limiting on AI calls

---

## 📋 File Structure

```
nexora-studio/
├── index.html              # Main PWA app
├── privacy.html            # Privacy Policy
├── tos.html               # Terms of Service
├── manifest.json          # PWA manifest
├── sw.js                  # Service Worker
├── vercel.json            # Vercel config
├── firestore.rules        # Security rules
├── .env.local             # Environment variables
├── package.json           # Dependencies
├── DEPLOYMENT_GUIDE.md    # Full guide
├── QUICK_START.md         # Quick start
├── api/
│   └── ai.js             # Gemini API proxy
└── icons/
    ├── icon-72.png through icon-512.png
```

---

## 🚀 Quick Start

### 1. Firebase Setup
```bash
# Create project at https://console.firebase.google.com
# Enable: Authentication + Firestore + Storage
# Copy config to .env.local
```

### 2. Get Gemini API Key
```bash
# https://aistudio.google.com/app/apikeys
# Create API key
```

### 3. Deploy to Vercel
```bash
npm install -g vercel
vercel
# Add GEMINI_API_KEY environment variable
```

### 4. Configure
- Update Firebase config in index.html
- Deploy Firestore rules: `firebase deploy --only firestore:rules`

---

## 📖 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** — Full deployment guide
- **[QUICK_START.md](./QUICK_START.md)** — 5-minute setup
- **[Privacy Policy](./privacy.html)** — GDPR compliant
- **[Terms of Service](./tos.html)** — Legal terms

---

## 💰 Free Tier Coverage

| Service | Free | Pricing |
|---------|------|---------|
| Firebase Firestore | 50k reads/day | $0 |
| Gemini API | 15k requests/day | $0 |
| Vercel | 100GB bandwidth | $0 |

---

## 🧪 Testing

```bash
npm run dev          # Local server
npm run test:lighthouse  # PWA audit
```

**Test Checklist:**
- [ ] Email signup
- [ ] Google Sign-In
- [ ] Create room
- [ ] Chat/files
- [ ] Voice chat
- [ ] AI assistant
- [ ] PWA install

---

## 🔒 Security

- Firestore rules: members-only access
- API key server-side only
- Rate limiting: 30 req/min per IP
- Firebase Auth for passwords

---

## 🚀 Deploy

```bash
vercel --prod
```

---

## 📱 Install as App

**iOS:** Safari → Share → Add to Home Screen
**Android:** Chrome → Menu → Install app

---

## 🔗 Links

- **Creator:** [Yamina Bourkou](https://aminainfo.com)
- **GitHub:** [aminabourkou-creator/nexora](https://github.com/aminabourkou-creator/nexora)
- **Firebase:** https://console.firebase.google.com
- **Vercel:** https://vercel.com

---

## 📄 License

**Nexora Studio** © 2026 aminainfo — All rights reserved

Uses: Firebase, Google Gemini API, Vercel

---

**Made with ❤️ — Ready to launch!** 🎉
