FROM node:23-alpine AS build
ENV NODE_ENV=devcloud 
ENV PORT=80
WORKDIR /pidwin
COPY . .
RUN npm run init

WORKDIR /pidwin/packages/site-frontend
RUN npm run build

# Setup server
FROM nginx:stable-alpine
COPY --from=build /pidwin/packages/site-frontend/build /usr/share/nginx/html

EXPOSE 80

# Starting our application
CMD ["nginx", "-g", "daemon off;"]
