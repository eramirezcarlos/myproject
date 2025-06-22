# 🚀 GitHub Codespaces Setup for Laravel + Next.js SPA

This repository is configured to work seamlessly with GitHub Codespaces, providing a complete development environment in the cloud that **exactly matches** the local development environment.

## 🎯 **Exact Version Matching**

This Codespaces configuration replicates these exact versions:

| Component | Version | Purpose |
|-----------|---------|---------|
| **PHP** | 8.3.22 | Backend runtime with Zend Engine v4.3.22 |
| **Zend OPcache** | v8.3.22 | PHP performance acceleration |
| **Node.js** | v20.11.0 | Frontend runtime and build tools |
| **MySQL** | 8.0.42 | Database server |
| **Laravel** | 12.18.0 | Backend framework |
| **Next.js** | 15.3.3 | Frontend framework with TypeScript |

> **Zero Environment Drift**: Your Codespace will be 100% identical to your local setup!

### **VS Code Extensions**
- Laravel Blade syntax highlighting
- PHP IntelliSense (Intelephense)
- Laravel Artisan integration
- Tailwind CSS IntelliSense
- Prettier code formatting
- ESLint for JavaScript/TypeScript
- GitLens for Git integration

### **Automatic Setup**
- ✅ Laravel dependencies installed
- ✅ Next.js dependencies installed
- ✅ Database configured and migrated
- ✅ Environment variables set up
- ✅ Development servers ready to start

## 🎯 Quick Start

### **Option 1: Create New Codespace**
1. Click the green "Code" button on GitHub
2. Select "Codespaces" tab
3. Click "Create codespace on [branch-name]"
4. Wait for the environment to build (2-3 minutes)
5. Both servers will start automatically!

### **Option 2: Use GitHub CLI**
```bash
gh codespace create --repo your-username/your-repo
```

## 🖥️ Accessing Your Application

Once the Codespace is ready, you'll have two applications running:

### **Laravel API Backend**
- **Port:** 8000
- **URL:** `https://{codespace-name}-8000.{domain}`
- **Purpose:** API endpoints, authentication, database

### **Next.js Frontend**
- **Port:** 3000  
- **URL:** `https://{codespace-name}-3000.{domain}`
- **Purpose:** React SPA, user interface

> GitHub will automatically provide the URLs and may open them in new tabs.

## 🛠️ Helpful Commands

The Codespace includes several aliases and commands to make development easier:

### **Server Management**
```bash
status              # Check status of all services
start-laravel       # Start Laravel development server
start-nextjs        # Start Next.js development server
```

### **Laravel Commands**
```bash
art                 # Alias for php artisan
art migrate         # Run database migrations
art tinker          # Open Laravel Tinker REPL
serve              # Start Laravel server manually
```

### **Next.js Commands**
```bash
dev                # Start Next.js development server
build              # Build Next.js for production
start              # Start Next.js production server
```

### **Navigation**
```bash
be                 # Navigate to backend directory
fe                 # Navigate to frontend directory
ll                 # List files with details
```

## 🔧 Environment Configuration

### **Laravel Backend (.env)**
The setup automatically configures:
```env
DB_HOST=mysql
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=secret
REDIS_HOST=redis
APP_URL=https://{codespace-name}-8000.{domain}
FRONTEND_URL=https://{codespace-name}-3000.{domain}
SANCTUM_STATEFUL_DOMAINS={codespace-name}-3000.{domain}
```

### **Next.js Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=https://{codespace-name}-8000.{domain}
```

> These are automatically generated based on your Codespace URL.

## 🔍 Troubleshooting

### **Services Not Starting**
1. Check service status: `status`
2. View logs: 
   - Laravel: `tail -f /tmp/laravel.log`
   - Next.js: `tail -f /tmp/nextjs.log`
3. Restart manually:
   - Laravel: `start-laravel`
   - Next.js: `start-nextjs`

### **Database Issues**
```bash
# Check MySQL connection
mysql -h mysql -u root -psecret -e "SHOW DATABASES;"

# Re-run migrations
cd backend && art migrate
```

### **Permission Issues**
```bash
# Fix file permissions
sudo chown -R vscode:vscode /workspace
```

### **Port Already in Use**
```bash
# Kill processes on specific ports
pkill -f "php artisan serve"
pkill -f "npm run dev"
```

## 🔐 Security Notes

- **Database**: MySQL runs in container, not accessible from internet
- **Redis**: Cache server runs in container, isolated
- **Environment**: All sensitive data stays in Codespace
- **HTTPS**: All URLs are automatically HTTPS-enabled
- **CORS**: Properly configured for SPA authentication

## 🏗️ Development Workflow

### **Typical Development Session**
1. Open Codespace (or resume existing one)
2. Run `status` to check if servers are running
3. Start coding! Hot reload works for both Laravel and Next.js
4. Use browser preview for testing
5. Commit changes using built-in Git integration

### **Working with Branches**
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature
```

### **Database Operations**
```bash
# Create migration
art make:migration create_posts_table

# Run migrations
art migrate

# Seed database
art db:seed

# Rollback migration
art migrate:rollback
```

## 📁 Project Structure

```
/workspace/
├── .devcontainer/          # Codespace configuration
│   ├── devcontainer.json   # Main config
│   ├── docker-compose.yml  # Services definition
│   ├── Dockerfile          # Custom container
│   ├── setup.sh           # Initial setup script
│   └── start-services.sh   # Service startup script
├── backend/               # Laravel API
│   ├── app/
│   ├── routes/
│   ├── .env
│   └── ...
├── frontend/              # Next.js SPA
│   ├── src/
│   ├── .env.local
│   └── ...
└── .gitignore
```

## 🤝 Contributing

When working in a team:

1. **Always use Codespaces** for consistent environment
2. **Check `status`** before starting work
3. **Test both frontend and backend** before pushing
4. **Include migrations** in your commits if database changes
5. **Update documentation** if adding new features

## 💡 Pro Tips

- Use `Ctrl+Shift+P` to access VS Code command palette
- The terminal supports multiple tabs - use them!
- Extensions auto-install, but you can add more via Extensions panel
- Codespace sleeps after 30min idle, but resumes quickly
- All changes are auto-saved to GitHub

## 🆘 Need Help?

- **VS Code Issues**: Try `F1` > "Developer: Reload Window"
- **Container Issues**: Rebuild with `F1` > "Codespaces: Rebuild Container"
- **Database Reset**: Delete container and create new Codespace
- **Performance**: Close unused tabs and restart Codespace if needed

---

**Happy Coding! 🎉**

> This Codespace setup provides a production-like environment with enterprise-level tools and configuration. Perfect for development, testing, and collaboration!
