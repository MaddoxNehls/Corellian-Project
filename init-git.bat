@echo off
REM Git Repository Initialization Script for Windows

echo 🔧 Initializing Git repository...

REM Initialize git repository
git init

REM Add all files
git add .

REM Create initial commit
git commit -m "Initial commit: Complete TodoApp implementation

✅ Features implemented:
- ASP.NET Core 8 backend with GraphQL API
- React 18 frontend with Adobe React Spectrum
- Relay GraphQL client for efficient data fetching
- SQL Server database with Entity Framework Core
- Docker containerization for all services
- Docker Compose orchestration
- Comprehensive documentation and startup scripts

🚀 Ready for deployment and demonstration"

echo ✅ Git repository initialized with initial commit
echo 📝 To add a remote repository:
echo    git remote add origin ^<your-repository-url^>
echo    git branch -M main
echo    git push -u origin main

pause

