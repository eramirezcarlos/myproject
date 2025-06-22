#!/bin/bash

echo "🔍 Environment Version Verification"
echo "🎯 Checking against local development environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Expected versions (matching local environment)
EXPECTED_PHP="8.3.22"
EXPECTED_NODE="v20.11.0"
EXPECTED_MYSQL="8.0.42"
EXPECTED_LARAVEL="12.18.0"
EXPECTED_NEXTJS="15.3.3"

echo -e "${BLUE}📋 Expected Versions:${NC}"
echo -e "   PHP: ${EXPECTED_PHP}"
echo -e "   Node.js: ${EXPECTED_NODE}"
echo -e "   MySQL: ${EXPECTED_MYSQL}"
echo -e "   Laravel: ${EXPECTED_LARAVEL}"
echo -e "   Next.js: ${EXPECTED_NEXTJS}"
echo ""

echo -e "${BLUE}🔎 Actual Versions:${NC}"

# Check PHP version
PHP_VERSION=$(php -r "echo PHP_VERSION;")
echo -e "   PHP: ${PHP_VERSION}"
if [[ $PHP_VERSION == $EXPECTED_PHP* ]]; then
    echo -e "   ${GREEN}✅ PHP version matches exactly${NC}"
elif [[ $PHP_VERSION == 8.3.* ]]; then
    echo -e "   ${YELLOW}⚠️ PHP minor version difference (still compatible)${NC}"
else
    echo -e "   ${RED}❌ PHP version mismatch${NC}"
fi

# Check if Zend OPcache is loaded
if php -m | grep -q "Zend OPcache"; then
    OPCACHE_VERSION=$(php -r "echo phpversion('Zend OPcache');")
    echo -e "   Zend OPcache: ${OPCACHE_VERSION}"
    echo -e "   ${GREEN}✅ Zend OPcache is enabled${NC}"
else
    echo -e "   ${RED}❌ Zend OPcache is not loaded${NC}"
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo -e "   Node.js: ${NODE_VERSION}"
if [[ $NODE_VERSION == $EXPECTED_NODE ]]; then
    echo -e "   ${GREEN}✅ Node.js version matches exactly${NC}"
elif [[ $NODE_VERSION == v20.* ]]; then
    echo -e "   ${YELLOW}⚠️ Node.js minor version difference (likely compatible)${NC}"
else
    echo -e "   ${RED}❌ Node.js version mismatch${NC}"
fi

# Check npm version
NPM_VERSION=$(npm --version)
echo -e "   npm: ${NPM_VERSION}"

# Check MySQL version (if accessible)
if nc -z mysql 3306 2>/dev/null; then
    MYSQL_VERSION=$(mysql -h mysql -u root -psecret -e "SELECT VERSION();" -s -N 2>/dev/null | cut -d'-' -f1)
    echo -e "   MySQL: ${MYSQL_VERSION}"
    if [[ $MYSQL_VERSION == $EXPECTED_MYSQL* ]]; then
        echo -e "   ${GREEN}✅ MySQL version matches${NC}"
    elif [[ $MYSQL_VERSION == 8.0.* ]]; then
        echo -e "   ${YELLOW}⚠️ MySQL minor version difference (compatible)${NC}"
    else
        echo -e "   ${RED}❌ MySQL version mismatch${NC}"
    fi
else
    echo -e "   MySQL: ${RED}❌ Not accessible${NC}"
fi

# Check Laravel version (if backend exists)
if [ -d "/workspace/myproject/myproject/backend" ] && [ -f "/workspace/myproject/myproject/backend/artisan" ]; then
    cd /workspace/myproject/myproject/backend
    LARAVEL_VERSION=$(php artisan --version | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
    echo -e "   Laravel: ${LARAVEL_VERSION}"
    if [[ $LARAVEL_VERSION == $EXPECTED_LARAVEL* ]]; then
        echo -e "   ${GREEN}✅ Laravel version matches exactly${NC}"
    elif [[ $LARAVEL_VERSION == 12.* ]]; then
        echo -e "   ${YELLOW}⚠️ Laravel minor version difference (likely compatible)${NC}"
    else
        echo -e "   ${RED}❌ Laravel version mismatch${NC}"
    fi
    cd /workspace
else
    echo -e "   Laravel: ${YELLOW}⚠️ Backend not found or artisan missing${NC}"
fi

# Check Next.js version (if frontend exists)
if [ -d "/workspace/myproject/myproject/frontend" ] && [ -f "/workspace/myproject/myproject/frontend/package.json" ]; then
    cd /workspace/myproject/myproject/frontend
    NEXTJS_VERSION=$(node -p "require('./package.json').dependencies.next || 'not found'" 2>/dev/null | sed 's/[\^~]//')
    echo -e "   Next.js: ${NEXTJS_VERSION}"
    if [[ $NEXTJS_VERSION == $EXPECTED_NEXTJS* ]]; then
        echo -e "   ${GREEN}✅ Next.js version matches exactly${NC}"
    elif [[ $NEXTJS_VERSION == 15.* ]]; then
        echo -e "   ${YELLOW}⚠️ Next.js minor version difference (likely compatible)${NC}"
    elif [[ $NEXTJS_VERSION == "not found" ]]; then
        echo -e "   ${RED}❌ Next.js not found in package.json${NC}"
    else
        echo -e "   ${RED}❌ Next.js version mismatch${NC}"
    fi
    cd /workspace
else
    echo -e "   Next.js: ${YELLOW}⚠️ Frontend not found or package.json missing${NC}"
fi

echo ""
echo -e "${BLUE}🎯 Environment Status:${NC}"

# Overall assessment
ALL_GOOD=true

# Simple compatibility check
if [[ $PHP_VERSION == 8.3.* ]] && [[ $NODE_VERSION == v20.* ]]; then
    echo -e "${GREEN}✅ Core runtime versions are compatible${NC}"
else
    echo -e "${RED}❌ Core runtime version issues detected${NC}"
    ALL_GOOD=false
fi

if [ "$ALL_GOOD" = true ]; then
    echo -e "${GREEN}🎉 Environment is ready for development!${NC}"
else
    echo -e "${YELLOW}⚠️ Some version differences detected, but development should still work${NC}"
fi

echo ""
echo -e "${BLUE}💡 Commands to check specific versions:${NC}"
echo -e "   php --version              # PHP detailed version"
echo -e "   php -m | grep OPcache      # Check OPcache"
echo -e "   node --version             # Node.js version"
echo -e "   mysql --version            # MySQL client version"
echo -e "   php artisan --version      # Laravel version"
echo -e "   npm list next              # Next.js version"
