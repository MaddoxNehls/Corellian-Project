# TodoApp - Simple Task Manager with Real-Time Sync

A modern, full-stack task management application built with ASP.NET Core, GraphQL, React, and Adobe React Spectrum, containerized with Docker.

## 🎬 **Video Demonstration**

**Watch the 5-minute video walkthrough:** https://youtu.be/CyjPVMjIFNY NOTE: YOU MAY HAVE TO WATCH IN THEATRE MODE TO SEE MY FULL CAMERA

*This video demonstrates the complete application functionality, technical implementation, and development process using AI-accelerated workflow.*

## 🚀 Features

- **Modern UI**: Built with Adobe React Spectrum for a beautiful, accessible interface
- **GraphQL API**: Efficient data fetching with Hot Chocolate GraphQL server
- **Real-time Updates**: Optimistic updates with Relay GraphQL client
- **Containerized**: Fully dockerized with Docker Compose orchestration
- **Database Persistence**: SQL Server with Entity Framework Core
- **Task Management**: Create, update status, and delete tasks
- **Responsive Design**: Works great on desktop and mobile devices

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │    │  ASP.NET Core   │    │   SQL Server    │
│                 │    │                 │    │                 │
│ • React 18      │    │ • .NET 8        │    │ • Database      │
│ • React Spectrum│◄──►│ • GraphQL API   │◄──►│ • Entity        │
│ • Relay Client  │    │ • Entity FW     │    │   Framework     │
│ • TypeScript    │    │ • Hot Chocolate │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

- Docker Desktop
- Docker Compose
- Git

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TodoApp
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend GraphQL Playground: http://localhost:5000/graphql
   - Backend Health Check: http://localhost:5000/health

## 🛠️ Development Setup

### Using Docker (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Start in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up (removes containers and volumes)
docker-compose down -v
```

### Development Mode

For development with hot reloading:

```bash
# Start only the database
docker-compose -f docker-compose.dev.yml up sqlserver -d

# Run backend locally (requires .NET 8 SDK)
cd Backend
dotnet run

# Run frontend locally (requires Node.js 18+)
cd Frontend
npm install
npm start
```

## 📁 Project Structure

```
TodoApp/
├── Backend/                 # ASP.NET Core GraphQL API
│   ├── Data/               # Entity Framework DbContext
│   ├── Models/             # Domain models
│   ├── GraphQL/            # GraphQL types, queries, mutations
│   ├── Program.cs          # Application entry point
│   ├── Dockerfile          # Backend containerization
│   └── *.csproj           # Project configuration
├── Frontend/               # React SPA
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── __generated__/  # Relay generated files
│   │   ├── RelayEnvironment.ts
│   │   └── schema.graphql
│   ├── public/            # Static assets
│   ├── Dockerfile         # Frontend containerization
│   └── package.json       # Dependencies
├── docker-compose.yml     # Production orchestration
├── docker-compose.dev.yml # Development orchestration
└── README.md             # This file
```

## 🔧 Configuration

### Environment Variables

**Backend (`appsettings.json`)**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=sqlserver;Database=TodoAppDb;User=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=true"
  }
}
```

**Frontend**
- `REACT_APP_GRAPHQL_ENDPOINT`: GraphQL API endpoint (default: http://localhost:5000/graphql)

### Database

The application uses SQL Server with Entity Framework Core:
- Automatic database creation on startup
- Seed data with sample tasks
- Connection string configured for Docker networking

## 🎯 API Endpoints

### GraphQL Schema

**Queries:**
- `allTasks`: Get all tasks
- `taskById(id: Int!)`: Get task by ID
- `tasksByStatus(status: TaskStatus!)`: Get tasks by status

**Mutations:**
- `createTask(input: CreateTaskInput!)`: Create a new task
- `updateTaskStatus(input: UpdateTaskStatusInput!)`: Update task status
- `deleteTask(id: Int!)`: Delete a task
- `updateTask(id: Int!, input: CreateTaskInput!)`: Update task details

**Types:**
```graphql
type TaskType {
  id: Int!
  title: String!
  description: String
  status: TaskStatus!
  createdAt: DateTime!
  updatedAt: DateTime
}

enum TaskStatus {
  PENDING
  COMPLETED
}
```

## 🧪 Testing

### Manual Testing

1. **Create a task**: Use the form to add a new task
2. **Toggle status**: Click the checkbox to mark as completed/pending
3. **Delete task**: Click the delete button
4. **View organization**: Tasks are grouped by status

### Health Checks

- Backend: `GET http://localhost:5000/health`
- Frontend: `GET http://localhost:3000/health`
- Database: Automatic health checks in Docker Compose

## 🔒 Security Features

- **CORS Configuration**: Properly configured for frontend access
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Entity Framework parameterized queries
- **Container Security**: Non-root users in Docker containers
- **Security Headers**: Nginx security headers for frontend

## 🚀 Deployment

### Production Deployment

1. **Environment Setup**
   ```bash
   # Set production environment variables
   export ASPNETCORE_ENVIRONMENT=Production
   export ConnectionStrings__DefaultConnection="<production-connection-string>"
   ```

2. **Deploy with Docker Compose**
   ```bash
   docker-compose up -d --build
   ```

3. **Health Monitoring**
   ```bash
   # Check service health
   docker-compose ps
   docker-compose logs
   ```

### Cloud Deployment Options

- **Azure Container Instances**
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Kubernetes clusters**

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure SQL Server container is running
   - Check connection string configuration
   - Verify network connectivity

2. **Frontend Can't Reach Backend**
   - Verify backend is running on port 5000
   - Check CORS configuration
   - Ensure GraphQL endpoint is accessible

3. **Docker Build Issues**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild images: `docker-compose build --no-cache`

### Logs and Debugging

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs sqlserver

# Follow logs in real-time
docker-compose logs -f backend
```

## 📈 Performance Optimizations

- **Frontend**: React.memo, useMemo, useCallback for optimized re-renders
- **Backend**: Entity Framework query optimization and caching
- **Database**: Proper indexing and query optimization
- **Docker**: Multi-stage builds for smaller images
- **Nginx**: Static asset caching and compression

## 🔮 Future Enhancements

- [ ] Real-time updates with SignalR
- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task sharing and collaboration
- [ ] Mobile app with React Native
- [ ] Offline support with PWA
- [ ] Task analytics and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ using modern web technologies and best practices.

---

**Tech Stack:**
- Frontend: React 18, TypeScript, Adobe React Spectrum, Relay GraphQL Client
- Backend: ASP.NET Core 8, GraphQL (Hot Chocolate), Entity Framework Core
- Database: SQL Server 2022
- Containerization: Docker, Docker Compose
- UI/UX: Modern, responsive design with accessibility features

