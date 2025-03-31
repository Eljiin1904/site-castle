FROM node:23-alpine AS build
ENV NODE_ENV=devcloud
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
WORKDIR /pidwin/packages/site-frontend
EXPOSE 80
CMD ["npm", "run", "start", "--", "--port", "80", "--host"]