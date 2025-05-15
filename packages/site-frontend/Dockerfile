FROM node:23-alpine AS build
# Installing dependencies

# Define BUILD_ENV as an argument that can be passed during docker build
ARG BUILD_ENV=devcloud
# Set VITE_BUILD_ENV environment variable from the BUILD_ENV build argument
ENV VITE_BUILD_ENV=$BUILD_ENV

WORKDIR /pidwin
COPY ./package*.json ./
COPY ./tsconfig.base.json ./

COPY scripts /pidwin/scripts
COPY packages/shared-core /pidwin/packages/shared-core
COPY packages/shared-client /pidwin/packages/shared-client
COPY packages/site-frontend /pidwin/packages/site-frontend

# Execute script to build frontend
RUN npm run build-site-frontend

# Stage 2: Production image using NGINX to serve the built static assets
FROM nginx:stable-alpine
COPY --from=build /pidwin/packages/site-frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /pidwin/packages/site-frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
