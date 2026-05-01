-- Complete Database Setup for Smart School System
DROP DATABASE IF EXISTS schoolDB;
CREATE DATABASE schoolDB;
USE schoolDB;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- School Table
CREATE TABLE school (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Marks Table
CREATE TABLE marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject VARCHAR(50) NOT NULL,
    marks INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Attendance Table
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    date VARCHAR(20) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- PTM (Parent-Teacher Meeting) Table
CREATE TABLE ptm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT NOT NULL,
    date DATE NOT NULL,
    message TEXT NOT NULL,
    reply TEXT DEFAULT NULL,
    FOREIGN KEY (parent_id) REFERENCES users(id)
);

-- Files Table for assignments
CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    file LONGTEXT NOT NULL
);

-- Insert Sample Data
INSERT INTO users (name, email, password, role) VALUES 
('Admin', 'admin@gmail.com', '12345', 'admin'),
('Teacher1', 'teacher@gmail.com', '12345', 'teacher'),
('Student1', 'student@gmail.com', '12345', 'student'),
('Student2', 'student2@gmail.com', '12345', 'student'),
('Parent1', 'parent@gmail.com', '12345', 'parent');

-- Sample marks data
INSERT INTO marks (student_id, subject, marks) VALUES 
(3, 'Math', 85),
(3, 'Science', 78),
(3, 'English', 92),
(4, 'Math', 75),
(4, 'Science', 88),
(4, 'English', 80);

-- Sample attendance data
INSERT INTO attendance (student_id, status, date) VALUES 
(3, 'Present', '2024-04-25'),
(3, 'Present', '2024-04-24'),
(3, 'Absent', '2024-04-23'),
(4, 'Present', '2024-04-25'),
(4, 'Present', '2024-04-24');

-- Sample PTM data
INSERT INTO ptm (parent_id, date, message, reply) VALUES 
(5, '2024-05-01', 'Want to discuss about exam performance', 'Yes, will see you on May 1st'),
(5, '2024-05-05', 'General update on progress', NULL);

SELECT 'Database setup complete!' AS status;
