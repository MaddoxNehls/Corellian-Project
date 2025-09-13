@echo off
REM TodoApp Startup Script for Windows

echo 🚀 Starting TodoApp...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

REM Check if Docker daemon is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker daemon is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

REM Clean up any existing containers
echo 🧹 Cleaning up existing containers...
docker-compose down -v >nul 2>&1

REM Build and start all services
echo 🏗️ Building and starting all services...
docker-compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 15 /nobreak >nul

REM Check service health
echo 🔍 Checking service health...

REM Check backend health
curl -f http://localhost:5000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is healthy
) else (
    echo ⚠️ Backend health check failed
)

REM Check frontend health
curl -f http://localhost:3000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend is healthy
) else (
    echo ⚠️ Frontend health check failed
)

REM Display access information
echo.
echo 🎉 TodoApp is now running!
echo 📱 Frontend: http://localhost:3000
echo 🔧 GraphQL API: http://localhost:5000/graphql
echo 🏥 Backend Health: http://localhost:5000/health
echo.
echo 📊 View logs: docker-compose logs -f
echo 🛑 Stop app: docker-compose down
echo 🧹 Clean up: docker-compose down -v
echo.

REM Show running containers
echo 📦 Running containers:
docker-compose ps

pause

