FROM node:23-alpine AS build
# Setting up the work directory
WORKDIR /pidwin
ENV NODE_ENV=devcloud
# Installing dependencies
COPY ./package*.json ./
COPY ./tsconfig.base.json ./

RUN echo "-------------- Begin npm install --------------"
RUN npm install --verbose
RUN echo "------------- npm install Done --------------"

COPY scripts /pidwin/scripts
COPY packages/shared-core /pidwin/packages/shared-core
COPY packages/shared-client /pidwin/packages/shared-client
COPY packages/shared-admin-frontend /pidwin/packages/shared-admin-frontend

# Execute script to build frontend
RUN npm run build-site-frontend
WORKDIR /pidwin/packages/shared-admin-frontend
RUN npm run build
# Stage 2: Production image using NGINX to serve the built static assets
FROM nginx:stable-alpine
COPY --from=build /pidwin/packages/shared-admin-frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
