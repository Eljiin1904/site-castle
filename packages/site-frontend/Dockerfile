FROM node:23-alpine AS build

# Declaring env
# ENV PORT=3000

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

# TODO: make image production ready
# FROM nginx:stable-alpine
# COPY --from=build /pidwin/packages/site-frontend/build /usr/share/nginx/html
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "run", "dev-start"]