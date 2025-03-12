# Fetching the latest node image with nginx
FROM node:18-alpine AS build

# Declaring env
ENV NODE_ENV=devcloud

# Setting up the work directory
WORKDIR /pidwin

# Installing dependencies
COPY ./package*.json .
COPY ./tsconfig.base.json .

RUN echo "-------------- Begin npm install --------------"
RUN npm install --verbose
RUN echo "------------- npm install Done --------------"

# Copying all the files in our project and building
COPY . .
RUN npm run init

WORKDIR /pidwin/packages/shared-admin-frontend
RUN npm run build

# Setup server
FROM nginx:stable-alpine
COPY --from=build /pidwin/packages/shared-admin-frontend/build /usr/share/nginx/html

EXPOSE 80

# Starting our application
CMD ["nginx", "-g", "daemon off;"]