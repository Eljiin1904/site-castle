FROM node:23-alpine AS build
ENV NODE_ENV=devcloud
ENV PORT=3000
WORKDIR /pidwin
COPY . .
RUN npm run init
WORKDIR /pidwin/packages/shared-admin-backend
RUN npm run build

FROM node:23-alpine AS production
ENV NODE_ENV=devcloud
ENV PORT=3000
WORKDIR /pidwin
RUN mkdir -p packages/shared-admin-backend
WORKDIR /pidwin/packages/shared-admin-backend
COPY --from=build /pidwin/packages/shared-admin-backend/package*.json ./
COPY --from=build /pidwin/packages/shared-admin-backend/build ./build
RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "run", "start"]

