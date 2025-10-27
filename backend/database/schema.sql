-- ========================================
-- EduCareWay Database Schema for MySQL
-- ========================================

-- Create Database
CREATE DATABASE IF NOT EXISTS educareway 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE educareway;

-- ========================================
-- Table: users
-- ========================================
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  firebaseUid VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  sapid VARCHAR(11) UNIQUE,
  role ENUM('student', 'admin') DEFAULT 'student',
  fcmToken VARCHAR(255),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_firebaseUid (firebaseUid),
  INDEX idx_email (email),
  INDEX idx_sapid (sapid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: courses
-- ========================================
CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  code VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  imageUrl VARCHAR(255),
  totalSemesters INT NOT NULL DEFAULT 3,
  isActive TINYINT(1) DEFAULT 1,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (code),
  INDEX idx_isActive (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: semesters
-- ========================================
CREATE TABLE IF NOT EXISTS semesters (
  id VARCHAR(36) PRIMARY KEY,
  courseId VARCHAR(36) NOT NULL,
  semesterNumber INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  isActive TINYINT(1) DEFAULT 1,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_courseId (courseId),
  INDEX idx_isActive (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: subjects
-- ========================================
CREATE TABLE IF NOT EXISTS subjects (
  id VARCHAR(36) PRIMARY KEY,
  semesterId VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(255) NOT NULL,
  description TEXT,
  imageUrl VARCHAR(255),
  isActive TINYINT(1) DEFAULT 1,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (semesterId) REFERENCES semesters(id) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_semesterId (semesterId),
  INDEX idx_code (code),
  INDEX idx_isActive (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: resources
-- ========================================
CREATE TABLE IF NOT EXISTS resources (
  id VARCHAR(36) PRIMARY KEY,
  subjectId VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  type ENUM('notes', 'video', 'reference_book') NOT NULL,
  resourceType ENUM('pdf', 'ppt', 'pptx', 'doc', 'docx', 'video_url', 'image') NOT NULL,
  fileData LONGBLOB COMMENT 'Stores the actual file content for PDFs, PPTs, DOCX',
  fileName VARCHAR(255),
  fileSize INT COMMENT 'File size in bytes',
  mimeType VARCHAR(255),
  url VARCHAR(255) COMMENT 'For YouTube videos or external resources',
  imageUrl VARCHAR(255) COMMENT 'Cover image for reference books',
  unitNumber INT COMMENT 'Unit number for lecture notes',
  description TEXT,
  isActive TINYINT(1) DEFAULT 1,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_subjectId (subjectId),
  INDEX idx_type (type),
  INDEX idx_isActive (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Sample Data (Optional)
-- ========================================

-- Insert MCA Course
INSERT INTO courses (id, name, code, description, imageUrl, totalSemesters, isActive) VALUES
('mca-uuid-001', 'Master of Computer Applications', 'MCA', 'MCA program at NMIMS', '/assets/mca.jpeg', 3, 1);

-- Insert BTECH Course
INSERT INTO courses (id, name, code, description, imageUrl, totalSemesters, isActive) VALUES
('btech-uuid-001', 'Bachelor of Technology', 'BTECH', 'B.Tech program at NMIMS', '/assets/BTECH.jpg', 8, 1);

-- Insert BTECH-Int Course
INSERT INTO courses (id, name, code, description, imageUrl, totalSemesters, isActive) VALUES
('btechint-uuid-001', 'Bachelor of Technology - Integrated', 'BTECH-INT', 'B.Tech Integrated program at NMIMS', '/assets/btechint.png', 12, 1);

-- Insert MCA Semesters
INSERT INTO semesters (id, courseId, semesterNumber, name, isActive) VALUES
('sem-mca-1', 'mca-uuid-001', 1, 'Semester 1', 1),
('sem-mca-2', 'mca-uuid-001', 2, 'Semester 2', 1),
('sem-mca-3', 'mca-uuid-001', 3, 'Semester 3', 1);

-- Insert Subjects for MCA Semester 1
INSERT INTO subjects (id, semesterId, name, code, description, imageUrl, isActive) VALUES
('subj-dsa-001', 'sem-mca-1', 'Data Structures and Algorithms', 'DSA', 'Fundamental data structures and algorithms', '/assets/dsaaa.png', 1),
('subj-cn-001', 'sem-mca-1', 'Computer Networks', 'CN', 'Networking fundamentals and protocols', '/assets/maxresdefault.jpg', 1),
('subj-os-001', 'sem-mca-1', 'Operating Systems', 'OS', 'Operating system concepts and principles', '/assets/images.png', 1),
('subj-dbms-001', 'sem-mca-1', 'Database Management Systems', 'DBMS', 'Database design and SQL', '/assets/db.png', 1),
('subj-wt-001', 'sem-mca-1', 'Web Technologies', 'WT', 'Web development fundamentals', '/assets/wp.png', 1),
('subj-java-001', 'sem-mca-1', 'Java Programming', 'JAVA', 'Object-oriented programming with Java', '/assets/java.jpg', 1);

-- Insert Subjects for MCA Semester 3
INSERT INTO subjects (id, semesterId, name, code, description, imageUrl, isActive) VALUES
('subj-ai-001', 'sem-mca-3', 'Artificial Intelligence', 'AI', 'AI concepts and applications', '/assets/ai.jpg', 1),
('subj-ml-001', 'sem-mca-3', 'Machine Learning', 'ML', 'Machine learning algorithms and techniques', '/assets/ml3.jpg', 1),
('subj-cloud-001', 'sem-mca-3', 'Cloud Computing', 'CLOUD', 'Cloud platforms and services', '/assets/cloud.jpg', 1),
('subj-cyber-001', 'sem-mca-3', 'Cyber Security', 'CYBER', 'Information security and cryptography', '/assets/cyber.jpg', 1),
('subj-asp-001', 'sem-mca-3', 'ASP.NET', 'ASP', 'Web development with ASP.NET', '/assets/asp.jpg', 1);

-- ========================================
-- Verification Queries
-- ========================================

-- Show all tables
-- SHOW TABLES;

-- Count records in each table
-- SELECT 'users' as table_name, COUNT(*) as count FROM users
-- UNION ALL
-- SELECT 'courses', COUNT(*) FROM courses
-- UNION ALL
-- SELECT 'semesters', COUNT(*) FROM semesters
-- UNION ALL
-- SELECT 'subjects', COUNT(*) FROM subjects
-- UNION ALL
-- SELECT 'resources', COUNT(*) FROM resources;

-- View table structures
-- DESCRIBE users;
-- DESCRIBE courses;
-- DESCRIBE semesters;
-- DESCRIBE subjects;
-- DESCRIBE resources;

-- ========================================
-- Cleanup Queries (Use with caution!)
-- ========================================

-- Drop all tables (WARNING: This will delete all data)
-- DROP TABLE IF EXISTS resources;
-- DROP TABLE IF EXISTS subjects;
-- DROP TABLE IF EXISTS semesters;
-- DROP TABLE IF EXISTS courses;
-- DROP TABLE IF EXISTS users;

-- Drop database (WARNING: This will delete everything)
-- DROP DATABASE IF EXISTS educareway;

