# Database Schema and SQL Scripts

This directory contains SQL scripts for manually creating and managing the database.

## Files

- **schema.sql** - Complete database schema with CREATE TABLE statements
- **README.md** - This file

## Usage

### Option 1: Automatic (Recommended)

Use Sequelize ORM which automatically creates tables:

```bash
cd backend
node scripts/seedData.js
```

This will:
- Create all tables automatically
- Insert sample data
- Set up relationships

### Option 2: Manual SQL Execution

If you want to create tables manually using SQL:

```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
source backend/database/schema.sql

# Or copy-paste the SQL commands from schema.sql
```

## Table Structure

### 1. users
- Stores user accounts
- Firebase UID for authentication
- SAP ID for student identification
- Role (student/admin)
- FCM token for notifications

### 2. courses
- Available courses (MCA, BTECH, BTECH-INT)
- Course details and metadata

### 3. semesters
- Semesters for each course
- Linked to courses via courseId

### 4. subjects
- Subjects within semesters
- Linked to semesters via semesterId

### 5. resources
- Learning materials (notes, videos, books)
- File storage using LONGBLOB
- Linked to subjects via subjectId

## Relationships

```
courses (1) ──→ (many) semesters
semesters (1) ──→ (many) subjects
subjects (1) ──→ (many) resources
```

## View Tables

```sql
-- Show all tables
SHOW TABLES;

-- View table structure
DESCRIBE users;
DESCRIBE courses;
DESCRIBE semesters;
DESCRIBE subjects;
DESCRIBE resources;

-- View data
SELECT * FROM courses;
SELECT * FROM semesters;
SELECT * FROM subjects;
```

## Indexes

Tables include indexes on:
- Foreign keys
- Frequently queried columns
- Unique constraints

This improves query performance.

## Character Encoding

All tables use:
- Character Set: `utf8mb4`
- Collation: `utf8mb4_unicode_ci`

This supports full Unicode including emojis.

## Storage Engine

All tables use **InnoDB** which provides:
- ACID compliance
- Foreign key constraints
- Row-level locking
- Crash recovery

## File Storage

The `resources` table uses **LONGBLOB** to store files:
- Maximum size: 4GB per file
- Stores PDFs, PPTs, DOCX directly in database
- Binary data stored securely

## Backup Database

```bash
# Backup entire database
mysqldump -u root -p educareway > backup.sql

# Backup structure only
mysqldump -u root -p --no-data educareway > structure.sql

# Backup data only
mysqldump -u root -p --no-create-info educareway > data.sql
```

## Restore Database

```bash
# Restore from backup
mysql -u root -p educareway < backup.sql
```

## Reset Database

```bash
# Login to MySQL
mysql -u root -p

# Drop and recreate
DROP DATABASE IF EXISTS educareway;
CREATE DATABASE educareway CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Run schema
source backend/database/schema.sql;

# Or use Sequelize
cd backend
node scripts/seedData.js
```

## Troubleshooting

### Tables Not Created

**Check if database exists:**
```sql
SHOW DATABASES;
USE educareway;
```

**Check for errors:**
```sql
SHOW WARNINGS;
```

### Foreign Key Errors

Ensure parent tables exist before creating child tables.
Order matters:
1. users
2. courses
3. semesters
4. subjects
5. resources

### Character Encoding Issues

Ensure database and tables use utf8mb4:
```sql
SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME
FROM information_schema.SCHEMATA
WHERE SCHEMA_NAME = 'educareway';
```

## Performance Tips

### Add Indexes

```sql
-- Add index to frequently queried columns
CREATE INDEX idx_column_name ON table_name(column_name);
```

### Analyze Tables

```sql
-- Update table statistics
ANALYZE TABLE users, courses, semesters, subjects, resources;
```

### Optimize Tables

```sql
-- Defragment tables
OPTIMIZE TABLE users, courses, semesters, subjects, resources;
```

## Security

### Create Application User

Instead of using root:

```sql
-- Create dedicated user
CREATE USER 'educareway_app'@'localhost' IDENTIFIED BY 'secure_password';

-- Grant only needed permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON educareway.* TO 'educareway_app'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
```

Update `.env`:
```env
DB_USER=educareway_app
DB_PASSWORD=secure_password
```

## Monitoring

### Check Table Sizes

```sql
SELECT 
  table_name AS 'Table',
  ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'educareway'
ORDER BY (data_length + index_length) DESC;
```

### Count Records

```sql
SELECT 
  'users' as table_name, COUNT(*) as records FROM users
UNION ALL
SELECT 'courses', COUNT(*) FROM courses
UNION ALL
SELECT 'semesters', COUNT(*) FROM semesters
UNION ALL
SELECT 'subjects', COUNT(*) FROM subjects
UNION ALL
SELECT 'resources', COUNT(*) FROM resources;
```

## Notes

- Always backup before making schema changes
- Use transactions for bulk operations
- Test queries on a copy of the database first
- Monitor query performance with EXPLAIN
- Regular maintenance improves performance

