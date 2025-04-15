FROM node:23-alpine AS build
ENV NODE_ENV=devcloud \
    PORT=3000
WORKDIR /pidwin
COPY . .
RUN npm run init
WORKDIR /pidwin/packages/shared-backend
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install bcrypt
RUN npm run build