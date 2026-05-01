const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files (index.html, etc.)

const db = new sqlite3.Database("school.db", (err) => {
  if (err) {
    console.error("❌ SQLite Error:", err.message);
  } else {
    console.log("✅ SQLite Connected");
  }
});



// ================= SOCKET =================

io.on("connection", (socket) => {
  console.log("🔗 User Connected");
});

// ================= HELPER =================

function handleError(res, err, context) {
  console.error("❌", context, err);
  res.status(500).json({ success: false, error: context });
}

// ===================================================
// 🔐 AUTH SECTION
// ===================================================

// 🔥 LOGIN + AUTO REGISTER
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  db.get("SELECT * FROM users WHERE email=?", [email], (err, user) => {

    if (err) return handleError(res, err, "Login");

    if (!user) {
      return res.json({ success: false, error: "User not found" });
    }

    // ✅ SIMPLE PASSWORD CHECK
    if (password !== user.password) {
      return res.json({ success: false, error: "Wrong password" });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  });
});


// 🔥 REGISTER (MANUAL)
app.post("/signup", (req, res) => {

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.json({ success: false, error: "All fields required" });
  }

  db.run(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name, email, password, role],
    function(err) {

      if (err) {
        console.log("DB ERROR:", err);
        return res.json({ success: false, error: err.message });
      }

      res.json({ success: true });
    }
  );
});
// GET USERS
app.get("/users", (req, res) => {
  db.all("SELECT id,name,email,role FROM users", [], (err, result) => {
    if (err) return handleError(res, err, "Get Users");
    res.json(result);
  });
});


// ===================================================
// 🏫 SCHOOL
// ===================================================

app.post("/school", (req, res) => {
  db.run("INSERT INTO school (name) VALUES (?)",
    [req.body.name],
    (err) => {
      if (err) return handleError(res, err, "Add School");
      io.emit("notification", "🏫 School Added");
      res.json({ success: true });
    });
});


// ===================================================
// 📊 MARKS
// ===================================================

app.post("/marks", (req, res) => {
  const { student_id, subject, marks } = req.body;

  db.run(
    "INSERT INTO marks (student_id,subject,marks) VALUES (?,?,?)",
    [student_id, subject, marks],
    (err) => {
      if (err) return handleError(res, err, "Add Marks");
      io.emit("notification", "📊 Marks Uploaded");
      res.json({ success: true });
    });
});

app.get("/marks/:id", (req, res) => {
  db.all("SELECT * FROM marks WHERE student_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return handleError(res, err, "Get Marks");
      res.json(result);
    });
});


// ===================================================
// 📅 ATTENDANCE
// ===================================================

app.post("/attendance", (req, res) => {
  const date = new Date().toISOString().slice(0,10);

  db.run(
    "INSERT INTO attendance (student_id,status,date) VALUES (?,?,?)",
    [req.body.student_id, req.body.status, date],
    (err) => {
      if (err) return handleError(res, err, "Attendance");
      io.emit("notification", "📅 Attendance Marked");
      res.json({ success: true });
    });
});

app.get("/attendance/:id", (req, res) => {
  db.all("SELECT * FROM attendance WHERE student_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return handleError(res, err, "Get Attendance");
      res.json(result || []);
    });
});


// ===================================================
// 📈 ANALYSIS
// ===================================================

app.get("/analysis/:id", (req, res) => {
  db.get(
    "SELECT AVG(marks) as avg FROM marks WHERE student_id=?",
    [req.params.id],
    (err, result) => {
      res.json({ avg: result ? result.avg : 0 });
    });
});


// ===================================================
// 📁 FILES
// ===================================================

app.post("/upload", (req, res) => {
  db.run(
    "INSERT INTO files (name,file) VALUES (?,?)",
    [req.body.name, req.body.file],
    (err) => {
      if (err) return handleError(res, err, "Upload File");
      io.emit("notification", "📁 File Uploaded");
      res.json({ success: true });
    });
});

app.get("/files", (req, res) => {
  db.all("SELECT id,name,file FROM files", [],
    (err, result) => {
      if (err) return handleError(res, err, "Get Files");
      res.json(result);
    });
});


// ===================================================
// 📢 PTM
// ===================================================

app.post("/ptm", (req, res) => {
  db.run(
    "INSERT INTO ptm (parent_id,message,date) VALUES (?,?,?)",
    [req.body.parent_id, req.body.message, req.body.date],
    (err) => {
      if (err) return handleError(res, err, "Book PTM");
      io.emit("notification", "📢 PTM Booked");
      res.json({ success: true });
    });
});

app.get("/ptm", (req, res) => {
  db.all("SELECT * FROM ptm", [],
    (err, result) => {
      if (err) return handleError(res, err, "Get PTM");
      res.json(result);
    });
});

app.get("/ptm/:id", (req, res) => {
  db.all(
    "SELECT * FROM ptm WHERE parent_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return handleError(res, err, "Get Parent PTM");
      res.json(result);
    });
});

app.post("/ptm/reply", (req, res) => {
  db.run(
    "UPDATE ptm SET reply=? WHERE id=?",
    [req.body.reply, req.body.id],
    (err) => {
      if (err) return handleError(res, err, "Reply PTM");
      io.emit("notification", "✉️ PTM Reply Sent");
      res.json({ success: true });
    });
});


// ===================================================
// 🚀 SERVER
// ===================================================

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});