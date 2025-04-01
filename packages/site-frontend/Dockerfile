FROM node:23-alpine AS build
# Installing dependencies
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