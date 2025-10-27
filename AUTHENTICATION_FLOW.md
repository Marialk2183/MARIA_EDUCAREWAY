# 🔐 Authentication Flow Documentation

Complete authentication flow for EduCareWay platform.

## 📊 User Journey

### For New Users (Not Logged In)

```
1. User visits app (/)
   ↓
2. Automatically redirected to /login
   ↓
3. User sees login page with NMIMS branding
   ↓
4. User clicks "Sign up" link
   ↓
5. User fills signup form (name, email, SAP ID, password)
   ↓
6. Account created in Firebase + Database
   ↓
7. Automatically logged in
   ↓
8. Redirected to /dashboard
```

### For Existing Users (Login)

```
1. User visits app (/)
   ↓
2. Automatically redirected to /login
   ↓
3. User enters email + password
   ↓
4. Firebase authenticates
   ↓
5. Backend verifies user in database
   ↓
6. Redirected to /dashboard
   ↓
7. User can access all features
```

### For Logged-In Users

```
1. User visits app (/)
   ↓
2. Already authenticated
   ↓
3. Shows landing page (can access all features)
   ↓
4. Can navigate to dashboard, courses, etc.
```

## 🔒 Route Protection

### Public Routes (No Login Required)
- `/login` - Login page
- `/signup` - Signup page

### Protected Routes (Login Required)
- `/` - Landing page (redirects to /login if not authenticated)
- `/dashboard` - Main dashboard
- `/course/:courseCode` - Course semesters
- `/semester/:semesterId/subjects` - Subject list
- `/subject/:subjectId` - Subject resources
- `/subject/:subjectId/notes` - Lecture notes
- `/subject/:subjectId/videos` - Video lectures
- `/subject/:subjectId/books` - Reference books

## 🎯 Authentication States

### Loading State
```
User Status: Unknown
Display: Loading spinner
Action: Wait for Firebase to check auth status
```

### Not Authenticated
```
User Status: null
Current Page: Any protected route
Action: Redirect to /login
```

### Authenticated
```
User Status: Firebase user object + DB user data
Current Page: Any route
Action: Allow access to all features
```

## 🔄 Redirect Logic

### App.jsx Routes

```javascript
// Home route behavior
"/" → if logged in → Landing Page
"/" → if not logged in → Redirect to /login

// Login page behavior
"/login" → if logged in → Redirect to /dashboard
"/login" → if not logged in → Show login form

// Signup page behavior  
"/signup" → if logged in → Redirect to /dashboard
"/signup" → if not logged in → Show signup form

// Dashboard behavior
"/dashboard" → if logged in → Show dashboard
"/dashboard" → if not logged in → Redirect to /login

// All other protected routes
"/*" → if logged in → Show content
"/*" → if not logged in → Redirect to /login
```

## 📝 Authentication Process

### Signup Flow

1. **User fills form:**
   - Name (letters and spaces only)
   - Email (valid email format)
   - SAP ID (exactly 11 digits)
   - Password (minimum 6 characters)

2. **Frontend validation:**
   - Check all fields filled
   - Validate formats
   - Show errors if invalid

3. **Firebase creates account:**
   ```javascript
   createUserWithEmailAndPassword(auth, email, password)
   ```

4. **Update Firebase profile:**
   ```javascript
   updateProfile(user, { displayName: name })
   ```

5. **Backend stores user:**
   ```javascript
   POST /api/auth/register
   {
     firebaseUid: "...",
     name: "...",
     email: "...",
     sapid: "..."
   }
   ```

6. **Welcome notification sent** (if FCM enabled)

7. **Redirect to dashboard**

### Login Flow

1. **User enters credentials:**
   - Email
   - Password

2. **Firebase authenticates:**
   ```javascript
   signInWithEmailAndPassword(auth, email, password)
   ```

3. **Get Firebase token:**
   ```javascript
   const token = await user.getIdToken()
   ```

4. **Backend verifies:**
   - Token validated by Firebase Admin SDK
   - User retrieved from database

5. **Auth context updated:**
   - `user` = Firebase user
   - `dbUser` = Database user

6. **Redirect to dashboard**

### Logout Flow

1. **User clicks logout button**

2. **Firebase signout:**
   ```javascript
   signOut(auth)
   ```

3. **Clear auth context:**
   - `user` = null
   - `dbUser` = null

4. **Redirect to login page**

5. **Show success notification**

## 🛡️ Protected Route Component

```javascript
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? children : <Navigate to="/login" />;
};
```

**Usage:**
```javascript
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## 🔑 Token Management

### Firebase ID Token
- Generated on login
- Automatically refreshed by Firebase
- Sent with every API request
- Verified by backend

### Backend Verification
```javascript
// middleware/auth.js
const token = req.headers.authorization.split('Bearer ')[1];
const decodedToken = await admin.auth().verifyIdToken(token);
```

## 📱 Session Persistence

Firebase automatically persists sessions:
- **localStorage** (default) - Persists across tabs and browser restarts
- Automatically loads on page refresh
- User stays logged in until explicit logout

## 🔐 Security Features

### Frontend
- Protected routes with React Router
- Auth state managed by Context API
- Automatic redirects for unauthorized access
- Token included in API requests

### Backend
- Firebase Admin SDK token verification
- Middleware for protected endpoints
- Database user validation
- Role-based access control (student/admin)

## 🎨 Visual Elements

### Login Page
- NMIMS logo at top
- EduCareWay branding
- Email and password fields
- "Sign up" link for new users
- Error messages for invalid credentials

### Signup Page
- NMIMS logo at top
- EduCareWay branding
- Name, email, SAP ID, password fields
- Validation messages
- "Login" link for existing users

### Navbar (When Logged In)
- Dashboard link
- Logout button
- User info display (optional)

## 🧪 Testing Authentication

### Test Signup
1. Visit http://localhost:5173
2. Should redirect to /login
3. Click "Sign up"
4. Fill form with valid data
5. Submit
6. Should redirect to dashboard

### Test Login
1. Visit http://localhost:5173
2. Should redirect to /login
3. Enter registered credentials
4. Submit
5. Should redirect to dashboard

### Test Protected Routes
1. Logout
2. Try to visit /dashboard directly
3. Should redirect to /login
4. Login
5. Should redirect back to dashboard

### Test Session Persistence
1. Login
2. Refresh page
3. Should stay logged in
4. Close and reopen browser
5. Should still be logged in

### Test Logout
1. Click logout button
2. Should redirect to /login
3. Try accessing /dashboard
4. Should redirect to /login

## 🐛 Common Issues

### "Redirecting too many times"
**Cause:** Circular redirect logic
**Fix:** Check HomeRoute and ProtectedRoute logic

### "User stays on login after successful login"
**Cause:** Redirect not working
**Fix:** Check useEffect in Login.jsx redirects to /dashboard

### "Can access protected routes without login"
**Cause:** Missing ProtectedRoute wrapper
**Fix:** Wrap route element with ProtectedRoute

### "User data not loading"
**Cause:** Database user not fetched
**Fix:** Check AuthContext fetches from /api/auth/me

## 📊 Authentication States Diagram

```
┌─────────────────┐
│  App Loads      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Check Auth     │
│  (Firebase)     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐  ┌──────────┐
│Loading│  │Not Auth  │
└───────┘  └─────┬────┘
               │
               ▼
         ┌──────────┐
         │Redirect  │
         │to /login │
         └─────┬────┘
               │
               ▼
         ┌──────────┐
         │Login/    │
         │Signup    │
         └─────┬────┘
               │
               ▼
         ┌──────────┐
         │Success   │
         └─────┬────┘
               │
               ▼
         ┌──────────┐
         │Dashboard │
         └──────────┘
```

## 🎯 Best Practices

1. **Always check loading state** before rendering
2. **Use ProtectedRoute** for all authenticated pages
3. **Redirect after auth actions** (login, signup, logout)
4. **Show loading indicators** during auth operations
5. **Display clear error messages** for auth failures
6. **Persist sessions** using Firebase defaults
7. **Clear sensitive data** on logout

## 🔄 Future Enhancements

- [ ] Remember me option
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Social login (Google, Facebook)
- [ ] Password strength indicator
- [ ] Account settings page
- [ ] Profile picture upload

---

**Security Note:** Never store passwords in frontend. Firebase handles all password security automatically.

