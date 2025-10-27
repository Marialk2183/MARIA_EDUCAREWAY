# 🔐 **Admin Panel Guide**

## ✨ **What Is The Admin Panel?**

The Admin Panel is a secure interface for administrators to upload and manage educational resources (notes, videos, and reference books) for all courses, semesters, and subjects.

---

## 🎯 **Features**

### **1. Upload Lecture Notes / PPT**
- Upload PDF, PPT, PPTX, DOC, DOCX files
- Organize by Course → Semester → Subject
- Specify unit numbers for better organization
- Add titles and descriptions
- Automatic file size display

### **2. Add Video Lectures**
- Add YouTube video links
- Support for individual videos and playlists
- Automatic URL conversion for embedding
- Add titles and descriptions

### **3. View Statistics**
- Total courses count
- Active semesters count
- Total subjects count

---

## 🚀 **How To Access Admin Panel**

### **Step 1: Make Your Account Admin**

Run this command in your backend directory:

```bash
cd backend
node scripts/makeAdmin.js your-email@example.com
```

**Example:**
```bash
node scripts/makeAdmin.js admin@nmims.edu
```

**Output:**
```
✅ Success! User role updated to admin

User Details:
  Email: admin@nmims.edu
  Name: Admin User
  SAP ID: 70001234567
  Role: admin

🔐 This user can now access the admin panel at /admin
```

### **Step 2: Login & Access**

1. **Login** to your account
2. Look at the navbar - you'll see a **🔐 Admin** button
3. Click **Admin** button
4. You're now in the Admin Dashboard!

---

## 📤 **How To Upload Notes/PPT**

### **Step-by-Step:**

1. **Go to Admin Panel** (navbar → 🔐 Admin)

2. **Select "📝 Upload Notes/PPT" tab** (default)

3. **Select Course** from dropdown
   - Choose: MCA, BTECH, or BTECH-Integrated

4. **Select Semester** from dropdown
   - Options appear based on selected course
   - Choose: Semester 1, 2, 3, or 4

5. **Select Subject** from dropdown
   - Options appear based on selected semester
   - Example: Data Structures, Computer Networks, etc.

6. **Upload File**
   - Click "Choose File" button
   - Select PDF, PPT, PPTX, DOC, or DOCX file
   - File size will be displayed

7. **Enter Title** (Required)
   - Example: "Data Structures Unit 1 Notes"
   - Example: "Operating Systems Complete PPT"

8. **Select Resource Type** (Required)
   - **Lecture Notes**: For study materials
   - **Reference Book**: For textbooks

9. **Enter Unit Number** (Optional)
   - Example: 1, 2, 3, 4, 5
   - Leave blank if not applicable

10. **Enter Description** (Optional)
    - Brief description of the content
    - Example: "Covers sorting algorithms, searching, and complexity analysis"

11. **Click "📤 Upload File"**
    - Wait for upload to complete
    - Success message will appear
    - Form resets for next upload

---

## 🎬 **How To Add Video Lectures**

### **Step-by-Step:**

1. **Go to Admin Panel** (navbar → 🔐 Admin)

2. **Click "🎬 Add Video" tab**

3. **Select Course** from dropdown

4. **Select Semester** from dropdown

5. **Select Subject** from dropdown

6. **Enter Video Title** (Required)
   - Example: "Data Structures Complete Course"
   - Example: "Operating Systems Tutorial Playlist"

7. **Enter YouTube URL** (Required)
   - **Individual Video:**
     ```
     https://youtube.com/watch?v=abc123
     https://youtu.be/abc123
     ```
   - **Playlist:**
     ```
     https://youtube.com/playlist?list=PLxxx...
     ```

8. **Enter Description** (Optional)
   - Brief description of the video content
   - Example: "Complete DSA tutorial covering all topics"

9. **Click "🎬 Add Video"**
   - Video link will be saved
   - Students can now watch it on the Video Lectures page

---

## 📊 **Admin Panel Layout**

```
┌─────────────────────────────────────────────────────────────┐
│  🔐 Admin Dashboard                                         │
│  Manage courses, subjects, and upload resources            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [📝 Upload Notes/PPT] [🎬 Add Video] [📊 Statistics]       │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                                                         │ │
│  │  Select Course:    [▼ MCA                          ]   │ │
│  │  Select Semester:  [▼ Semester 1                   ]   │ │
│  │  Select Subject:   [▼ Data Structures and Algorithms]  │ │
│  │                                                         │ │
│  │  Upload File:      [Choose File] notes.pdf (1.2 MB)   │ │
│  │  Title:            [Data Structures Unit 1 Notes   ]   │ │
│  │  Resource Type:    [▼ Lecture Notes                ]   │ │
│  │  Unit Number:      [1                              ]   │ │
│  │  Description:      [_________________________      ]   │ │
│  │                                                         │ │
│  │              [📤 Upload File]                          │ │
│  │                                                         │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔒 **Security Features**

### **Backend Protection:**
- ✅ All upload routes require authentication
- ✅ All upload routes check for admin role
- ✅ JWT token verification on every request
- ✅ File type validation
- ✅ File size limits

### **Frontend Protection:**
- ✅ Admin panel only visible to admins
- ✅ Non-admin users redirected to dashboard
- ✅ Admin button only shows for admin users
- ✅ Route protection with ProtectedRoute component

---

## 📁 **Supported File Types**

### **For Notes/Books:**
- ✅ **PDF** (.pdf) - Portable Document Format
- ✅ **PowerPoint** (.ppt, .pptx) - Microsoft PowerPoint
- ✅ **Word** (.doc, .docx) - Microsoft Word

### **For Videos:**
- ✅ **YouTube Videos** (individual)
- ✅ **YouTube Playlists**

---

## 💡 **Best Practices**

### **File Naming:**
- Use descriptive titles
- Include subject and unit number
- Example: "DSA Unit 1 - Arrays and Strings"

### **Organization:**
- Upload all units sequentially (Unit 1, 2, 3...)
- Keep consistent naming across subjects
- Add descriptions for complex topics

### **Video Links:**
- Use official/verified YouTube channels
- Prefer playlists for complete courses
- Test video links before uploading

### **File Sizes:**
- Keep PDFs under 10 MB if possible
- Compress large PowerPoint files
- Split very large documents into units

---

## 🐛 **Troubleshooting**

### **"Access denied. Admin only."**
**Solution:** Your account is not admin. Run the makeAdmin script:
```bash
node scripts/makeAdmin.js your-email@example.com
```

### **"Please select a file"**
**Solution:** Click the "Choose File" button and select a valid file.

### **"Failed to upload file"**
**Possible Causes:**
- File too large (check backend limits)
- Invalid file type
- Network error
- Backend not running

**Solutions:**
- Check file size and type
- Ensure backend is running
- Check browser console for errors

### **"Failed to add video"**
**Possible Causes:**
- Invalid YouTube URL
- Missing required fields
- Network error

**Solutions:**
- Copy URL directly from YouTube
- Make sure all required fields are filled
- Check that backend is running

### **Subjects Not Loading**
**Solution:**
- Make sure you selected a course first
- Then select a semester
- Subjects will load automatically

### **Admin Button Not Showing**
**Solution:**
- Make sure you ran makeAdmin script
- Logout and login again
- Check that user.role === 'admin' in browser console

---

## 🎓 **Usage Examples**

### **Example 1: Upload Semester 1 DSA Notes**

```
Course: MCA
Semester: Semester 1
Subject: Data Structures and Algorithms
File: dsa_unit1.pdf
Title: Data Structures Unit 1 - Arrays and Linked Lists
Type: Lecture Notes
Unit Number: 1
Description: Covers arrays, linked lists, stacks, and queues with examples
```

### **Example 2: Add Complete Course Playlist**

```
Course: MCA
Semester: Semester 1
Subject: Computer Networks
Video Title: Computer Networks Complete Course
YouTube URL: https://youtube.com/playlist?list=PLxxx...
Description: Complete CN course covering all 5 units with practical examples
```

### **Example 3: Upload Reference Book**

```
Course: MCA
Semester: Semester 1
Subject: Operating Systems
File: os_textbook.pdf
Title: Operating Systems Concepts - Silberschatz
Type: Reference Book
Unit Number: [Leave blank]
Description: Complete textbook for OS course
```

---

## 📊 **Admin Statistics Dashboard**

View quick stats about your platform:

- **📚 Total Courses** - Number of courses (MCA, BTECH, etc.)
- **📅 Active Semesters** - Total semesters across all courses
- **🎓 Total Subjects** - Number of subjects available

---

## 🔄 **Workflow**

### **Typical Admin Workflow:**

1. **Login as Admin**
2. **Click 🔐 Admin** in navbar
3. **Upload notes for each unit:**
   - Unit 1 → Upload
   - Unit 2 → Upload
   - Unit 3 → Upload
   - etc.
4. **Add video lectures**
5. **Verify uploads** by:
   - Logging out
   - Logging in as student
   - Checking if resources appear
6. **Repeat for all subjects**

---

## 🚨 **Important Notes**

1. **Only admins can upload** - Regular users cannot access this panel
2. **Files stored in database** - All files saved as BLOBs in MySQL
3. **No file limit** - You can upload unlimited files per subject
4. **Duplicate check** - System prevents duplicate uploads
5. **Instant availability** - Resources immediately available to students
6. **No deletion from UI** - Use database directly to delete if needed

---

## 🛠️ **Making Multiple Admins**

You can make multiple users admins:

```bash
# Make first admin
node scripts/makeAdmin.js admin1@nmims.edu

# Make second admin
node scripts/makeAdmin.js admin2@nmims.edu

# Make third admin
node scripts/makeAdmin.js admin3@nmims.edu
```

All admins have equal access to upload resources.

---

## 📱 **Mobile Usage**

The admin panel is **fully responsive**:
- Works on tablets and phones
- Forms adapt to screen size
- All features accessible
- Touch-friendly interface

---

## 🔐 **Admin Access Summary**

```
Regular User (role: 'student'):
- ❌ Cannot see Admin button
- ❌ Cannot access /admin route
- ❌ Cannot upload files
- ✅ Can view and download resources

Admin User (role: 'admin'):
- ✅ Can see Admin button in navbar
- ✅ Can access /admin route
- ✅ Can upload files
- ✅ Can add videos
- ✅ Can view statistics
- ✅ Can also do everything regular users can
```

---

## 🎉 **You're Ready!**

Your admin panel is fully functional and ready to use. Start uploading resources for your students!

**Quick Start:**
1. `node scripts/makeAdmin.js your-email@example.com`
2. Login
3. Click **🔐 Admin** button
4. Start uploading!

---

## 📞 **Need Help?**

If you encounter any issues:
1. Check the console for error messages
2. Verify backend is running
3. Ensure you're an admin user
4. Check file types and sizes
5. Review this guide

---

**Happy Uploading! 🚀**

