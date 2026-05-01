# 🎓 Smart School System

A complete full-stack school management system built with Node.js, MySQL, and WebSockets for real-time notifications.

## 📋 Features

### Admin Panel
- ✅ Manage schools
- ✅ Add users (teachers, students, parents)
- ✅ View all system users

### Teacher Panel
- ✅ Upload student marks
- ✅ Mark attendance
- ✅ Upload assignments/files
- ✅ View PTM requests from parents
- ✅ Send replies to PTM requests

### Student Panel
- ✅ View uploaded assignments
- ✅ View performance analysis
- ✅ View marks by subject (chart visualization)
- ✅ Advanced analytics (avg, min, max)
- ✅ AI-powered predictions based on grades

### Parent Panel
- ✅ View child's marks
- ✅ View child's attendance
- ✅ Book Parent-Teacher Meetings (PTM)
- ✅ View PTM status and replies

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Real-time**: Socket.IO
- **Charts**: Chart.js
- **Communication**: CORS, REST API

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm (comes with Node.js)

### Step 1: Setup Database

1. Open MySQL Workbench or MySQL Command Line
2. Run the SQL commands from `database_setup.sql`:

```bash
# Windows/Linux
mysql -u root -p < database_setup.sql

# Or paste the contents in MySQL Workbench
```

### Step 2: Install Dependencies

```bash
npm install
```

Or manually:
```bash
npm install express mysql2 cors socket.io
```

### Step 3: Configure Database Connection

Edit `server.js` and update the MySQL credentials:

```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",  // Change this
  database: "schoolDB"
});
```

### Step 4: Start the Server

```bash
node server.js
```

You should see:
```
✅ MySQL Connected
🚀 Server running on http://localhost:5000
📊 WebSocket ready for real-time notifications
```

### Step 5: Open the Application

Open `index.html` in your browser or start a local server:

```bash
# Using npx
npx http-server

# Using Python (if installed)
python -m http.server 8000

# Using Node.js
node -e "require('http').createServer((q,s)=>require('fs').createReadStream('.'+q.url).pipe(s)).listen(8000)"
```

Then navigate to: `http://localhost:8000` (adjust port if needed)

## 👤 Default Test Accounts

All passwords: `12345`

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | 12345 |
| Teacher | teacher@gmail.com | 12345 |
| Student | student@gmail.com | 12345 |
| Student2 | student2@gmail.com | 12345 |
| Parent | parent@gmail.com | 12345 |

## 📡 API Endpoints

### Authentication
- `POST /signup` - Register new user
- `POST /login` - Login user

### Admin
- `POST /school` - Add school
- `GET /users` - Get all users

### Marks
- `POST /marks` - Add marks
- `GET /marks/:id` - Get student marks

### Attendance
- `POST /attendance` - Mark attendance
- `GET /attendance/:id` - Get attendance record

### Files
- `POST /upload` - Upload file/assignment
- `GET /files` - Get all files

### PTM
- `POST /ptm` - Book PTM
- `GET /ptm` - Get all PTM requests
- `GET /ptm/:id` - Get user's PTM requests
- `POST /ptm/reply` - Send PTM reply

### Analysis
- `GET /analysis/:id` - Get student analysis

### Health Check
- `GET /health` - Server status

## 🎨 Frontend Features

### User Interface
- Modern gradient background
- Responsive design (desktop & mobile)
- Real-time toast notifications
- Smooth transitions and animations

### Data Display
- List views for marks, attendance, PTM
- Chart visualization for performance
- Analytics dashboards
- AI-powered predictions

## 🐛 Troubleshooting

### Issue: MySQL Connection Error
**Solution**: 
- Ensure MySQL is running
- Check password in server.js
- Verify database exists: `SHOW DATABASES;`

### Issue: Port 5000 Already in Use
**Solution**:
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: Frontend can't connect to backend
**Solution**:
- Ensure server.js is running
- Check browser console (F12) for errors
- Verify API URL is http://localhost:5000
- Check CORS settings in server.js

### Issue: File upload not working
**Solution**:
- Check file size (max 50MB)
- Ensure database has files table
- Check console for errors

## 🔒 Security Notes

⚠️ **Important for Production**:
- Passwords are stored in plaintext (NOT recommended for production)
- Use bcrypt or argon2 for password hashing
- Implement JWT authentication
- Use environment variables for secrets
- Add input validation and sanitization
- Enable HTTPS

## 📚 Database Schema

### Users Table
```sql
id | name | email | password | role
```

### Marks Table
```sql
id | student_id | subject | marks
```

### Attendance Table
```sql
id | student_id | status | date
```

### PTM Table
```sql
id | parent_id | date | message | reply
```

### Files Table
```sql
id | name | file (base64 encoded)
```

## 🚀 Performance Tips

1. Implement pagination for large datasets
2. Add database indexing on frequently queried fields
3. Cache frequently accessed data
4. Use connection pooling for better database performance
5. Minify CSS and JavaScript for production

## 📝 Future Enhancements

- [ ] Email notifications
- [ ] SMS alerts
- [ ] Mobile app (React Native/Flutter)
- [ ] Advanced reporting
- [ ] Bulk operations
- [ ] User roles and permissions
- [ ] Audit logging
- [ ] Payment integration
- [ ] Document management
- [ ] Video conferencing for PTM

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors (F12)
3. Check server logs for backend errors
4. Verify database structure and data

## 📄 License

This project is free to use and modify.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

---

**Happy Learning! 🎓**

Built with ❤️ for educational institutions
