#!/bin/bash

echo "🚀 Setting up Laravel + Next.js development environment..."
echo "📋 Target versions: PHP 8.3.22, Node.js 20.11.0, Laravel 12.18.0, Next.js 15.3.3"

# Navigate to workspace
cd /workspace

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verify versions match local environment
echo -e "${BLUE}🔍 Verifying environment versions...${NC}"

# Check PHP version
PHP_VERSION=$(php -r "echo PHP_VERSION;")
echo -e "PHP Version: ${PHP_VERSION}"
if [[ $PHP_VERSION == 8.3.* ]]; then
    echo -e "${GREEN}✅ PHP version matches (8.3.x)${NC}"
else
    echo -e "${RED}⚠️ PHP version mismatch. Expected 8.3.x, got ${PHP_VERSION}${NC}"
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo -e "Node.js Version: ${NODE_VERSION}"
if [[ $NODE_VERSION == "v20.11.0" ]]; then
    echo -e "${GREEN}✅ Node.js version matches exactly${NC}"
else
    echo -e "${YELLOW}⚠️ Node.js version close. Expected v20.11.0, got ${NODE_VERSION}${NC}"
fi

# Check npm version
NPM_VERSION=$(npm --version)
echo -e "npm Version: ${NPM_VERSION}"

echo -e "${BLUE}📦 Installing Laravel backend dependencies...${NC}"
if [ -d "backend" ]; then
    cd backend
    
    # Install Composer dependencies
    composer install --no-interaction --prefer-dist --optimize-autoloader
    
    # Verify Laravel version
    if [ -f "artisan" ]; then
        LARAVEL_VERSION=$(php artisan --version | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
        echo -e "Laravel Version: ${LARAVEL_VERSION}"
        if [[ $LARAVEL_VERSION == 12.18.0* ]] || [[ $LARAVEL_VERSION == 12.* ]]; then
            echo -e "${GREEN}✅ Laravel version matches (12.x)${NC}"
        else
            echo -e "${YELLOW}⚠️ Laravel version: ${LARAVEL_VERSION} (expected 12.18.0)${NC}"
        fi
    fi
    
    # Copy .env.example to .env if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ Created .env file${NC}"
    fi
    
    # Generate application key
    php artisan key:generate --no-interaction
    
    # Set up database configuration for Codespaces
    sed -i 's/DB_HOST=127.0.0.1/DB_HOST=mysql/' .env
    sed -i 's/DB_DATABASE=laravel/DB_DATABASE=laravel/' .env
    sed -i 's/DB_USERNAME=root/DB_USERNAME=root/' .env
    sed -i 's/DB_PASSWORD=/DB_PASSWORD=secret/' .env
    
    # Set up Redis configuration
    sed -i 's/REDIS_HOST=127.0.0.1/REDIS_HOST=redis/' .env
    
    # Set CORS configuration for Codespaces
    echo "" >> .env
    echo "# Codespaces Configuration" >> .env
    echo "APP_URL=https://\${CODESPACE_NAME}-8000.\${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}" >> .env
    echo "FRONTEND_URL=https://\${CODESPACE_NAME}-3000.\${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}" >> .env
    echo "SANCTUM_STATEFUL_DOMAINS=\${CODESPACE_NAME}-3000.\${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}" >> .env
    
    # Wait for MySQL to be ready
    echo -e "${YELLOW}⏳ Waiting for MySQL to be ready...${NC}"
    while ! mysql -h mysql -u root -psecret -e "SELECT 1" >/dev/null 2>&1; do
        sleep 1
    done
    
    # Run migrations
    php artisan migrate --no-interaction --force
    echo -e "${GREEN}✅ Database migrations completed${NC}"
    
    cd ..
else
    echo -e "${YELLOW}⚠️ Backend directory not found. Skipping Laravel setup.${NC}"
fi

echo -e "${BLUE}📦 Installing Next.js frontend dependencies...${NC}"
if [ -d "frontend" ]; then
    cd frontend
    
    # Check if package.json exists and verify Next.js version
    if [ -f "package.json" ]; then
        NEXTJS_VERSION=$(node -p "require('./package.json').dependencies.next || 'not found'")
        echo -e "Next.js Version in package.json: ${NEXTJS_VERSION}"
        
        # Install npm dependencies
        npm install
        
        # Verify Next.js version after installation
        INSTALLED_NEXTJS=$(npm list next --depth=0 2>/dev/null | grep next@ | sed 's/.*next@//' | sed 's/ .*//')
        if [[ $INSTALLED_NEXTJS == 15.3.3* ]]; then
            echo -e "${GREEN}✅ Next.js 15.3.3 installed correctly${NC}"
        else
            echo -e "${YELLOW}⚠️ Next.js version: ${INSTALLED_NEXTJS} (expected 15.3.3)${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️ package.json not found. Installing Next.js 15.3.3...${NC}"
        npm init -y
        npm install next@15.3.3 react@latest react-dom@latest typescript@latest
        npm install --save-dev @types/react @types/react-dom @types/node eslint eslint-config-next
    fi
    
    # Create .env.local if it doesn't exist
    if [ ! -f ".env.local" ]; then
        echo "NEXT_PUBLIC_API_URL=https://\${CODESPACE_NAME}-8000.\${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}" > .env.local
        echo -e "${GREEN}✅ Created .env.local file${NC}"
    fi
    
    cd ..
else
    echo -e "${YELLOW}⚠️ Frontend directory not found. Skipping Next.js setup.${NC}"
fi

# Set up Git configuration helper
echo -e "${BLUE}🔧 Setting up Git configuration...${NC}"
git config --global --add safe.directory /workspace

# Create helpful aliases
echo -e "${BLUE}📝 Setting up helpful aliases...${NC}"
cat >> ~/.bashrc << 'EOFBASH'

# Laravel aliases
alias art='php artisan'
alias artisan='php artisan'
alias serve='php artisan serve --host=0.0.0.0 --port=8000'
alias migrate='php artisan migrate'
alias tinker='php artisan tinker'

# Next.js aliases
alias dev='npm run dev'
alias build='npm run build'
alias start='npm start'

# Navigation aliases
alias be='cd /workspace/myproject/myproject/backend'
alias fe='cd /workspace/myproject/myproject/frontend'
alias ll='ls -la'

# Development shortcuts
alias start-laravel='cd /workspace/myproject/myproject/backend && php artisan serve --host=0.0.0.0 --port=8000'
alias start-nextjs='cd /workspace/myproject/myproject/frontend && npm run dev'

EOFBASH

# Make the start script executable
chmod +x /workspace/myproject/.devcontainer/start-services.sh
chmod +x /workspace/myproject/.devcontainer/verify-versions.sh

# Add version verification command to PATH
sudo ln -sf /workspace/myproject/.devcontainer/verify-versions.sh /usr/local/bin/verify-versions

echo -e "${GREEN}🎉 Setup completed! Your development environment is ready.${NC}"
echo -e "${BLUE}💡 Quick commands:${NC}"
echo -e "  • ${YELLOW}status${NC} - Check server status and versions"
echo -e "  • ${YELLOW}verify-versions${NC} - Detailed version verification"
echo -e "  • ${YELLOW}start-laravel${NC} - Start Laravel development server"
echo -e "  • ${YELLOW}start-nextjs${NC} - Start Next.js development server"
echo -e "  • ${YELLOW}be${NC} - Navigate to backend directory"
echo -e "  • ${YELLOW}fe${NC} - Navigate to frontend directory"
echo -e "  • ${YELLOW}art migrate${NC} - Run Laravel migrations"
