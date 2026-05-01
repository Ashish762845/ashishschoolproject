Drop database school_system;
CREATE DATABASE school_system;
USE school_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(50)
);

CREATE TABLE schools (
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
    date DATETIME
);

CREATE TABLE homework (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT
);

CREATE TABLE ptm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT,
    teacher_id INT,
    date DATE,
    message TEXT
);
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@gmail.com', '12345', 'admin');

select * from users;
