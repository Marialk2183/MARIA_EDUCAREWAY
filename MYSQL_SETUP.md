# 🐬 MySQL Setup Guide

Complete guide for setting up MySQL database for EduCareWay platform.

## Table of Contents
1. [Install MySQL](#install-mysql)
2. [Create Database](#create-database)
3. [Configure Backend](#configure-backend)
4. [Seed Database](#seed-database)
5. [Verify Installation](#verify-installation)
6. [Troubleshooting](#troubleshooting)

---

## Install MySQL

### Windows

#### Option 1: MySQL Installer (Recommended)
1. Download MySQL Installer from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
2. Run the installer
3. Choose "Developer Default" setup type
4. Set root password (remember this!)
5. Complete installation

#### Option 2: Using Chocolatey
```powershell
choco install mysql
```

### macOS

#### Using Homebrew (Recommended)
```bash
# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation (set root password)
mysql_secure_installation
```

#### Using MySQL DMG
1. Download from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)
2. Install the .dmg package
3. Start MySQL from System Preferences

### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Enable MySQL to start on boot
sudo systemctl enable mysql

# Secure installation
sudo mysql_secure_installation
```

### Linux (CentOS/RHEL)

```bash
# Install MySQL
sudo yum install mysql-server

# Start MySQL
sudo systemctl start mysqld

# Enable on boot
sudo systemctl enable mysqld

# Get temporary root password
sudo grep 'temporary password' /var/log/mysqld.log

# Secure installation
sudo mysql_secure_installation
```

---

## Create Database

### Method 1: Using MySQL Command Line

```bash
# Login to MySQL as root
mysql -u root -p
# Enter your root password
```

```sql
-- Create database
CREATE DATABASE educareway CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (optional but recommended)
CREATE USER 'educareway_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON educareway.* TO 'educareway_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### Method 2: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to MySQL Server
3. Click "Create a new schema" (database icon)
4. Name: `educareway`
5. Charset: `utf8mb4`
6. Collation: `utf8mb4_unicode_ci`
7. Click "Apply"

### Method 3: Using phpMyAdmin

1. Open phpMyAdmin in browser
2. Click "Databases" tab
3. Enter database name: `educareway`
4. Choose collation: `utf8mb4_unicode_ci`
5. Click "Create"

---

## Configure Backend

### 1. Update Environment Variables

Create or edit `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=educareway
DB_USER=root
DB_PASSWORD=your_mysql_root_password

# OR if you created a separate user:
# DB_USER=educareway_user
# DB_PASSWORD=your_secure_password

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this

# CORS Origin
CORS_ORIGIN=http://localhost:5173
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

This will install `mysql2` package instead of `pg`.

---

## Seed Database

Run the seeding script to create tables and initial data:

```bash
cd backend
node scripts/seedData.js
```

This will:
- Create all tables (users, courses, semesters, subjects, resources)
- Insert sample courses (MCA, BTECH, BTECH-Int)
- Insert semesters
- Insert sample subjects

Expected output:
```
✅ Database synchronized successfully
🌱 Starting database seeding...
✅ Courses created
✅ Semesters created
✅ Subjects created
✅ Database seeding completed successfully!
```

---

## Verify Installation

### 1. Check Tables

```bash
# Login to MySQL
mysql -u root -p educareway
```

```sql
-- Show all tables
SHOW TABLES;

-- Should see:
-- +----------------------+
-- | Tables_in_educareway |
-- +----------------------+
-- | courses              |
-- | resources            |
-- | semesters            |
-- | subjects             |
-- | users                |
-- +----------------------+

-- Check courses
SELECT * FROM courses;

-- Check subjects
SELECT * FROM subjects;

-- Exit
EXIT;
```

### 2. Test Backend Connection

Start the backend server:
```bash
cd backend
npm run dev
```

Test the health endpoint:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

Test API endpoints:
```bash
# Get all courses
curl http://localhost:5000/api/courses
```

---

## MySQL Configuration Options

### Increase Max Allowed Packet (for large file uploads)

```sql
-- Login to MySQL
mysql -u root -p

-- Check current value
SHOW VARIABLES LIKE 'max_allowed_packet';

-- Set to 100MB (good for large PDFs/PPTs)
SET GLOBAL max_allowed_packet=104857600;

-- Make permanent by editing my.cnf or my.ini
-- Add under [mysqld]:
-- max_allowed_packet=100M
```

### Enable Binary Logging (optional, for backups)

Edit MySQL config file:
- Windows: `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`
- macOS (Homebrew): `/usr/local/etc/my.cnf`
- Linux: `/etc/mysql/my.cnf`

Add:
```ini
[mysqld]
log_bin=mysql-bin
expire_logs_days=10
max_binlog_size=100M
```

Restart MySQL after changes.

---

## Database Backup & Restore

### Backup Database

```bash
# Full backup
mysqldump -u root -p educareway > educareway_backup_$(date +%Y%m%d).sql

# Backup structure only
mysqldump -u root -p --no-data educareway > educareway_structure.sql

# Backup data only
mysqldump -u root -p --no-create-info educareway > educareway_data.sql
```

### Restore Database

```bash
# Restore from backup
mysql -u root -p educareway < educareway_backup_20241027.sql
```

---

## Troubleshooting

### Issue: "Access denied for user 'root'@'localhost'"

**Solution:**
```bash
# Reset root password (MySQL 8.0+)
# 1. Stop MySQL service
# Windows: Services > MySQL80 > Stop
# Mac: brew services stop mysql
# Linux: sudo systemctl stop mysql

# 2. Start MySQL in safe mode
# Windows: mysqld --skip-grant-tables
# Mac/Linux: sudo mysqld_safe --skip-grant-tables &

# 3. Login without password
mysql -u root

# 4. Reset password
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
EXIT;

# 5. Restart MySQL normally
```

### Issue: "Can't connect to MySQL server on 'localhost'"

**Solution:**
```bash
# Check if MySQL is running
# Windows:
services.msc
# Find "MySQL80" and start it

# Mac:
brew services list
brew services start mysql

# Linux:
sudo systemctl status mysql
sudo systemctl start mysql
```

### Issue: "Unknown database 'educareway'"

**Solution:**
```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE educareway CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Issue: "Packet too large" error during file upload

**Solution:**
```sql
-- Increase max_allowed_packet
mysql -u root -p

SET GLOBAL max_allowed_packet=104857600;
EXIT;

-- Restart MySQL service
```

### Issue: Character encoding problems

**Solution:**
```sql
-- Verify database charset
SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME
FROM information_schema.SCHEMATA
WHERE SCHEMA_NAME = 'educareway';

-- Should be utf8mb4 and utf8mb4_unicode_ci

-- If not, recreate database:
DROP DATABASE educareway;
CREATE DATABASE educareway CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Issue: Cannot create user

**Solution:**
```sql
-- Check existing users
SELECT User, Host FROM mysql.user;

-- Drop user if exists
DROP USER IF EXISTS 'educareway_user'@'localhost';

-- Create user
CREATE USER 'educareway_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON educareway.* TO 'educareway_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## MySQL vs PostgreSQL Differences

Key differences that were changed:

| Feature | PostgreSQL | MySQL |
|---------|-----------|-------|
| Package | `pg` | `mysql2` |
| Default Port | 5432 | 3306 |
| Default User | postgres | root |
| Dialect | 'postgres' | 'mysql' |
| UUID | Native | Stored as VARCHAR(36) |
| BLOB Types | BYTEA | BLOB, MEDIUMBLOB, LONGBLOB |
| Boolean | BOOLEAN | TINYINT(1) |
| Text | TEXT | TEXT, MEDIUMTEXT, LONGTEXT |

All handled automatically by Sequelize ORM.

---

## Performance Tuning

### For Development

```ini
# my.cnf or my.ini
[mysqld]
innodb_buffer_pool_size=256M
max_connections=100
query_cache_size=0
query_cache_type=0
```

### For Production

```ini
[mysqld]
innodb_buffer_pool_size=1G
max_connections=200
innodb_log_file_size=256M
innodb_flush_log_at_trx_commit=2
innodb_flush_method=O_DIRECT
```

---

## MySQL Workbench (GUI Tool)

### Installation

1. Download from [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
2. Install and open
3. Create connection:
   - Connection Name: EduCareWay Local
   - Hostname: localhost
   - Port: 3306
   - Username: root
4. Test connection
5. Click "OK"

### Useful Features

- Visual database design
- Query editor
- Table data browser
- Export/Import wizards
- Performance dashboard

---

## Connection String Format

For reference, MySQL connection strings:

```
mysql://username:password@host:port/database

Example:
mysql://root:password@localhost:3306/educareway
```

With Sequelize (already configured):
```javascript
new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})
```

---

## Security Best Practices

1. **Never use root in production**
   ```sql
   CREATE USER 'educareway_app'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT SELECT, INSERT, UPDATE, DELETE ON educareway.* TO 'educareway_app'@'localhost';
   ```

2. **Use strong passwords**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols

3. **Restrict remote access**
   ```sql
   -- Only allow localhost
   CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
   -- Not: CREATE USER 'user'@'%' ...
   ```

4. **Regular backups**
   ```bash
   # Daily backup cron job
   0 2 * * * mysqldump -u backup_user -p'password' educareway > /backups/educareway_$(date +\%Y\%m\%d).sql
   ```

5. **Keep MySQL updated**
   ```bash
   # Check version
   mysql --version
   
   # Update (Mac)
   brew upgrade mysql
   
   # Update (Linux)
   sudo apt update && sudo apt upgrade mysql-server
   ```

---

## Quick Reference Commands

```bash
# Start MySQL service
# Windows: net start MySQL80
# Mac: brew services start mysql
# Linux: sudo systemctl start mysql

# Stop MySQL service
# Windows: net stop MySQL80
# Mac: brew services stop mysql
# Linux: sudo systemctl stop mysql

# Check MySQL status
# Mac: brew services list
# Linux: sudo systemctl status mysql

# Login to MySQL
mysql -u root -p

# Show databases
SHOW DATABASES;

# Use database
USE educareway;

# Show tables
SHOW TABLES;

# Show table structure
DESCRIBE users;

# Show table create statement
SHOW CREATE TABLE users;

# Export database
mysqldump -u root -p educareway > backup.sql

# Import database
mysql -u root -p educareway < backup.sql
```

---

## Next Steps

After MySQL setup:

1. ✅ MySQL installed and running
2. ✅ Database created
3. ✅ Backend configured
4. ✅ Tables seeded

**Continue with:**
- Run backend: `cd backend && npm run dev`
- Run frontend: `cd frontend && npm run dev`
- Follow QUICK_START.md for complete setup

---

## Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MySQL Workbench Guide](https://dev.mysql.com/doc/workbench/en/)
- [Sequelize MySQL Docs](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/#mysql)

---

**MySQL Setup Complete! 🐬**

