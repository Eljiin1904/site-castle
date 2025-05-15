FROM node:23-alpine AS build
ENV NODE_ENV=devcloud

# Define BUILD_ENV as an argument that can be passed during docker build
ARG BUILD_ENV=development # Or use 'devcloud' as default if that's more appropriate here
# Set VITE_BUILD_ENV environment variable from the BUILD_ENV build argument
ENV VITE_BUILD_ENV=$BUILD_ENV

WORKDIR /pidwin
COPY ./package*.json ./
COPY ./tsconfig.base.json ./
RUN npm install --verbose
COPY scripts /pidwin/scripts
COPY packages/shared-core /pidwin/packages/shared-core
COPY packages/shared-client /pidwin/packages/shared-client
COPY packages/shared-admin-frontend /pidwin/packages/shared-admin-frontend
RUN npm run build-admin-frontend
# WORKDIR /pidwin/packages/shared-admin-frontend
# RUN npm run build

FROM nginx:stable-alpine
ENV NODE_ENV=devcloud
COPY --from=build /pidwin/packages/shared-admin-frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
