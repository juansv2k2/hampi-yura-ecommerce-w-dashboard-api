#!/bin/bash

# Hampi Yura Interview Demo Startup Script
# Starts all three components: Website, API, and Dashboard

echo "🎤 Starting Hampi Yura Interview Demo..."

# Get the local IP address
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)

if [ -z "$LOCAL_IP" ]; then
    echo "❌ Could not detect WiFi IP address"
    echo "🔧 Please check your network connection"
    echo "💡 You can manually get your IP with: ipconfig getifaddr en0"
    exit 1
fi

echo "📍 Your current network IP: $LOCAL_IP"
echo ""
echo "📱 SHARE THESE URLS WITH YOUR AUDIENCE:"
echo "🌐 E-commerce Website: http://$LOCAL_IP:3000"
echo "🔗 API Endpoints: http://$LOCAL_IP:3001"
echo "📊 Admin Dashboard: http://$LOCAL_IP:3002"
echo "🔑 Admin Login: admin@hampiyura.com / 123456"
echo ""
echo "💡 Tell your audience: 'Please connect to the same WiFi network'"
echo "📝 Copy these URLs to share:"
echo "   Website: http://$LOCAL_IP:3000"
echo "   Dashboard: http://$LOCAL_IP:3002"
echo ""
echo "🔧 Starting all three components..."

# Function to kill background processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all demo servers..."
    kill $WEBSITE_PID $API_PID $DASHBOARD_PID 2>/dev/null
    exit
}

# Set up cleanup on script exit
trap cleanup EXIT INT TERM

# Start Website server (port 3000)
echo "🚀 Starting Website server (port 3000)..."
cd Express
HOST=0.0.0.0 node app.js &
WEBSITE_PID=$!

# Start API server (port 3001)
echo "🚀 Starting API server (port 3001)..."
HOST=0.0.0.0 node api.js &
API_PID=$!

# Wait a moment for Express servers to start
sleep 3

# Start React dashboard (port 3002)
echo "🚀 Starting React dashboard (port 3002)..."
cd ../dashboard
HOST=0.0.0.0 npm start &
DASHBOARD_PID=$!

echo ""
echo "✅ All three components are running!"
echo "🌐 Website: http://$LOCAL_IP:3000"
echo "🔗 API: http://$LOCAL_IP:3001"
echo "📊 Dashboard: http://$LOCAL_IP:3002"
echo ""
echo "🎤 Ready for your interview demo! Press Ctrl+C to stop all servers."

# Wait for user to stop the demo
wait
