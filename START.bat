@echo off
echo ========================================
echo 🎓 Smart School System - Startup Guide
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js is not installed!
    echo 📥 Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if MySQL is running
echo.
echo Checking MySQL Connection...
timeout /t 2 /nobreak >nul

REM Install dependencies if needed
if not exist "node_modules" (
    echo.
    echo 📦 Installing npm packages...
    call npm install express mysql2 cors socket.io
)

echo.
echo ========================================
echo ✅ System Ready to Start!
echo ========================================
echo.
echo 📋 Before starting, ensure:
echo    1. MySQL is running on localhost:3306
echo    2. Database 'schoolDB' exists
echo    3. Run database_setup.sql in MySQL
echo.
echo To start the server:
echo    node server.js
echo.
echo To run the frontend:
echo    Open index.html in a browser
echo    Or use: npx http-server
echo.
pause
