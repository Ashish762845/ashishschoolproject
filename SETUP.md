# 🎓 Smart School System - Setup Guide

## Prerequisites
- **Node.js** installed
- **MySQL** installed and running
- **npm** packages installed

## Step 1: Setup Database

Run this SQL script in MySQL:

```sql
DROP DATABASE IF EXISTS schoolDB;
CREATE DATABASE schoolDB;
USE schoolDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(50)
);

CREATE TABLE school (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(50),
    marks INT
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    status VARCHAR(20),
    date VARCHAR(20)
);

CREATE TABLE ptm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT,
    date DATE,
    message TEXT,
    reply TEXT
);

CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    file LONGTEXT
);

-- Sample admin user
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@gmail.com', '12345', 'admin');

-- Sample teacher
INSERT INTO users (name, email, password, role)
VALUES ('Teacher1', 'teacher@gmail.com', '12345', 'teacher');

-- Sample student
INSERT INTO users (name, email, password, role)
VALUES ('Student1', 'student@gmail.com', '12345', 'student');

-- Sample parent
INSERT INTO users (name, email, password, role)
VALUES ('Parent1', 'parent@gmail.com', '12345', 'parent');
```

## Step 2: Install Dependencies

```bash
npm install express mysql2 cors socket.io
```

## Step 3: Start the Server

```bash
node server.js
```

You should see:
```
✅ MySQL Connected
🚀 Server running on http://localhost:5000
```

## Step 4: Open the Application

Open `index.html` in your browser or use a local server:

```bash
# Using Python (if available)
python -m http.server 8000

# Or using Node.js
npx http-server
```

Then navigate to: `http://localhost:8000` (or the port shown)

## Step 5: Test Login Credentials

### Admin
- Email: `admin@gmail.com`
- Password: `12345`

### Teacher
- Email: `teacher@gmail.com`
- Password: `12345`

### Student
- Email: `student@gmail.com`
- Password: `12345`

### Parent
- Email: `parent@gmail.com`
- Password: `12345`

## ✅ All Features

### Admin Panel
✓ Add School
✓ Add Users
✓ Load Users

### Teacher Panel
✓ Upload Marks
✓ Mark Attendance
✓ Upload Files
✓ Load PTM Requests
✓ Send PTM Reply

### Student Panel
✓ View Assignments
✓ Performance Analysis
✓ View Charts
✓ Advanced Analytics
✓ AI Prediction

### Parent Panel
✓ View Child's Marks
✓ View Attendance
✓ Book PTM
✓ View PTM Status

## 🐛 Troubleshooting

### MySQL Connection Error
- Make sure MySQL is running
- Check password in server.js matches your MySQL password
- Verify database name is "schoolDB"

### Port 5000 Already in Use
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Frontend not connecting to backend
- Ensure server.js is running
- Check browser console for errors (F12)
- Verify API URL is `http://localhost:5000`

## 📝 Notes

- All passwords are stored as plain text (NOT recommended for production)
- Use environment variables for sensitive data in production
- Implement proper authentication (JWT tokens) for production
