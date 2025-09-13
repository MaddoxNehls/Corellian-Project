#!/bin/bash

# TodoApp Startup Script
echo "🚀 Starting TodoApp..."

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running. Please start Docker Desktop."
    exit 1
fi

# Clean up any existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose down -v 2>/dev/null || true

# Build and start all services
echo "🏗️ Building and starting all services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service health
echo "🔍 Checking service health..."

# Check backend health
if curl -f http://localhost:5000/health &> /dev/null; then
    echo "✅ Backend is healthy"
else
    echo "⚠️ Backend health check failed"
fi

# Check frontend health  
if curl -f http://localhost:3000/health &> /dev/null; then
    echo "✅ Frontend is healthy"
else
    echo "⚠️ Frontend health check failed"
fi

# Display access information
echo ""
echo "🎉 TodoApp is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 GraphQL API: http://localhost:5000/graphql"
echo "🏥 Backend Health: http://localhost:5000/health"
echo ""
echo "📊 View logs: docker-compose logs -f"
echo "🛑 Stop app: docker-compose down"
echo "🧹 Clean up: docker-compose down -v"
echo ""

# Show running containers
echo "📦 Running containers:"
docker-compose ps

