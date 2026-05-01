const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('school.db');

db.serialize(() => {
  // Drop tables if they exist
  db.run("DROP TABLE IF EXISTS users");
  db.run("DROP TABLE IF EXISTS school");
  db.run("DROP TABLE IF EXISTS marks");
  db.run("DROP TABLE IF EXISTS attendance");
  db.run("DROP TABLE IF EXISTS ptm");
  db.run("DROP TABLE IF EXISTS files");

  // Users Table
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`);

  // School Table
  db.run(`CREATE TABLE school (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);

  // Marks Table
  db.run(`CREATE TABLE marks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    subject TEXT NOT NULL,
    marks INTEGER NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id)
  )`);

  // Attendance Table
  db.run(`CREATE TABLE attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id)
  )`);

  // PTM Table
  db.run(`CREATE TABLE ptm (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    message TEXT NOT NULL,
    reply TEXT DEFAULT NULL,
    FOREIGN KEY (parent_id) REFERENCES users(id)
  )`);

  // Files Table
  db.run(`CREATE TABLE files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    file TEXT NOT NULL
  )`);

  // Insert Sample Data
  const stmt = db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
  stmt.run('Admin', 'admin@gmail.com', '12345', 'admin');
  stmt.run('Teacher1', 'teacher@gmail.com', '12345', 'teacher');
  stmt.run('Student1', 'student@gmail.com', '12345', 'student');
  stmt.run('Student2', 'student2@gmail.com', '12345', 'student');
  stmt.run('Parent1', 'parent@gmail.com', '12345', 'parent');
  stmt.finalize();

  // Sample marks data
  const marksStmt = db.prepare("INSERT INTO marks (student_id, subject, marks) VALUES (?, ?, ?)");
  marksStmt.run(3, 'Math', 85);
  marksStmt.run(3, 'Science', 78);
  marksStmt.run(3, 'English', 92);
  marksStmt.run(4, 'Math', 75);
  marksStmt.run(4, 'Science', 88);
  marksStmt.run(4, 'English', 80);
  marksStmt.finalize();

  // Sample attendance data
  const attStmt = db.prepare("INSERT INTO attendance (student_id, status, date) VALUES (?, ?, ?)");
  attStmt.run(3, 'Present', '2024-04-25');
  attStmt.run(3, 'Present', '2024-04-24');
  attStmt.run(3, 'Absent', '2024-04-23');
  attStmt.run(4, 'Present', '2024-04-25');
  attStmt.run(4, 'Present', '2024-04-24');
  attStmt.finalize();

  // Sample PTM data
  const ptmStmt = db.prepare("INSERT INTO ptm (parent_id, date, message, reply) VALUES (?, ?, ?, ?)");
  ptmStmt.run(5, '2024-05-01', 'Want to discuss about exam performance', 'Yes, will see you on May 1st');
  ptmStmt.run(5, '2024-05-05', 'General update on progress', null);
  ptmStmt.finalize();

  console.log("✅ SQLite Database initialized with sample data.");
});

db.close();
