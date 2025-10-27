# 🚀 Deployment Guide

This guide covers deploying the EduCareWay platform to production.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Backend Deployment (Railway/Render)](#backend-deployment-railway)
4. [Database Deployment (Supabase/Neon)](#database-deployment)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- ✅ All features tested locally
- ✅ Firebase project created and configured
- ✅ Database schema finalized
- ✅ Environment variables documented
- ✅ Build process tested (`npm run build`)
- ✅ API endpoints tested
- ✅ CORS configured correctly
- ✅ Static assets optimized

---

## Frontend Deployment (Vercel)

### 1. Build Frontend Locally

```bash
cd frontend
npm run build
```

Verify the build works:
```bash
npm run preview
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
npm install -g vercel
cd frontend
vercel
```

#### Option B: Using GitHub

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Import Project"
4. Select your repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3. Configure Environment Variables

In Vercel Dashboard > Project Settings > Environment Variables, add:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key
VITE_API_URL=https://your-backend-url.com/api
```

### 4. Deploy

Click "Deploy" and wait for completion.

---

## Backend Deployment (Railway)

### 1. Prepare Backend

Ensure `backend/package.json` has:

```json
{
  "scripts": {
    "start": "node server.js",
    "build": "echo 'No build step required'"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 2. Deploy to Railway

1. Go to [Railway.app](https://railway.app/)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Select the `backend` directory as root
6. Railway will auto-detect Node.js

### 3. Add PostgreSQL Database

1. In Railway project, click "New"
2. Select "Database" > "PostgreSQL"
3. Database will be provisioned automatically
4. Connection details will be available in variables

### 4. Configure Environment Variables

In Railway, add these variables:

```
NODE_ENV=production
PORT=5000
DB_HOST=${PGHOST}
DB_PORT=${PGPORT}
DB_NAME=${PGDATABASE}
DB_USER=${PGUSER}
DB_PASSWORD=${PGPASSWORD}
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key_with_newlines
FIREBASE_CLIENT_EMAIL=your_client_email
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://your-vercel-url.vercel.app
```

**Note:** Railway automatically provides PostgreSQL variables.

### 5. Deploy

Railway will automatically build and deploy.

---

## Alternative Backend Deployment (Render)

### 1. Create Account

Go to [Render.com](https://render.com/) and sign up.

### 2. Create Web Service

1. Click "New +" > "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** educareway-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free or paid

### 3. Add PostgreSQL Database

1. Click "New +" > "PostgreSQL"
2. Name it and create
3. Copy the "Internal Database URL"

### 4. Environment Variables

Add in Render dashboard:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=<your_postgres_url>
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
JWT_SECRET=...
CORS_ORIGIN=https://your-vercel-url.vercel.app
```

---

## Database Deployment

### Option 1: Railway/Render PostgreSQL

Already covered above - use the built-in database service.

### Option 2: Supabase

1. Go to [Supabase.com](https://supabase.com/)
2. Create a new project
3. Note the connection string
4. Update backend `.env` with Supabase credentials

### Option 3: Neon

1. Go to [Neon.tech](https://neon.tech/)
2. Create a new project
3. Get connection string
4. Update backend `.env`

### Running Migrations

After deployment, run:

```bash
# Connect to your production database
psql <your_production_db_url>

# Or use Railway CLI
railway run node scripts/seedData.js
```

---

## Environment Variables Summary

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | `AIza...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | `educareway` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage | `project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | `1:123:web:abc` |
| `VITE_FIREBASE_MEASUREMENT_ID` | Analytics ID | `G-ABC123` |
| `VITE_FIREBASE_VAPID_KEY` | VAPID key for push | `BN3x...` |
| `VITE_API_URL` | Backend API URL | `https://api.example.com/api` |

### Backend (Railway/Render)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `5000` |
| `DB_HOST` | Database host | `containers-us-west.railway.app` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `railway` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `password123` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `educareway` |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | `-----BEGIN PRIVATE KEY-----...` |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email | `firebase@project.iam.gserviceaccount.com` |
| `JWT_SECRET` | JWT secret key | `your_secret_key` |
| `CORS_ORIGIN` | Frontend URL | `https://educareway.vercel.app` |

---

## Post-Deployment

### 1. Update Firebase Authorized Domains

1. Go to Firebase Console > Authentication > Settings
2. Add your production domains:
   - `your-app.vercel.app`
   - Your custom domain (if any)

### 2. Test All Features

- ✅ User registration
- ✅ User login
- ✅ Dashboard loading
- ✅ Course navigation
- ✅ Subject browsing
- ✅ File downloads
- ✅ Video playback
- ✅ Reference books
- ✅ Notifications

### 3. Monitor Application

#### Railway
- View logs in Railway dashboard
- Set up error alerts

#### Vercel
- Check deployment logs
- Monitor analytics

### 4. Set Up Custom Domain (Optional)

#### Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS records

#### Railway
1. Go to Settings > Domains
2. Add custom domain
3. Update DNS

### 5. Enable HTTPS

Both Vercel and Railway provide free SSL certificates automatically.

---

## Scaling Considerations

### Database
- **Free tier:** 100MB storage, 1GB RAM
- **Upgrade:** As user base grows
- **Optimization:** Add indexes, query optimization

### Backend
- **Free tier:** Enough for development
- **Upgrade:** Increase RAM/CPU for production
- **Caching:** Add Redis for sessions

### Frontend
- **CDN:** Vercel provides global CDN
- **Image optimization:** Use Next.js Image or similar
- **Code splitting:** Already implemented with React Router

---

## Monitoring & Maintenance

### Logging

Add logging service:
- [LogRocket](https://logrocket.com/)
- [Sentry](https://sentry.io/)
- [DataDog](https://www.datadoghq.com/)

### Analytics

Track usage:
- Google Analytics (already configured via Firebase)
- Vercel Analytics
- Custom dashboard with your data

### Backups

**Database:**
```bash
# Backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup_20241027.sql
```

Set up automated backups with Railway or your hosting provider.

---

## Troubleshooting

### 502 Bad Gateway

**Cause:** Backend not responding

**Fix:**
1. Check backend logs
2. Verify environment variables
3. Ensure database is accessible
4. Check server health endpoint: `https://api.example.com/health`

### CORS Errors

**Cause:** Incorrect CORS_ORIGIN

**Fix:**
1. Update `CORS_ORIGIN` in backend
2. Redeploy backend
3. Clear browser cache

### Database Connection Errors

**Cause:** Wrong credentials or firewall

**Fix:**
1. Verify all DB_* variables
2. Check if database is running
3. Whitelist backend IP (if using external DB)

### Firebase Auth Issues

**Cause:** Domain not authorized

**Fix:**
1. Add production domain to Firebase Console
2. Check Firebase config in frontend
3. Verify API keys are correct

---

## Cost Estimates

### Free Tier (Good for development/small scale)
- **Vercel:** Free (hobby plan)
- **Railway:** $5/month (after free trial)
- **Database:** Included with Railway
- **Firebase:** Free up to limits

### Production (Recommended)
- **Vercel:** $20/month (Pro)
- **Railway:** $20-50/month (depending on usage)
- **Database:** Included or separate managed service $10-30/month
- **Firebase:** Pay as you go (typically $10-50/month)

**Total:** ~$50-150/month

---

## Rollback Plan

If deployment fails:

1. **Revert to previous version**
   - Vercel: Click "Rollback" in deployments
   - Railway: Redeploy previous commit

2. **Database rollback**
   - Restore from backup
   - Run migrations in reverse if needed

3. **Clear CDN cache**
   - Force clear Vercel cache
   - Update DNS if needed

---

## Success Metrics

Monitor these after deployment:
- Page load time < 2 seconds
- API response time < 500ms
- Uptime > 99.9%
- Error rate < 1%
- User satisfaction > 4.5/5

---

## Support

For deployment issues:
- Vercel: [docs.vercel.com](https://docs.vercel.com)
- Railway: [docs.railway.app](https://docs.railway.app)
- Firebase: [firebase.google.com/support](https://firebase.google.com/support)

---

**Deployment Complete! 🎉**

