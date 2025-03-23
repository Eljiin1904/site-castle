# Stage 1: Build stage using Node.js
FROM node:23-alpine AS build

# Set working directory
WORKDIR /pidwin

# Copy configuration and install dependencies
COPY ./package*.json ./
COPY ./tsconfig.base.json ./
RUN echo "-------------- Begin npm install --------------" && \
    npm install --verbose && \
    echo "------------- npm install Done --------------"

# Copy the remaining source files
COPY scripts /pidwin/scripts
COPY packages/shared-core /pidwin/packages/shared-core
COPY packages/shared-client /pidwin/packages/shared-client
COPY packages/site-frontend /pidwin/packages/site-frontend

# Build the production assets for the frontend
RUN npm run build-site-frontend

# Stage 2: Production image using NGINX to serve static files
FROM nginx:stable-alpine

# Copy the built static assets from the build stage
COPY --from=build /pidwin/packages/site-frontend/build /usr/share/nginx/html

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=80

# Expose port 80
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]


# FROM node:23-alpine AS build

# # Declaring env
# # ENV PORT=3000

# # Setting up the work directory
# WORKDIR /pidwin

# # Installing dependencies
# COPY ./package*.json ./
# COPY ./tsconfig.base.json ./

# RUN echo "-------------- Begin npm install --------------"
# RUN npm install --verbose
# RUN echo "------------- npm install Done --------------"

# COPY scripts /pidwin/scripts
# COPY packages/shared-core /pidwin/packages/shared-core
# COPY packages/shared-client /pidwin/packages/shared-client
# COPY packages/site-frontend /pidwin/packages/site-frontend

# # Execute script to build frontend
# RUN npm run build-site-frontend
# WORKDIR /pidwin/packages/site-frontend

# # TODO: make image production ready
# # FROM nginx:stable-alpine
# # COPY --from=build /pidwin/packages/site-frontend/build /usr/share/nginx/html
# EXPOSE 80
# # CMD ["nginx", "-g", "daemon off;"]
# CMD ["npm", "run", "dev-start"]