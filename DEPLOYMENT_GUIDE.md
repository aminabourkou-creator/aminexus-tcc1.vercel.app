# 🚀 Nexora Studio — Deployment & Setup Guide

## Pre-Launch Checklist

### 1. **Firebase Setup**
- [ ] Create Firebase project at https://console.firebase.google.com
- [ ] Enable Authentication (Email/Password + Google Sign-In)
- [ ] Create Firestore database in **production mode**
- [ ] Enable Storage for file uploads
- [ ] Copy credentials to `.env.local`

### 2. **Gemini API Setup**
- [ ] Go to https://aistudio.google.com/app/apikeys
- [ ] Create API key
- [ ] Enable Generative Language API in Google Cloud Console
- [ ] Add key to `.env.local` and Vercel environment

### 3. **File Structure**
```
nexora-studio/
├── index.html
├── privacy.html
├── tos.html
├── manifest.json
├── sw.js
├── vercel.json
├── firestore.rules
├── .env.local
├── .gitignore
├── api/
│   └── ai.js
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

## Step-by-Step Deployment

### Step 1: Prepare Firebase
```bash
# 1. Go to Firebase Console
# 2. Create new project "Nexora Studio"
# 3. Enable Authentication:
#    - Email/Password
#    - Google Sign-In (add your domain)
# 4. Create Firestore Database (production mode)
# 5. Go to Project Settings → Service Accounts
# 6. Copy these values to .env.local:
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
VITE_FIREBASE_MEASUREMENT_ID=xxx
```

### Step 2: Deploy Firestore Rules
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Select your project
firebase use your-project-id

# Deploy security rules
firebase deploy --only firestore:rules
```

### Step 3: Deploy to Vercel
```bash
# Option A: Via CLI
npm install -g vercel
vercel

# Follow prompts, link to your project

# Option B: Via Web
# 1. Go to https://vercel.com/new
# 2. Import your GitHub repository
# 3. Add environment variable:
#    GEMINI_API_KEY=your-key-here
# 4. Deploy
```

### Step 4: Add Environment Variables to Vercel
```
Dashboard → Settings → Environment Variables

Add:
- GEMINI_API_KEY=your-api-key
```

### Step 5: Configure Firebase Authentication
In Firebase Console → Authentication → Settings:
- Add your Vercel domain to authorized domains
- Example: `nexora-studio.vercel.app`

### Step 6: Update index.html Firebase Config
Replace the Firebase config in `index.html` with your actual values:

```javascript
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
});
```

---

## Testing Before Launch

### Local Testing
```bash
# 1. Install local server
npm install -g http-server

# 2. Run from project directory
http-server -p 8000

# 3. Open http://localhost:8000
```

### Mobile Testing
- **iOS**: Use Safari to add to Home Screen (Web App)
- **Android**: Chrome → Menu → "Add to Home screen"

### Test Checklist
- [ ] Email signup works
- [ ] Google Sign-In works
- [ ] Create room + invite friend
- [ ] Send chat messages
- [ ] Upload files
- [ ] Voice chat (test with 2 devices)
- [ ] AI assistant responds
- [ ] PWA installs correctly
- [ ] Offline handling works
- [ ] Rate limiting doesn't trigger (test <30 msgs/min)

---

## Environment Variables Reference

### Development (.env.local)
```
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-storage
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement
VITE_APP_URL=http://localhost:5173
GEMINI_API_KEY=your-gemini-key
VITE_API_ENDPOINT=http://localhost:5173/api/ai
```

### Production (Vercel)
```
GEMINI_API_KEY=your-gemini-key
(Firebase config is in index.html)
```

---

## Monitoring & Maintenance

### 1. **Error Tracking**
Add Sentry integration:
```javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://your-sentry-dsn@sentry.io/123",
  environment: "production"
});
```

### 2. **Analytics**
- Firebase Console → Analytics (enabled by default)
- Track: user signups, room creation, voice calls, AI usage

### 3. **Gemini API Costs**
- Free tier: ~15,000 requests/day
- Monitor usage: Google Cloud Console → APIs & Services
- Set billing alerts to avoid surprises

### 4. **Firebase Quotas**
- Firestore: 50,000 reads/day (free)
- Realtime calls limited by index usage
- Set up alerts in Firestore quota settings

---

## Domain Configuration (Optional)

### Connect Custom Domain to Vercel
1. Go to Vercel Dashboard → Project → Domains
2. Add your domain (e.g., `nexora.aminainfo.com`)
3. Update DNS records at your registrar
4. Vercel provides CNAME/A records to add

### Update Firebase Authorized Domains
In Firebase Console → Authentication → Settings:
- Add your custom domain
- Keep `nexora-studio.vercel.app` as backup

---

## Troubleshooting

### "GEMINI_API_KEY not found"
- Check Vercel Environment Variables
- Restart deployment after adding key
- Verify key is valid at https://aistudio.google.com/app/apikeys

### "Too many requests" error
- Rate limit is 30 msgs/min per IP
- Wait 1 minute before retrying
- Adjust in `api/ai.js` if needed

### PWA not installing
- Check `manifest.json` is served with correct Content-Type
- Verify icons exist at correct paths (`icons/icon-192.png`, etc.)
- Use Lighthouse to audit PWA compliance

### Firestore rules deny access
- Re-deploy rules: `firebase deploy --only firestore:rules`
- Check user is authenticated
- Verify user is in room members collection

### Voice chat not working
- Check browser has microphone permissions
- Ensure WebRTC signaling works (check browser console)
- Test on different network (WiFi vs cellular)
- Firefox may need configuration for WebRTC

---

## Support & Contact

**Website:** https://aminainfo.com  
**Email:** via contact form at aminainfo.com  
**GitHub:** https://github.com/aminabourkou-creator/nexora

---

## License & Attribution

Nexora Studio © 2026 aminainfo — Yamina Bourkou  
Uses: Firebase, Google Gemini API, Vercel, WebRTC

All rights reserved.
