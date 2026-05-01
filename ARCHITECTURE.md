# 🏗️ System Architecture & API Reference

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Browser)                      │
│  HTML5 + CSS3 + JavaScript (index.html)                    │
│  - Login/Signup                                             │
│  - 4 Role-based Dashboards                                 │
│  - Real-time Notifications                                 │
│  - Chart.js Visualizations                                 │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/REST + WebSocket
                      │ (Port 5000)
┌─────────────────────▼───────────────────────────────────────┐
│                  BACKEND (Node.js)                          │
│  Express.js Server (server.js)                             │
│  - RESTful API Endpoints                                   │
│  - Socket.IO WebSocket Server                             │
│  - Real-time Notifications                                │
│  - CORS Enabled                                           │
└─────────────────────┬───────────────────────────────────────┘
                      │ MySQL Protocol
                      │ (Port 3306)
┌─────────────────────▼───────────────────────────────────────┐
│                  DATABASE (MySQL)                           │
│  schoolDB                                                   │
│  - Users Table          - PTM Table                        │
│  - Schools Table        - Files Table                      │
│  - Marks Table          - Attendance Table                 │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Input (index.html)
        │
        ▼
Form Validation (JavaScript)
        │
        ▼
API Request (fetch)
        │
        ▼
Server Route (server.js)
        │
        ├─► Input Validation
        │
        ├─► Database Query
        │
        └─► Response + WebSocket Notification
        │
        ▼
Frontend Update (DOM)
        │
        ▼
Toast Notification
```

## Complete API Reference

### Authentication Endpoints

#### POST /signup
Register a new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "12345",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true
}
```

#### POST /login
Authenticate user

**Request:**
```json
{
  "email": "john@example.com",
  "password": "12345"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### User Management

#### GET /users
Get all users

**Response:**
```json
[
  {
    "id": 1,
    "name": "Admin",
    "email": "admin@gmail.com",
    "role": "admin"
  },
  ...
]
```

### School Management

#### POST /school
Add new school

**Request:**
```json
{
  "name": "XYZ Public School"
}
```

**Response:**
```json
{
  "success": true
}
```

### Marks Management

#### POST /marks
Add student marks

**Request:**
```json
{
  "student_id": 3,
  "subject": "Mathematics",
  "marks": 85
}
```

**Response:**
```json
{
  "success": true
}
```

#### GET /marks/:id
Get marks for specific student

**Response:**
```json
[
  {
    "id": 1,
    "student_id": 3,
    "subject": "Math",
    "marks": 85
  },
  {
    "id": 2,
    "student_id": 3,
    "subject": "Science",
    "marks": 78
  }
]
```

### Attendance Management

#### POST /attendance
Mark attendance

**Request:**
```json
{
  "student_id": 3,
  "status": "Present"
}
```

**Response:**
```json
{
  "success": true
}
```

#### GET /attendance/:id
Get attendance records

**Response:**
```json
[
  {
    "id": 1,
    "student_id": 3,
    "status": "Present",
    "date": "4/25/2024"
  }
]
```

### File Management

#### POST /upload
Upload assignment/file

**Request:**
```json
{
  "name": "Assignment_01.pdf",
  "file": "base64_encoded_file_data..."
}
```

**Response:**
```json
{
  "success": true
}
```

#### GET /files
Get all uploaded files

**Response:**
```json
[
  {
    "id": 1,
    "name": "Assignment_01.pdf"
  }
]
```

### PTM Management

#### POST /ptm
Book Parent-Teacher Meeting

**Request:**
```json
{
  "parent_id": 5,
  "date": "2024-05-01",
  "message": "Discuss exam performance"
}
```

**Response:**
```json
{
  "success": true
}
```

#### GET /ptm
Get all PTM requests

**Response:**
```json
[
  {
    "id": 1,
    "parent_id": 5,
    "date": "2024-05-01",
    "message": "Discuss exam performance",
    "reply": null
  }
]
```

#### GET /ptm/:id
Get PTM requests for specific parent

**Response:**
```json
[
  {
    "id": 1,
    "parent_id": 5,
    "date": "2024-05-01",
    "message": "Discuss exam performance",
    "reply": "See you on May 1st"
  }
]
```

#### POST /ptm/reply
Send reply to PTM request

**Request:**
```json
{
  "id": 1,
  "reply": "Yes, will see you on May 1st"
}
```

**Response:**
```json
{
  "success": true
}
```

### Analysis

#### GET /analysis/:id
Get student performance analysis

**Response:**
```json
{
  "avg": 83.5
}
```

### Health Check

#### GET /health
Check server status

**Response:**
```json
{
  "status": "Server is running",
  "time": "2024-04-30T10:30:00.000Z"
}
```

## WebSocket Events

### Client Events

**Connect:**
```javascript
const socket = io("http://localhost:5000");
```

**Listen for Notifications:**
```javascript
socket.on("notification", (msg) => {
  console.log(msg); // Example: "📊 Marks Uploaded"
});
```

### Server Emitted Events

1. `"🎉 {name} joined as {role}"` - User signup
2. `"🏫 {school_name} school added"` - School added
3. `"📊 Marks Uploaded"` - Marks added
4. `"📅 Attendance Marked"` - Attendance updated
5. `"📁 Assignment Uploaded"` - File uploaded
6. `"📢 PTM Booked"` - PTM booked
7. `"✉️ PTM Reply Sent"` - PTM reply sent

## HTTP Status Codes Used

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request |
| 400 | Bad Request | Missing required fields |
| 404 | Not Found | Endpoint doesn't exist |
| 500 | Server Error | Database error |

## Error Response Format

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## Frontend API Usage Example

```javascript
// Get student marks
fetch("http://localhost:5000/marks/3")
  .then(r => r.json())
  .then(data => {
    console.log("Marks:", data);
  })
  .catch(err => {
    console.error("Error:", err);
    showMsg("Error loading marks");
  });

// Post new marks
fetch("http://localhost:5000/marks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    student_id: 3,
    subject: "Math",
    marks: 85
  })
})
.then(r => r.json())
.then(data => {
  if(data.success) {
    showMsg("Marks uploaded!");
  }
});
```

## Database Query Examples

### Get student marks
```sql
SELECT * FROM marks WHERE student_id = 3;
```

### Get attendance for date range
```sql
SELECT * FROM attendance 
WHERE student_id = 3 
AND date BETWEEN '2024-04-01' AND '2024-04-30';
```

### Get average marks by student
```sql
SELECT student_id, AVG(marks) as avg 
FROM marks 
GROUP BY student_id;
```

### Get PTM with replies pending
```sql
SELECT * FROM ptm WHERE reply IS NULL;
```

---

This architecture allows seamless communication between frontend, backend, and database with real-time notifications!
