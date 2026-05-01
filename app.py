from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO
import mysql.connector
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ================= DATABASE =================
db = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="Arman@5403",
    database="school_system"
)

cursor = db.cursor(dictionary=True)
print("✅ MySQL Connected")

# ================= SOCKET =================
@socketio.on("connect")
def handle_connect():
    print("🔗 User Connected")

def notify(msg):
    socketio.emit("notification", msg)

# ================= AUTH =================
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    cursor.execute(
        "SELECT * FROM users WHERE email=%s AND password=%s",
        (data["email"], data["password"])
    )
    result = cursor.fetchall()

    if result:
        return jsonify({"success": True, "user": result[0]})
    return jsonify({"success": False})


@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    cursor.execute(
        "INSERT INTO users (name,email,password,role) VALUES (%s,%s,%s,%s)",
        (data["name"], data["email"], data["password"], data["role"])
    )
    db.commit()
    return "User Created"

# ================= ADMIN =================
@app.route("/school", methods=["POST"])
def add_school():
    data = request.json
    cursor.execute("INSERT INTO schools (name) VALUES (%s)", (data["name"],))
    db.commit()
    return "School Added"


@app.route("/users", methods=["GET"])
def get_users():
    cursor.execute("SELECT * FROM users")
    return jsonify(cursor.fetchall())

# ================= MARKS =================
@app.route("/marks", methods=["POST"])
def add_marks():
    data = request.json
    cursor.execute(
        "INSERT INTO marks (student_id,subject,marks) VALUES (%s,%s,%s)",
        (data["student_id"], data["subject"], data["marks"])
    )
    db.commit()
    notify("📊 Marks Uploaded")
    return "Marks Added"


@app.route("/marks/<int:id>", methods=["GET"])
def get_marks(id):
    cursor.execute("SELECT * FROM marks WHERE student_id=%s", (id,))
    return jsonify(cursor.fetchall())

# ================= ATTENDANCE =================
@app.route("/attendance", methods=["POST"])
def add_attendance():
    data = request.json
    cursor.execute(
        "INSERT INTO attendance (student_id,status,date) VALUES (%s,%s,%s)",
        (data["student_id"], data["status"], datetime.now())
    )
    db.commit()
    notify("📅 Attendance Updated")
    return "Attendance Added"


@app.route("/attendance/<int:id>", methods=["GET"])
def get_attendance(id):
    cursor.execute("SELECT * FROM attendance WHERE student_id=%s", (id,))
    return jsonify(cursor.fetchall())

# ================= HOMEWORK =================
@app.route("/homework", methods=["POST"])
def add_homework():
    data = request.json
    cursor.execute(
        "INSERT INTO homework (text) VALUES (%s)",
        (data["text"],)
    )
    db.commit()
    notify("📚 Homework Uploaded")
    return "Homework Added"

# ================= AI ANALYSIS =================
@app.route("/analysis/<int:id>", methods=["GET"])
def analysis(id):
    cursor.execute("SELECT * FROM marks WHERE student_id=%s", (id,))
    result = cursor.fetchall()

    total = 0
    min_marks = 100
    weak = ""

    for r in result:
        total += r["marks"]
        if r["marks"] < min_marks:
            min_marks = r["marks"]
            weak = r["subject"]

    avg = total / len(result) if result else 0

    return jsonify({
        "avg": avg,
        "weakSubject": weak,
        "suggestion": "Needs Improvement" if avg < 50 else "Good"
    })

# ================= PTM =================
@app.route("/ptm", methods=["POST"])
def ptm():
    data = request.json
    cursor.execute(
        "INSERT INTO ptm (parent_id,teacher_id,date,message) VALUES (%s,%s,%s,%s)",
        (data["parent_id"], data["teacher_id"], data["date"], data["message"])
    )
    db.commit()
    notify("📢 PTM Scheduled")
    return "PTM Booked"

# ================= FILE UPLOAD =================
@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    filename = str(int(datetime.now().timestamp())) + "_" + file.filename
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    notify("📁 Assignment Uploaded")
    return "File Uploaded"

# ================= START SERVER =================
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=3000, debug=True)