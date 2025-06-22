#!/bin/bash

echo "🔄 Starting development services..."
echo "🎯 Environment: PHP 8.3.22, Node.js 20.11.0, MySQL 8.0.42, Laravel 12.18.0, Next.js 15.3.3"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Quick version verification
echo -e "${BLUE}📋 Quick version check:${NC}"
echo -e "PHP: $(php -r 'echo PHP_VERSION;')"
echo -e "Node.js: $(node --version)"
echo -e "npm: $(npm --version)"
if [ -d "/workspace/myproject/myproject/backend" ] && [ -f "/workspace/myproject/myproject/backend/artisan" ]; then
    cd /workspace/myproject/myproject/backend
    echo -e "Laravel: $(php artisan --version | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"
    cd /workspace
fi
if [ -d "/workspace/myproject/myproject/frontend" ] && [ -f "/workspace/myproject/myproject/frontend/package.json" ]; then
    cd /workspace/myproject/myproject/frontend
    NEXTJS_VER=$(node -p "require('./package.json').dependencies.next || 'not found'" 2>/dev/null)
    echo -e "Next.js: ${NEXTJS_VER}"
    cd /workspace
fi
echo ""

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to start Laravel server
start_laravel() {
    if [ -d "/workspace/myproject/myproject/backend" ]; then
        cd /workspace/myproject/myproject/backend
        if ! check_port 8000; then
            echo -e "${BLUE}🚀 Starting Laravel development server on port 8000...${NC}"
            nohup php artisan serve --host=0.0.0.0 --port=8000 > /tmp/laravel.log 2>&1 &
            echo $! > /tmp/laravel.pid
            sleep 2
            if check_port 8000; then
                echo -e "${GREEN}✅ Laravel server started successfully${NC}"
                echo -e "   📱 Access at: https://\${CODESPACE_NAME}-8000.\${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
            else
                echo -e "${YELLOW}⚠️ Laravel server may have failed to start. Check /tmp/laravel.log${NC}"
            fi
        else
            echo -e "${YELLOW}⚠️ Laravel server already running on port 8000${NC}"
        fi
        cd /workspace
    else
        echo -e "${YELLOW}⚠️ Backend directory not found. Skipping Laravel server.${NC}"
    fi
}

# Function to start Next.js server
start_nextjs() {
    if [ -d "/workspace/myproject/myproject/frontend" ]; then
        cd /workspace/myproject/myproject/frontend
        if ! check_port 3000; then
            echo -e "${BLUE}🚀 Starting Next.js development server on port 3000...${NC}"
            nohup npm run dev > /tmp/nextjs.log 2>&1 &
            echo $! > /tmp/nextjs.pid
            sleep 3
            if check_port 3000; then
                echo -e "${GREEN}✅ Next.js server started successfully${NC}"
                echo -e "   🌐 Access at: https://\${CODESPACE_NAME}-3000.\${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
            else
                echo -e "${YELLOW}⚠️ Next.js server may have failed to start. Check /tmp/nextjs.log${NC}"
            fi
        else
            echo -e "${YELLOW}⚠️ Next.js server already running on port 3000${NC}"
        fi
        cd /workspace
    else
        echo -e "${YELLOW}⚠️ Frontend directory not found. Skipping Next.js server.${NC}"
    fi
}

# Start services
start_laravel
start_nextjs

# Create helpful status command
cat > /tmp/status.sh << 'EOFSTATUS'
#!/bin/bash
echo "🔍 Development Environment Status"
echo "🎯 Target: PHP 8.3.22 | Node.js 20.11.0 | MySQL 8.0.42 | Laravel 12.18.0 | Next.js 15.3.3"
echo ""

# Version checks
echo "📋 Current Versions:"
echo "   PHP: $(php -r 'echo PHP_VERSION;')"
echo "   Node.js: $(node --version)"
echo "   npm: $(npm --version)"

if [ -d "/workspace/myproject/myproject/backend" ] && [ -f "/workspace/myproject/myproject/backend/artisan" ]; then
    cd /workspace/myproject/myproject/backend
    echo "   Laravel: $(php artisan --version | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"
    cd /workspace
fi

if [ -d "/workspace/myproject/myproject/frontend" ] && [ -f "/workspace/myproject/myproject/frontend/package.json" ]; then
    cd /workspace/myproject/myproject/frontend
    NEXTJS_VER=$(node -p "require('./package.json').dependencies.next || 'not found'" 2>/dev/null)
    echo "   Next.js: ${NEXTJS_VER}"
    cd /workspace
fi

# Check MySQL version
if nc -z mysql 3306 2>/dev/null; then
    MYSQL_VER=$(mysql -h mysql -u root -psecret -e "SELECT VERSION();" -s -N 2>/dev/null)
    echo "   MySQL: ${MYSQL_VER}"
fi

echo ""
echo "🚀 Service Status:"

# Check Laravel
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Laravel API: Running on port 8000"
    echo "   📱 https://${CODESPACE_NAME}-8000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
else
    echo "❌ Laravel API: Not running"
fi

# Check Next.js
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Next.js Frontend: Running on port 3000"
    echo "   🌐 https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
else
    echo "❌ Next.js Frontend: Not running"
fi

# Check MySQL
if nc -z mysql 3306 2>/dev/null; then
    echo "✅ MySQL Database: Connected (version above)"
else
    echo "❌ MySQL Database: Not accessible"
fi

# Check Redis
if nc -z redis 6379 2>/dev/null; then
    echo "✅ Redis Cache: Connected"
else
    echo "❌ Redis Cache: Not accessible"
fi

echo ""
echo "💡 Useful commands:"
echo "   status          - Show this status"
echo "   start-laravel   - Start Laravel server"
echo "   start-nextjs    - Start Next.js server"
echo "   art migrate     - Run Laravel migrations"
echo "   be              - Go to backend directory"
echo "   fe              - Go to frontend directory"
EOFSTATUS

chmod +x /tmp/status.sh
sudo mv /tmp/status.sh /usr/local/bin/status

echo ""
echo -e "${GREEN}🎉 Services started! Type 'status' to check server status.${NC}"
echo ""
echo -e "${BLUE}📚 Quick Start Guide:${NC}"
echo -e "1. Both servers should be starting automatically"
echo -e "2. Laravel API will be available on port 8000"
echo -e "3. Next.js frontend will be available on port 3000"
echo -e "4. Use 'status' command to check if everything is running"
echo -e "5. Check logs at /tmp/laravel.log and /tmp/nextjs.log if needed"
