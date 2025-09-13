# Use the official .NET 8 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory
WORKDIR /src

# Copy the project file and restore dependencies
COPY TodoApp.Api.csproj .
RUN dotnet restore TodoApp.Api.csproj

# Copy the rest of the application files
COPY . .

# Build the application
RUN dotnet build TodoApp.Api.csproj -c Release -o /app/build

# Publish the application
RUN dotnet publish TodoApp.Api.csproj -c Release -o /app/publish

# Use the official .NET 8 runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Set the working directory
WORKDIR /app

# Copy the published application from the build stage
COPY --from=build /app/publish .

# Expose the port the application runs on
EXPOSE 80
EXPOSE 443
EXPOSE 5000

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

# Create a non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
RUN chown -R appuser:appgroup /app
USER appuser

# Set the entry point
ENTRYPOINT ["dotnet", "TodoApp.Api.dll"]

