# ✅ Nexora Studio — Pre-Launch Checklist

Complete this checklist before deploying to production.

---

## 🔧 Setup & Configuration

- [ ] **Firebase Project Created**
  - [ ] Project name: "Nexora Studio"
  - [ ] Region: closest to your users
  - [ ] Billing account connected (optional, free tier sufficient)

- [ ] **Firebase Services Enabled**
  - [ ] Authentication (Email/Password)
  - [ ] Authentication (Google Sign-In)
  - [ ] Firestore Database
  - [ ] Cloud Storage
  - [ ] (Optional) Cloud Functions

- [ ] **Firebase Configuration Updated**
  - [ ] Copy Web SDK config
  - [ ] Update Firebase initialization in `index.html`
  - [ ] Test: Try signup in local dev

- [ ] **Gemini API Setup**
  - [ ] Google Cloud project created
  - [ ] Generative Language API enabled
  - [ ] API key created at https://aistudio.google.com/app/apikeys
  - [ ] API key added to `.env.local`

- [ ] **Firestore Security Rules Deployed**
  ```bash
  firebase deploy --only firestore:rules
  ```
  - [ ] Rules deployed successfully
  - [ ] Tested: room members can read messages
  - [ ] Tested: non-members cannot read

- [ ] **Environment Variables Configured**
  - [ ] `.env.local` created with all Firebase values
  - [ ] `.env.local` added to `.gitignore`
  - [ ] Vercel environment variables set (GEMINI_API_KEY only)
  - [ ] No sensitive data in version control

---

## 🧪 Testing

### Local Testing
- [ ] `npm run dev` starts without errors
- [ ] App loads in browser (http://localhost:8000)
- [ ] Page performance acceptable (load < 3s)

### Authentication
- [ ] Email signup works
- [ ] Email login works
- [ ] Google Sign-In works
- [ ] Password reset flow works
- [ ] Logout clears session

### Core Features
- [ ] Create room works
- [ ] Send chat message works
- [ ] Receive message in real-time (open 2 windows)
- [ ] Upload file works
- [ ] Delete message works
- [ ] Create task works
- [ ] Mark task complete works

### Voice & Media
- [ ] Microphone permission prompt appears
- [ ] Voice call connects (test with 2 devices)
- [ ] Audio quality acceptable
- [ ] Call disconnects cleanly

### AI Assistant
- [ ] Type "@Nexora hello" in chat
- [ ] Gemini responds within 5 seconds
- [ ] Response is relevant
- [ ] Rate limiting works (30 msgs/min)

### Mobile Testing
- [ ] iOS Safari: app loads, functions work
- [ ] Android Chrome: app loads, functions work
- [ ] Responsive design works on all sizes
- [ ] Touch events respond properly
- [ ] Microphone access on mobile works

### PWA Features
- [ ] Manifest.json loads (DevTools > Application > Manifest)
- [ ] Service worker registered (DevTools > Application > SW)
- [ ] Icons appear in install prompt
- [ ] App installable on iPhone (Add to Home Screen)
- [ ] App installable on Android (Install app prompt)
- [ ] Installed app works offline (reads cached messages)

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS 14+)
- [ ] Chrome Mobile (Android 8+)

---

## 🚀 Deployment Preparation

- [ ] **Code Review**
  - [ ] No console errors
  - [ ] No commented-out code
  - [ ] API endpoints correct
  - [ ] No hardcoded secrets

- [ ] **Performance**
  - [ ] Lighthouse score > 80
  - [ ] First Contentful Paint < 2s
  - [ ] Largest Contentful Paint < 3s
  - [ ] Cumulative Layout Shift < 0.1

- [ ] **Security**
  - [ ] HTTPS enforced
  - [ ] CORS headers correct
  - [ ] CSP headers set (optional)
  - [ ] No XSS vulnerabilities
  - [ ] Firebase rules reviewed

- [ ] **Content**
  - [ ] Privacy Policy complete and accurate
  - [ ] Terms of Service complete
  - [ ] Links to policies in app UI
  - [ ] Contact info in policies
  - [ ] Data controller info correct

- [ ] **Configuration**
  - [ ] Vercel project created
  - [ ] GitHub repo connected (if using Vercel GitHub)
  - [ ] Vercel environment variables set
  - [ ] Custom domain configured (if applicable)
  - [ ] Domain added to Firebase authorized domains

---

## 🌍 Deployment to Vercel

- [ ] **Pre-Deployment**
  - [ ] All code committed to git
  - [ ] No uncommitted changes
  - [ ] Branch is "main"

- [ ] **Deploy**
  ```bash
  vercel --prod
  ```
  - [ ] Deployment successful
  - [ ] Deployment URL noted
  - [ ] SSL certificate valid

- [ ] **Post-Deployment**
  - [ ] Visit deployment URL in browser
  - [ ] All pages load
  - [ ] Signup/login works
  - [ ] Chat works
  - [ ] AI assistant works
  - [ ] PWA still installable

- [ ] **Firebase Configuration**
  - [ ] Add Vercel domain to Firebase authorized domains
    - Go to Firebase Console > Authentication > Settings
    - Add your Vercel domain (e.g., `nexora-studio.vercel.app`)

- [ ] **Custom Domain (Optional)**
  - [ ] Domain registered
  - [ ] DNS records updated
  - [ ] Domain connected to Vercel
  - [ ] SSL certificate provisioned
  - [ ] Domain added to Firebase authorized domains

---

## 📊 Monitoring Setup

- [ ] **Vercel Analytics**
  - [ ] Visit https://vercel.com/dashboard
  - [ ] Monitor deployments
  - [ ] Check performance metrics
  - [ ] Set up alerts (optional)

- [ ] **Firebase Console**
  - [ ] Monitor Firestore usage
  - [ ] Check authentication logs
  - [ ] Monitor storage usage
  - [ ] Set up billing alerts

- [ ] **Error Tracking (Optional)**
  - [ ] Sentry account created (optional)
  - [ ] Sentry DSN added to app (optional)
  - [ ] Error reporting tested

---

## 📱 App Store Preparation (Optional)

### Google Play Store
- [ ] Create Google Play Developer account ($25)
- [ ] Create app listing
- [ ] Prepare app screenshots
- [ ] Prepare description & privacy policy links
- [ ] Generate signed APK/AAB
- [ ] Submit for review

### Apple App Store
- [ ] Create Apple Developer account ($99/year)
- [ ] Create app listing
- [ ] Prepare screenshots
- [ ] Configure signing certificates
- [ ] Submit build to TestFlight
- [ ] Submit for review (5-7 days)

---

## 📢 Launch Announcement

- [ ] **Social Media**
  - [ ] Twitter/X post
  - [ ] LinkedIn post
  - [ ] Instagram story (optional)
  - [ ] Email newsletter (optional)

- [ ] **Documentation**
  - [ ] README complete
  - [ ] Docs published
  - [ ] Tutorial videos (optional)

- [ ] **Support**
  - [ ] Support email configured
  - [ ] Help page created (optional)
  - [ ] FAQ written (optional)

---

## 🎯 Post-Launch Monitoring (First 7 Days)

- [ ] Check error logs daily
- [ ] Monitor API usage
- [ ] Check for 4xx/5xx errors
- [ ] Monitor database reads/writes
- [ ] Respond to user feedback
- [ ] Fix critical bugs immediately
- [ ] Document any issues

---

## ✨ Final Sign-Off

- [ ] All checklist items completed
- [ ] App ready for production
- [ ] Team notified
- [ ] Backup taken
- [ ] Launch time confirmed

---

**Status:** ⚪ Not Started | 🟡 In Progress | 🟢 Complete

**Completion Date:** ______________

**Sign-Off:** ______________

---

**Nexora Studio Launch Ready!** 🚀
