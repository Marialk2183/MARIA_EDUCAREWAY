# ⚡ Quick Start Guide

Get EduCareWay up and running in minutes!

## 🎯 Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js v18+ installed
- [ ] MySQL installed and running
- [ ] Firebase account created
- [ ] Git installed

## 🚀 Step-by-Step Setup

### 1. Install Dependencies (2 minutes)

```bash
# Install all dependencies at once
npm run install-all
```

### 2. Set Up MySQL Database (1 minute)

```sql
-- Open MySQL terminal
mysql -u root -p

-- Create database
CREATE DATABASE educareway CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

**Note:** For detailed MySQL setup, see [MYSQL_SETUP.md](MYSQL_SETUP.md)

### 3. Configure Backend Environment (2 minutes)

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development

# MySQL Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=educareway
DB_USER=root
DB_PASSWORD=your_mysql_password

# Firebase Admin (from Firebase Console > Project Settings > Service Accounts)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Key_Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

# JWT Secret (any random string 32+ characters)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Frontend URL
CORS_ORIGIN=http://localhost:5173
```

### 4. Configure Frontend Environment (1 minute)

Create `frontend/.env`:

```env
# Firebase Config (from Firebase Console > Project Settings > Your Apps > Web App)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
VITE_FIREBASE_VAPID_KEY=your_vapid_key

# Backend API
VITE_API_URL=http://localhost:5000/api
```

### 5. Seed Database (1 minute)

```bash
cd backend
node scripts/seedData.js
cd ..
```

This creates:
- 3 courses (MCA, BTECH, BTECH-Int)
- Multiple semesters
- Sample subjects

### 6. Start the Application (1 minute)

```bash
# Option 1: Start everything at once (from root directory)
npm run dev

# Option 2: Start separately in two terminals
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev
```

### 7. Access the Application

Open your browser:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---

## ✅ Verify Installation

### Test Backend
```bash
curl http://localhost:5000/health
# Expected: {"status":"OK","message":"Server is running"}
```

### Test Frontend
1. Open http://localhost:5173
2. You should see the NMIMS landing page
3. Click "Signup" to create an account

---

## 🎮 First Steps

### 1. Create an Account
- Click "Signup"
- Fill in details:
  - Name: Your Name
  - Email: test@example.com
  - SAP ID: 70612400001 (11 digits)
  - Password: Test@123

### 2. Explore Dashboard
- View courses
- Browse semesters
- Click on subjects

### 3. View Resources
- Click on any subject
- Choose resource type (Notes/Videos/Books)
- Try downloading a file (if available)

---

## 🐛 Common Issues & Fixes

### Issue: Database Connection Failed

**Error:** `ECONNREFUSED` or `authentication failed`

**Fix:**
```bash
# Check if MySQL is running
# Windows:
# Open Services, find MySQL80, ensure it's running
net start MySQL80

# Mac:
brew services start mysql

# Linux:
sudo systemctl start mysql

# Verify database exists
mysql -u root -p -e "SHOW DATABASES;"
```

### Issue: Firebase Auth Not Working

**Error:** `Firebase: Error (auth/invalid-api-key)`

**Fix:**
1. Double-check your Firebase config in `frontend/.env`
2. Ensure values match exactly from Firebase Console
3. No extra quotes or spaces
4. Restart frontend server

### Issue: Port Already in Use

**Error:** `Port 5000 is already in use`

**Fix:**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Issue: Images Not Loading

**Fix:**
```bash
# Ensure images are in the correct location
ls frontend/public/assets/
# Should see: nmims.png, mca.jpeg, etc.
```

### Issue: Cannot Install Dependencies

**Fix:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 📝 Default Test Credentials

After running seed script, you can create any account. There are no pre-made accounts.

**To make a user admin:**
```sql
-- Connect to database
mysql -u root -p educareway

-- Update user role
UPDATE users SET role = 'admin' WHERE email = 'test@example.com';
EXIT;
```

---

## 🎯 Next Steps

After successful setup:

1. **Read Documentation**
   - README.md - Overview
   - SETUP_GUIDE.md - Detailed setup
   - DEPLOYMENT.md - Deploy to production

2. **Customize Content**
   - Add your own PDFs, videos, books
   - Update course information
   - Customize branding

3. **Test Features**
   - Follow TESTING_CHECKLIST.md
   - Test all user flows
   - Verify notifications work

4. **Deploy to Production**
   - Follow DEPLOYMENT.md
   - Set up hosting
   - Configure domains

---

## 🆘 Getting Help

If you're still stuck:

1. Check the error message carefully
2. Review the SETUP_GUIDE.md for detailed instructions
3. Ensure all prerequisites are met
4. Verify environment variables are set correctly
5. Check that all services are running (PostgreSQL, backend, frontend)

---

## 📊 System Requirements

### Minimum
- RAM: 4GB
- Storage: 2GB free
- CPU: Dual-core
- Internet: Required for Firebase

### Recommended
- RAM: 8GB+
- Storage: 5GB+ free
- CPU: Quad-core+
- Internet: Broadband

---

## 🎉 Success!

If you see the NMIMS landing page and can create an account, congratulations! Your setup is complete.

**What you can do now:**
- ✅ Browse courses and subjects
- ✅ Create user accounts
- ✅ Upload resources (as admin)
- ✅ Download files
- ✅ Watch videos
- ✅ View reference books

**Ready to deploy?** Check out DEPLOYMENT.md

---

## 📞 Support

Need help?
- Check documentation in the project root
- Review error messages in terminal
- Contact: Maria & Umed

**Happy Learning! 🎓**

