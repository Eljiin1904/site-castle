FROM node:23-alpine AS build
ENV NODE_ENV=devcloud
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
