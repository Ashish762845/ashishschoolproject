#!/bin/bash

echo "========================================"
echo "🎓 Smart School System - Startup Guide"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Download from: https://nodejs.org/"
    exit 1
fi

# Check if MySQL is running
echo ""
echo "Checking MySQL Connection..."
sleep 2

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing npm packages..."
    npm install express mysql2 cors socket.io
fi

echo ""
echo "========================================"
echo "✅ System Ready to Start!"
echo "========================================"
echo ""
echo "📋 Before starting, ensure:"
echo "   1. MySQL is running on localhost:3306"
echo "   2. Database 'schoolDB' exists"
echo "   3. Run database_setup.sql in MySQL"
echo ""
echo "To start the server:"
echo "   node server.js"
echo ""
echo "To run the frontend:"
echo "   Open index.html in a browser"
echo "   Or use: npx http-server"
echo ""
