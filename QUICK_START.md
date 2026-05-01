# ⚡ Quick Start Guide - 5 Minutes Setup

## 🎯 What You Need

✅ MySQL Server (running)  
✅ Node.js installed  
✅ This project folder

## 🚀 Step-by-Step Setup

### Step 1: Setup Database (1 minute)

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
# Enter your MySQL password

# Copy and paste ALL contents of database_setup.sql file
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Create new query
3. Copy entire content of `database_setup.sql`
4. Run it (Ctrl+Enter)

### Step 2: Install Dependencies (2 minutes)

Open Command Prompt/Terminal in this folder and run:

```bash
npm install
```

### Step 3: Start the Server (1 minute)

```bash
node server.js
```

**Expected output:**
```
✅ MySQL Connected
🚀 Server running on http://localhost:5000
📊 WebSocket ready for real-time notifications
```

### Step 4: Open in Browser (1 minute)

**Option A: Using npx (Easiest)**
```bash
npx http-server
```
Then go to: `http://localhost:8080`

**Option B: Direct**
1. Right-click `index.html`
2. Open with your browser

## 🔐 Login Credentials

**Try any of these:**

```
📧 Email: admin@gmail.com | Password: 12345 (Admin)
📧 Email: teacher@gmail.com | Password: 12345 (Teacher)
📧 Email: student@gmail.com | Password: 12345 (Student)
📧 Email: parent@gmail.com | Password: 12345 (Parent)
```

## ✨ Features to Test

### As Admin:
1. Add a new school
2. Add a new user
3. View all users

### As Teacher:
1. Upload marks for a student
2. Mark attendance
3. Upload assignment files

### As Student:
1. View your marks
2. See performance analysis
3. View charts
4. Get AI prediction

### As Parent:
1. View child's marks
2. Check attendance
3. Book PTM (Parent-Teacher Meeting)
4. See PTM status

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| `Error: connect ECONNREFUSED` | MySQL not running. Start MySQL server |
| `Error: database 'schoolDB' doesn't exist` | Run database_setup.sql in MySQL |
| `Error: EADDRINUSE :::5000` | Port 5000 in use. Kill process or use different port |
| `Cannot GET /` | Make sure you're opening index.html, not server.js |

## 📁 Project Structure

```
📦 Ashish School Project
├── 📄 index.html          ← Frontend (open in browser)
├── 📄 server.js           ← Backend (run with node)
├── 📄 package.json        ← Dependencies
├── 📄 database_setup.sql  ← Database (run in MySQL)
├── 📄 README.md           ← Full documentation
├── 📄 SETUP.md            ← Detailed setup
└── 📄 database_setup.sql  ← Database schema
```

## 🎮 What Each Role Can Do

### 👨‍💼 Admin
- Manage schools and users
- View all system data

### 👨‍🏫 Teacher  
- Upload student marks
- Mark attendance
- Upload assignments
- Respond to PTM requests

### 👨‍🎓 Student
- View assignments
- See performance analysis
- View marks and charts
- Get AI predictions

### 👨‍👩‍👧 Parent
- View child's marks
- Check attendance
- Book meetings with teacher
- Track meeting status

## ⚙️ Configuration

To change database password:

Edit `server.js` line ~18:
```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",  // Change here
  database: "schoolDB"
});
```

## 📊 Sample Data

The database comes pre-loaded with:
- ✅ 5 sample users (admin, teacher, 2 students, parent)
- ✅ 6 sample marks records
- ✅ 5 sample attendance records
- ✅ 2 sample PTM requests

## 🆘 Need More Help?

1. **Full Setup Guide**: See `SETUP.md`
2. **Complete Docs**: See `README.md`
3. **Database Issues**: Check `database_setup.sql`
4. **API Issues**: Check browser console (F12)

## 🎯 Next Steps

1. ✅ Complete the setup above
2. ✅ Login with test credentials
3. ✅ Explore each role's features
4. ✅ Test all buttons and functions
5. ✅ Customize for your school

---

**You're ready to go! 🚀**

If you face any issues, check the troubleshooting section or review README.md
