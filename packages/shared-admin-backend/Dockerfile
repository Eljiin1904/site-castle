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
COPY --from=build /pidwin/node_modules ./node_modules
COPY --from=build /pidwin/packages/shared-admin-backend/build ./packages/shared-admin-backend/build
COPY --from=build /pidwin/packages/shared-admin-backend/package*.json ./packages/shared-admin-backend/
WORKDIR /pidwin/packages/shared-admin-backend
EXPOSE 3000
CMD ["npm", "run", "start"]
