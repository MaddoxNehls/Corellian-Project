# Use Node.js 18 Alpine as the base image for building
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variable for GraphQL endpoint
ENV REACT_APP_GRAPHQL_ENDPOINT=http://backend:5000/graphql

# Build the React application
RUN npm run build

# Use Nginx Alpine for serving the built application
FROM nginx:alpine AS runtime

# Copy the built application from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactjs -u 1001

# Change ownership of the nginx directories
RUN chown -R reactjs:nodejs /var/cache/nginx && \
    chown -R reactjs:nodejs /var/log/nginx && \
    chown -R reactjs:nodejs /etc/nginx/conf.d

# Create pid file with correct permissions
RUN touch /var/run/nginx.pid && \
    chown -R reactjs:nodejs /var/run/nginx.pid

# Switch to non-root user
USER reactjs

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

