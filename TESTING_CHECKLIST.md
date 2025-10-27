# ✅ Testing Checklist

Complete testing guide for EduCareWay platform.

## Pre-Testing Setup

- [ ] Backend server running on `http://localhost:5000`
- [ ] Frontend server running on `http://localhost:5173`
- [ ] PostgreSQL database created and seeded
- [ ] Firebase project configured
- [ ] All environment variables set correctly

---

## 🔐 Authentication Tests

### User Registration
- [ ] Visit `/signup` page
- [ ] Fill in valid details:
  - Name: John Doe
  - Email: test@example.com
  - SAP ID: 70612400001
  - Password: Test@123
- [ ] Submit form
- [ ] Verify user redirected to dashboard
- [ ] Check browser console for errors
- [ ] Verify user created in Firebase Authentication
- [ ] Verify user created in PostgreSQL database
- [ ] Test with invalid inputs:
  - [ ] Invalid email format
  - [ ] SAP ID not 11 digits
  - [ ] Password less than 6 characters
  - [ ] Name with numbers

### User Login
- [ ] Visit `/login` page
- [ ] Enter registered credentials
- [ ] Submit form
- [ ] Verify redirected to dashboard
- [ ] Verify toast notification appears
- [ ] Test with wrong credentials
  - [ ] Wrong email
  - [ ] Wrong password
  - [ ] Verify error message displayed

### Logout
- [ ] Click logout button in navbar
- [ ] Verify redirected to home page
- [ ] Verify toast notification appears
- [ ] Try accessing `/dashboard` without login
- [ ] Verify redirected to `/login`

---

## 🏠 Landing Page Tests

- [ ] Visit `/` (home page)
- [ ] Verify NMIMS logo/branding visible
- [ ] Test image carousel:
  - [ ] Click next arrow
  - [ ] Click previous arrow
  - [ ] Verify smooth transitions
- [ ] Verify all 3 info cards display:
  - [ ] Library
  - [ ] Lab
  - [ ] Seminar Halls
- [ ] Verify course cards display:
  - [ ] MCA (clickable)
  - [ ] BTECH (coming soon)
  - [ ] BTECH-Int (coming soon)
- [ ] Click MCA card
  - [ ] Verify redirected to login if not authenticated
- [ ] Footer displays correctly:
  - [ ] Contact information
  - [ ] Social media links
  - [ ] All links work

---

## 📊 Dashboard Tests

### After Login
- [ ] Verify sidebar displays with:
  - [ ] Student name/title
  - [ ] Dashboard link
  - [ ] Home link
  - [ ] Contact link
- [ ] Verify main content area:
  - [ ] Image carousel works
  - [ ] Info cards display
  - [ ] Course cards display
- [ ] Click MCA course card
  - [ ] Verify navigates to semesters page
- [ ] Responsive design:
  - [ ] Test on mobile screen size
  - [ ] Test on tablet screen size
  - [ ] Test on desktop screen size

---

## 📚 Course Navigation Tests

### Semester Selection
- [ ] Click on MCA from dashboard
- [ ] Verify semester cards display:
  - [ ] Semester 1
  - [ ] Semester 2
  - [ ] Semester 3
- [ ] Click Semester 1
- [ ] Verify navigates to subjects page

### Subject Selection
- [ ] On subjects page, verify:
  - [ ] Breadcrumb navigation displays
  - [ ] Circular subject icons display
  - [ ] Arrows between subjects display
- [ ] Test subject icons:
  - [ ] Hover effect works (scale increase)
  - [ ] All 6 subjects display for Sem 1:
    - DSA
    - Computer Networks
    - Operating Systems
    - DBMS
    - Web Technologies
    - Java
- [ ] Click on any subject
- [ ] Verify navigates to subject layout page

### Subject Layout
- [ ] Verify 3 resource type cards display:
  - [ ] Lecture Notes
  - [ ] Videos
  - [ ] Reference Books
- [ ] Hover effects work on cards
- [ ] Navigation bar at top displays
- [ ] Click each resource type
- [ ] Verify navigation works

---

## 📄 Resource Tests

### Lecture Notes
- [ ] Navigate to Notes page
- [ ] Verify header displays with subject name
- [ ] Home icon links back to dashboard
- [ ] If notes exist:
  - [ ] Unit cards display correctly
  - [ ] Download buttons appear for each note
  - [ ] Click download button
  - [ ] Verify file downloads successfully
  - [ ] Check file opens correctly
- [ ] If no notes:
  - [ ] Verify "No lecture notes available" message

### Video Lectures
- [ ] Navigate to Videos page
- [ ] Verify navigation bar displays
- [ ] Verify subject name displays
- [ ] If videos exist:
  - [ ] YouTube embeds load correctly
  - [ ] Video titles display
  - [ ] Can play videos
  - [ ] Video controls work
- [ ] If no videos:
  - [ ] Verify "No video lectures available" message
- [ ] Footer displays at bottom

### Reference Books
- [ ] Navigate to Books page
- [ ] Verify header displays
- [ ] Home icon links back
- [ ] If books exist:
  - [ ] Book cover images display (if available)
  - [ ] Book titles display
  - [ ] Click on book card
  - [ ] Verify download starts
  - [ ] File downloads successfully
- [ ] If no books:
  - [ ] Verify "No reference books available" message

---

## 🔔 Notifications Tests

### Initial Setup
- [ ] Login with test account
- [ ] Browser prompts for notification permission
- [ ] Grant permission
- [ ] FCM token saved to database
- [ ] Check backend logs for token registration

### Welcome Notification
- [ ] Create new account
- [ ] Wait 2 seconds
- [ ] Verify welcome notification appears (if FCM token set)

### Resource Upload Notification (Admin Only)
- [ ] Set test user role to 'admin' in database
- [ ] Upload a new resource via API
- [ ] Verify notification sent
- [ ] Check if notification appears

### Foreground Messages
- [ ] Stay on application
- [ ] Trigger notification
- [ ] Verify toast appears in top-right

### Background Messages
- [ ] Minimize browser tab
- [ ] Trigger notification
- [ ] Verify system notification appears
- [ ] Click notification
- [ ] Verify browser opens to application

---

## 🔒 Protected Routes Tests

- [ ] Logout completely
- [ ] Try accessing these URLs directly:
  - [ ] `/dashboard`
  - [ ] `/course/MCA`
  - [ ] `/semester/:id/subjects`
  - [ ] `/subject/:id`
  - [ ] `/subject/:id/notes`
  - [ ] `/subject/:id/videos`
  - [ ] `/subject/:id/books`
- [ ] Verify all redirect to `/login`

---

## 🎨 UI/UX Tests

### Visual Tests
- [ ] Colors match original design
- [ ] Gradients render correctly
- [ ] Images load properly
- [ ] No broken images
- [ ] Fonts render correctly
- [ ] Icons display properly
- [ ] Spacing and padding correct

### Interaction Tests
- [ ] All buttons have hover effects
- [ ] Cards have hover animations
- [ ] Links change cursor to pointer
- [ ] Form inputs have focus states
- [ ] Loading spinners display during API calls
- [ ] Toast notifications appear and disappear
- [ ] Smooth transitions between pages

### Responsive Design
- [ ] Test on mobile (320px - 480px)
- [ ] Test on tablet (481px - 768px)
- [ ] Test on laptop (769px - 1024px)
- [ ] Test on desktop (1025px+)
- [ ] Sidebar collapses on mobile
- [ ] Images scale appropriately
- [ ] Text remains readable
- [ ] Buttons/links are tappable (min 44x44px)

---

## 🔧 Backend API Tests

### Health Check
```bash
curl http://localhost:5000/health
```
- [ ] Returns `{"status": "OK"}`

### Authentication Endpoints
```bash
# Register (requires Firebase token)
POST /api/auth/register
# Get current user
GET /api/auth/me
# Update FCM token
PUT /api/auth/fcm-token
```

### Course Endpoints
```bash
# Get all courses
curl http://localhost:5000/api/courses
# Get specific course
curl http://localhost:5000/api/courses/MCA
```

### Subject Endpoints
```bash
# Get subjects by semester
curl http://localhost:5000/api/subjects/semester/:semesterId
# Get subject with resources
curl http://localhost:5000/api/subjects/:subjectId
```

### Resource Endpoints
```bash
# Get resources by subject
curl http://localhost:5000/api/resources/subject/:subjectId?type=notes
# Download resource
curl http://localhost:5000/api/resources/download/:resourceId
```

- [ ] All endpoints return expected responses
- [ ] Error handling works (404, 500, etc.)
- [ ] Authentication required for protected routes
- [ ] CORS headers present

---

## 💾 Database Tests

### Data Integrity
- [ ] Connect to PostgreSQL
- [ ] Verify tables exist:
  ```sql
  \dt
  ```
- [ ] Check users table:
  ```sql
  SELECT * FROM users;
  ```
- [ ] Check courses table:
  ```sql
  SELECT * FROM courses;
  ```
- [ ] Check subjects table:
  ```sql
  SELECT * FROM subjects;
  ```
- [ ] Check resources table (without fileData):
  ```sql
  SELECT id, title, type, fileName FROM resources;
  ```
- [ ] Verify foreign key relationships
- [ ] Test cascade deletes (if applicable)

### File Storage
- [ ] Upload a test PDF
- [ ] Verify stored in `resources.fileData` as BLOB
- [ ] Download the file
- [ ] Compare checksums match
- [ ] Test with different file types:
  - [ ] PDF
  - [ ] PPT
  - [ ] PPTX
  - [ ] DOC
  - [ ] DOCX

---

## 🔄 Integration Tests

### End-to-End User Flow
1. [ ] User visits landing page
2. [ ] Clicks signup
3. [ ] Creates account
4. [ ] Redirected to dashboard
5. [ ] Clicks MCA course
6. [ ] Selects Semester 1
7. [ ] Views subject circles
8. [ ] Clicks Computer Networks
9. [ ] Clicks Lecture Notes
10. [ ] Downloads a PDF
11. [ ] Goes back to subject
12. [ ] Clicks Videos
13. [ ] Watches a video
14. [ ] Goes back to subject
15. [ ] Clicks Reference Books
16. [ ] Views books
17. [ ] Logs out

### Admin Flow (Manual Testing)
1. [ ] Set user role to 'admin' in database
2. [ ] Use Postman/Insomnia to:
   - [ ] Upload a PDF note
   - [ ] Add a video link
   - [ ] Upload a reference book with image
3. [ ] Verify notifications sent
4. [ ] Login as student
5. [ ] Verify new resources appear

---

## ⚡ Performance Tests

### Page Load Times
- [ ] Landing page loads < 2 seconds
- [ ] Dashboard loads < 2 seconds
- [ ] Subject pages load < 1 second
- [ ] Resource pages load < 1 second

### API Response Times
- [ ] GET /api/courses < 300ms
- [ ] GET /api/subjects < 300ms
- [ ] GET /api/resources < 500ms
- [ ] File download initiates < 1 second

### Network Tests
- [ ] Test on slow 3G
- [ ] Test on 4G
- [ ] Test on WiFi
- [ ] Images lazy load
- [ ] No unnecessary API calls

---

## 🔍 Error Handling Tests

### Network Errors
- [ ] Disconnect internet
- [ ] Try navigating
- [ ] Verify error messages display
- [ ] Reconnect internet
- [ ] Verify app recovers

### API Errors
- [ ] Stop backend server
- [ ] Try loading dashboard
- [ ] Verify error handling
- [ ] Start backend
- [ ] Verify recovery

### Invalid Data
- [ ] Try accessing non-existent course
- [ ] Try accessing invalid subject ID
- [ ] Verify 404 handling
- [ ] Try downloading non-existent resource
- [ ] Verify appropriate error messages

---

## 🌐 Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## ♿ Accessibility Tests

- [ ] Tab navigation works
- [ ] Focus indicators visible
- [ ] Images have alt text
- [ ] Form labels properly associated
- [ ] Color contrast sufficient (WCAG AA)
- [ ] Screen reader compatible (test with NVDA/JAWS)
- [ ] Keyboard shortcuts work
- [ ] No keyboard traps

---

## 🔐 Security Tests

### Authentication
- [ ] JWT tokens expire appropriately
- [ ] Cannot access protected routes without auth
- [ ] Firebase tokens validated on backend
- [ ] Session handling secure

### Input Validation
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (React escapes by default)
- [ ] File upload validation works
- [ ] Email validation works
- [ ] SAP ID validation works

### CORS
- [ ] Only allowed origins can access API
- [ ] Credentials handled correctly
- [ ] Preflight requests work

---

## 📱 Mobile App Tests

### PWA Features
- [ ] Service worker registers
- [ ] App installable
- [ ] Works offline (cached pages)
- [ ] App icon displays
- [ ] Splash screen shows

---

## 🐛 Known Issues Log

Document any issues found:

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
| Example: Image carousel stutters on mobile | Low | Open | Needs optimization |

---

## ✅ Sign-Off

Testing completed by: ________________

Date: ________________

All critical tests passed: ☐ Yes ☐ No

Notes:
_______________________________________
_______________________________________
_______________________________________

---

**Testing Complete! 🎉**

