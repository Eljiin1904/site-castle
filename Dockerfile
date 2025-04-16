FROM node:23-alpine AS build
ENV NODE_ENV=devcloud \
    PORT=3000
WORKDIR /pidwin
COPY . .
RUN npm run init