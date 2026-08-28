# 🚀 Nexora Studio — Quick Start

## 5-Minute Setup

### 1️⃣ Create Firebase Project
```bash
# Go to https://console.firebase.google.com
# Create new project: "Nexora Studio"
# Enable these services:
# ✅ Authentication (Email + Google)
# ✅ Firestore Database (Production mode)
# ✅ Storage (for file uploads)
```

### 2️⃣ Get API Keys

**Firebase Config:**
- Go to Project Settings (⚙️ icon)
- Copy Web SDK values
- Paste into `.env.local`:
```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
...
```

**Gemini API Key:**
- Go to https://aistudio.google.com/app/apikeys
- Create API key
- Add to `.env.local`:
```
GEMINI_API_KEY=your-key-here
```

### 3️⃣ Deploy Firestore Rules
```bash
npm install -g firebase-tools
firebase login
firebase use your-project-id
firebase deploy --only firestore:rules
```

### 4️⃣ Deploy to Vercel
```bash
# Option 1: CLI
npm install -g vercel
vercel

# Option 2: Web Dashboard
# Visit https://vercel.com/new
# Import your GitHub repo
# Add GEMINI_API_KEY environment variable
# Deploy
```

### 5️⃣ Update Firebase Authorized Domains
In Firebase Console:
- Authentication → Settings
- Add your Vercel domain (e.g., `nexora-studio.vercel.app`)

---

## File Structure
```
.
├── index.html              # Main app
├── privacy.html            # Privacy policy
├── tos.html               # Terms of service
├── manifest.json          # PWA manifest
├── sw.js                  # Service worker
├── vercel.json            # Vercel config
├── firestore.rules        # Firestore security
├── .env.local             # Your secrets (don't commit!)
├── package.json           # Dependencies
├── DEPLOYMENT_GUIDE.md    # Full guide
├── QUICK_START.md         # This file
├── api/
│   └── ai.js             # Gemini API proxy (Vercel)
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

---

## Testing Locally

```bash
# Start local server
npm run dev

# Open in browser
# http://localhost:8000
```

**Test checklist:**
- ✅ Email signup works
- ✅ Create a room
- ✅ Chat with yourself (open in 2 windows)
- ✅ Try AI assistant (@Nexora message)
- ✅ Test voice (needs 2 devices)

---

## Important!

### Before Launch
- [ ] Update Firebase config in `index.html`
- [ ] Add GEMINI_API_KEY to Vercel environment
- [ ] Deploy Firestore rules: `firebase deploy --only firestore:rules`
- [ ] Test on mobile (iOS & Android)
- [ ] Verify PWA installs correctly
- [ ] Check rate limiting (30 msgs/min)

### Security
- ✅ Never commit `.env.local` to Git
- ✅ API key only used server-side (in `api/ai.js`)
- ✅ Firestore rules restrict access to room members
- ✅ Passwords handled by Firebase Auth

### Costs
- **Firebase**: Free tier covers ~50k reads/day
- **Gemini API**: Free tier ~15k requests/day
- **Vercel**: Free tier includes 100GB bandwidth

Set up billing alerts to avoid surprises!

---

## Troubleshooting

**"Cannot find Firebase config"**
→ Update Firebase values in `index.html`

**"GEMINI_API_KEY not found"**
→ Add to Vercel Environment Variables, then re-deploy

**"PWA not installing"**
→ Check icons are in `icons/` folder, verify manifest.json

**"Too many requests"**
→ Rate limited to 30/min per IP (configurable in `api/ai.js`)

---

## Next Steps

1. **Read DEPLOYMENT_GUIDE.md** for detailed instructions
2. **Monitor costs** at Google Cloud & Vercel dashboards
3. **Set up error tracking** (optional: add Sentry)
4. **Configure custom domain** (optional)

---

## Support

📧 **Contact:** aminainfo.com  
🐙 **GitHub:** github.com/aminabourkou-creator/nexora  
📱 **Deployed at:** nexora-studio.vercel.app

---

**Ready to launch?** 🎉
```bash
npm run deploy:prod
```

Good luck! 🚀
