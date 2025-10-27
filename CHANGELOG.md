# Changelog

All notable changes to the EduCareWay project.

## [1.1.0] - 2024-10-27

### Changed
- **Database:** Switched from PostgreSQL to MySQL
  - Updated `backend/config/database.js` to use MySQL dialect
  - Changed database port from 5432 to 3306
  - Updated default user from `postgres` to `root`
  - Replaced `pg` and `pg-hstore` packages with `mysql2`
  - Added MySQL-specific charset configuration (utf8mb4)
  
### Added
- **MYSQL_SETUP.md:** Complete MySQL setup guide
  - Installation instructions for Windows, macOS, Linux
  - Database creation steps
  - Configuration guide
  - Troubleshooting section
  - Backup and restore procedures
  - Performance tuning tips
  
### Updated Documentation
- **README.md:** Updated all PostgreSQL references to MySQL
- **QUICK_START.md:** Updated database setup steps for MySQL
- **PROJECT_SUMMARY.md:** Updated tech stack information
- **backend/.env.example:** Updated with MySQL configuration

### Technical Details
- MySQL configuration includes:
  - Default port: 3306
  - Charset: utf8mb4 (full Unicode support)
  - Collation: utf8mb4_unicode_ci
  - LONGBLOB support for file storage (same functionality as PostgreSQL BYTEA)
  - Connection pooling maintained (max 5 connections)
  
### Migration Notes
For existing PostgreSQL installations:
1. Export data from PostgreSQL
2. Install MySQL
3. Update environment variables
4. Run seed script
5. Re-upload resources if needed

### Compatibility
- All features remain identical
- No API changes
- No frontend changes required
- Database schema identical (handled by Sequelize)
- File storage (BLOBs) work the same way

---

## [1.0.0] - 2024-10-27

### Initial Release
- Complete project conversion from HTML/CSS/JS to React/Node.js
- Full-stack application with React frontend
- RESTful API with Express.js
- PostgreSQL database with Sequelize ORM (later changed to MySQL)
- Firebase Authentication integration
- Firebase Cloud Messaging for notifications
- File upload/download system
- Admin functionality
- Responsive design with Tailwind CSS
- Comprehensive documentation
- Testing checklist
- Deployment guide

### Features
- User authentication (signup/login/logout)
- Course management (MCA, BTECH, BTECH-Int)
- Semester organization
- Subject navigation
- Three resource types: Notes, Videos, Reference Books
- File storage in database (PDFs, PPTs, DOCX)
- Video lectures with YouTube embeds
- Reference books with cover images
- Push notifications
- Admin resource uploads
- Protected routes
- Responsive UI
- Original design preserved

### Documentation Created
- README.md
- QUICK_START.md
- SETUP_GUIDE.md
- DEPLOYMENT.md
- TESTING_CHECKLIST.md
- PROJECT_SUMMARY.md
- .gitignore

---

## Future Releases

### Planned for v1.2.0
- Advanced search functionality
- User progress tracking
- BTECH and BTECH-Int content implementation
- Assignment submission system
- Discussion forums

### Planned for v1.3.0
- Mobile app (React Native)
- Offline support
- Advanced analytics dashboard
- Bulk upload for admins
- Email notifications

---

*For detailed information about each version, see the commit history or contact the development team.*

