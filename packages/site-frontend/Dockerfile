FROM node:23-alpine AS build
# Setting up the work directory
WORKDIR /pidwin

# Installing dependencies
COPY ./package*.json ./
COPY ./tsconfig.base.json ./

RUN echo "-------------- Begin npm install --------------"
RUN npm install --verbose
RUN echo "------------- npm install Done --------------"

COPY scripts /pidwin/scripts
COPY packages/shared-core /pidwin/packages/shared-core
COPY packages/shared-client /pidwin/packages/shared-client
COPY packages/site-frontend /pidwin/packages/site-frontend

# Execute script to build frontend
RUN npm run build-site-frontend
WORKDIR /pidwin/packages/site-frontend
RUN npm run build
# Stage 2: Production image using NGINX to serve the built static assets
FROM nginx:stable-alpine
COPY --from=build /pidwin/packages/site-frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# # Stage 1: Build stage using Node.js
# FROM node:23-alpine AS build

# # Set working directory to repository root
# WORKDIR /pidwin

# # Copy configuration files and install root-level dependencies
# COPY ./package*.json ./
# COPY ./tsconfig.base.json ./
# RUN echo "-------------- Begin npm install --------------" && \
#     npm install --verbose && \
#     npm install vite --save-dev && \
#     echo "------------- npm install Done --------------"

# # Copy the project files and packages
# COPY scripts /pidwin/scripts
# COPY packages/shared-core /pidwin/packages/shared-core
# COPY packages/shared-client /pidwin/packages/shared-client
# COPY packages/site-frontend /pidwin/packages/site-frontend

# # Run the build-site-frontend script which installs and builds shared packages
# RUN npm run build-site-frontend

# # Switch to the site-frontend directory and run its standalone build command
# WORKDIR /pidwin/packages/site-frontend
# RUN npm run build

# # Stage 2: Production image using NGINX to serve static files
# FROM nginx:stable-alpine

# # Copy the built static assets from the build stage
# COPY --from=build /pidwin/packages/site-frontend/build /usr/share/nginx/html

# # Set environment variables for production
# ENV NODE_ENV=production
# ENV PORT=80

# # Expose port 80
# EXPOSE 80

# # Start NGINX in the foreground
# CMD ["nginx", "-g", "daemon off;"]

