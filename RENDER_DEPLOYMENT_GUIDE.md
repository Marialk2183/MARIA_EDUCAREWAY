# 🚀 **Deploy EduCareWay on Render - Complete Guide**

## 📋 **Deployment Overview**

You'll deploy **3 components**:

```
1. Frontend (React)  →  Render Static Site
2. Backend (Node.js) →  Render Web Service
3. Database (MySQL)  →  Railway/PlanetScale (Render doesn't have MySQL)
```

**OR** use Vercel for frontend (faster):

```
1. Frontend (React)  →  Vercel
2. Backend (Node.js) →  Render
3. Database (MySQL)  →  Railway/PlanetScale
```

---

## 🎯 **OPTION 1: Full Render Deployment (Frontend + Backend)**

### **Prerequisites:**
- ✅ GitHub repository (you have this)
- ✅ Render account (free) - [render.com](https://render.com)
- ✅ Railway account (for MySQL) - [railway.app](https://railway.app)

---

## 📦 **Step 1: Prepare Your Code**

### **1.1 Create Build Scripts**

Let me create a root-level `package.json` for Render:

**File: `package.json` (root)**
```json
{
  "name": "educareway-platform",
  "version": "1.0.0",
  "scripts": {
    "install-backend": "cd backend && npm install",
    "install-frontend": "cd frontend && npm install",
    "build-frontend": "cd frontend && npm run build",
    "start": "cd backend && npm start"
  }
}
```

### **1.2 Update Backend for Production**

Create a `render.yaml` file:

**File: `render.yaml` (root)**
```yaml
services:
  # Backend Service
  - type: web
    name: educareway-backend
    env: node
    buildCommand: npm run install-backend
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

---

## 🗄️ **Step 2: Deploy MySQL Database on Railway**

### **2.1 Sign Up for Railway**

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Provision MySQL"**
4. Railway will create a MySQL database instantly

### **2.2 Get Database Credentials**

1. Click on your **MySQL service**
2. Go to **"Variables"** tab
3. Copy these values:
   ```
   MYSQLHOST
   MYSQLPORT
   MYSQLDATABASE
   MYSQLUSER
   MYSQLPASSWORD
   ```

### **2.3 Note Your Connection String**

Railway provides a connection URL:
```
mysql://user:password@host:port/database
```

**Keep this for Step 3!**

---

## 🖥️ **Step 3: Deploy Backend on Render**

### **3.1 Create Web Service**

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your **GitHub account**
4. Select **MARIA_EDUCAREWAY** repository
5. Configure:

```
Name:           educareway-backend
Environment:    Node
Region:         Oregon (US West) or closest to you
Branch:         main
Root Directory: backend
Build Command:  npm install
Start Command:  npm start
```

### **3.2 Add Environment Variables**

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```bash
# Server
PORT=5000
NODE_ENV=production

# Database (from Railway)
DB_HOST=your-railway-host.railway.app
DB_PORT=3306
DB_NAME=railway
DB_USER=root
DB_PASSWORD=your-railway-password

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
FIREBASE_CLIENT_EMAIL=your-firebase-client-email

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# CORS
CORS_ORIGIN=https://your-frontend-url.onrender.com
```

**⚠️ IMPORTANT:** 
- For `FIREBASE_PRIVATE_KEY`, include the quotes and newlines as-is
- For `CORS_ORIGIN`, use your frontend URL (you'll get this in Step 4)

### **3.3 Deploy Backend**

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repo
   - Install dependencies
   - Start your server
3. Wait 5-10 minutes for deployment
4. You'll get a URL like: `https://educareway-backend.onrender.com`

### **3.4 Test Backend**

Visit: `https://educareway-backend.onrender.com/api/courses`

Should return: `{"courses": [...]}`

---

## 🎨 **Step 4: Deploy Frontend on Render**

### **4.1 Create Static Site**

1. Go to Render dashboard
2. Click **"New +"** → **"Static Site"**
3. Select **MARIA_EDUCAREWAY** repository
4. Configure:

```
Name:            educareway-frontend
Branch:          main
Root Directory:  frontend
Build Command:   npm install && npm run build
Publish Dir:     dist
```

### **4.2 Add Environment Variables**

Add these build-time variables:

```bash
# Backend API
VITE_API_URL=https://educareway-backend.onrender.com/api

# Firebase Client
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
VITE_FIREBASE_VAPID_KEY=your-vapid-key
```

### **4.3 Deploy Frontend**

1. Click **"Create Static Site"**
2. Render will build and deploy
3. You'll get a URL like: `https://educareway-frontend.onrender.com`

### **4.4 Update CORS in Backend**

1. Go back to **Backend service** on Render
2. Update `CORS_ORIGIN` environment variable:
   ```
   CORS_ORIGIN=https://educareway-frontend.onrender.com
   ```
3. Click **"Save Changes"**
4. Backend will restart automatically

---

## 🔧 **Step 5: Configure Database**

### **5.1 Create Tables**

You need to run migrations on the production database.

**Option A: Use Railway Shell**

1. Go to Railway dashboard
2. Click your MySQL service
3. Click **"Connect"**
4. Run your seed script remotely

**Option B: Connect Locally**

```bash
# In your backend directory
# Update .env with Railway credentials temporarily
DB_HOST=your-railway-host.railway.app
DB_PORT=3306
DB_NAME=railway
DB_USER=root
DB_PASSWORD=your-railway-password

# Run seed script
node scripts/seedData.js
```

### **5.2 Upload Notes (Optional)**

If you want to upload your existing notes:

```bash
# With Railway credentials in .env
node scripts/uploadNotes.js
node scripts/uploadSem2Sem3.js
```

---

## ✅ **Step 6: Test Everything**

### **6.1 Test Backend**

Visit: `https://educareway-backend.onrender.com/api/courses`

Should show courses list.

### **6.2 Test Frontend**

Visit: `https://educareway-frontend.onrender.com`

1. ✅ See login page
2. ✅ Create account
3. ✅ Login works
4. ✅ Dashboard loads
5. ✅ Can browse courses
6. ✅ Can view subjects
7. ✅ Can download notes

### **6.3 Test Admin Panel**

1. Make yourself admin (from local):
   ```bash
   # Connect to production DB
   DB_HOST=railway-host node scripts/makeAdmin.js your-email@example.com
   ```

2. Login to deployed app
3. See 🔐 Admin button
4. Upload a test file
5. Verify students can download it

---

## 🎯 **OPTION 2: Vercel Frontend + Render Backend (FASTER)**

### **Why Vercel for Frontend?**
- ✅ Faster builds
- ✅ Better performance
- ✅ Free tier more generous
- ✅ Automatic SSL

### **Deploy Frontend on Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import **MARIA_EDUCAREWAY**
4. Configure:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

5. Add Environment Variables (same as Render)

6. Click **"Deploy"**

7. Get URL: `https://educareway.vercel.app`

8. Update backend `CORS_ORIGIN` to Vercel URL

---

## 🔒 **Step 7: Security Checklist**

### **Backend Security:**

✅ Environment variables set correctly
✅ CORS configured for your frontend URL only
✅ JWT secret is strong and random
✅ Firebase credentials are correct
✅ Database credentials are secure

### **Frontend Security:**

✅ API URL points to deployed backend
✅ Firebase config is correct
✅ No sensitive keys in frontend code
✅ HTTPS enabled (automatic on Render/Vercel)

---

## 📊 **Step 8: Monitor Your Deployment**

### **Render Dashboard:**

- ✅ Check logs for errors
- ✅ Monitor response times
- ✅ Watch for crashes
- ✅ Set up email alerts

### **Railway Dashboard:**

- ✅ Monitor database usage
- ✅ Check connection limits
- ✅ Watch storage size

---

## 🐛 **Troubleshooting Common Issues**

### **Issue 1: Backend Won't Start**

**Error:** `Application failed to respond`

**Solutions:**
- Check `PORT` environment variable is set to `5000`
- Verify all env variables are set
- Check logs for missing dependencies
- Ensure MySQL connection is working

### **Issue 2: CORS Errors**

**Error:** `Access to fetch has been blocked by CORS policy`

**Solutions:**
- Update `CORS_ORIGIN` in backend to match frontend URL exactly
- Don't include trailing slash
- Wait for backend to restart after changing env vars

### **Issue 3: Database Connection Failed**

**Error:** `ECONNREFUSED` or `Access denied`

**Solutions:**
- Verify Railway database credentials
- Check database is running
- Test connection from local machine first
- Ensure Railway MySQL is accessible from external IPs

### **Issue 4: Firebase Auth Not Working**

**Error:** `Firebase: Error (auth/...)`

**Solutions:**
- Check all Firebase env variables are correct
- Verify Firebase project is in Blaze plan (not Spark)
- Add deployed URLs to Firebase authorized domains
- Check Firebase console for errors

### **Issue 5: Files Too Large**

**Error:** `Entity too large` or `Request timeout`

**Solutions:**
- Check Render's 50MB request limit
- Split large files into smaller units
- Consider using cloud storage for very large files
- Compress PDFs before uploading

### **Issue 6: Build Fails**

**Error:** `Build failed` or `npm ERR!`

**Solutions:**
- Check `package.json` scripts are correct
- Verify all dependencies are in `dependencies` not `devDependencies`
- Clear build cache on Render
- Check Node.js version compatibility

---

## 💰 **Pricing Overview**

### **Render (Free Tier):**
- ✅ Static Site: Free forever
- ✅ Web Service: Free (sleeps after 15 min inactivity)
- ❌ MySQL: Not available

### **Railway (Free Tier):**
- ✅ $5 free credit per month
- ✅ MySQL included
- ✅ No sleep time

### **Vercel (Free Tier):**
- ✅ 100GB bandwidth/month
- ✅ Unlimited static sites
- ✅ No sleep time

**Total Cost: $0/month** (within free tiers)

---

## 🚀 **Free Tier Limitations**

### **Render Free Tier:**
- ⚠️ Backend sleeps after 15 min inactivity (cold starts ~30 seconds)
- ✅ Frontend never sleeps
- ✅ Automatic SSL
- ✅ Custom domains

### **Railway Free Tier:**
- ✅ $5 credit/month (~500 hours)
- ⚠️ Credit resets monthly
- ✅ No sleep time

### **How to Handle Backend Sleep:**

Add a "keep-alive" service:
- [cron-job.org](https://cron-job.org) - ping your backend every 10 minutes
- This keeps it awake during active hours

---

## 📝 **Post-Deployment Checklist**

### **After Deployment:**

✅ Test all features thoroughly
✅ Create admin account
✅ Upload sample content
✅ Test file downloads
✅ Test video streaming
✅ Check mobile responsiveness
✅ Verify authentication works
✅ Test logout and re-login
✅ Check all navigation works
✅ Monitor for errors in logs
✅ Set up email alerts
✅ Document URLs and credentials
✅ Update README with live URL
✅ Share with beta testers

---

## 🔗 **Your Deployed URLs**

After deployment, you'll have:

```
Frontend:  https://educareway-frontend.onrender.com
           or
           https://educareway.vercel.app

Backend:   https://educareway-backend.onrender.com

Database:  [Railway internal URL]

Admin:     https://[frontend-url]/admin
```

---

## 🎓 **For Your Interview**

When asked about deployment:

**"I deployed my full-stack application using:**
- **Frontend on Vercel/Render** for static hosting with automatic builds from GitHub
- **Backend on Render** with Node.js/Express, handling all API requests and authentication
- **MySQL database on Railway** for production data storage
- **Firebase for authentication** and push notifications
- Set up **environment variables** for security
- Configured **CORS** for secure frontend-backend communication
- Implemented **CI/CD** with automatic deployments from GitHub commits
- The app is **fully functional** in production with all features working"

---

## 📞 **Need Help?**

**Render Docs:** [render.com/docs](https://render.com/docs)
**Railway Docs:** [docs.railway.app](https://docs.railway.app)
**Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)

---

## 🎉 **You're Ready to Deploy!**

Follow the steps above, and your app will be live on the internet! 🚀

**Estimated Time:** 1-2 hours for full deployment

**Good luck!** 🍀

