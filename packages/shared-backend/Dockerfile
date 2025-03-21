FROM node:23-alpine
ENV NODE_ENV=devcloud 
ENV PORT=3000
WORKDIR /pidwin
COPY . .
RUN npm run init
WORKDIR /pidwin/packages/shared-backend
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]