FROM node:23-alpine AS build
ENV NODE_ENV=devcloud
ENV PORT=3000
WORKDIR /pidwin
COPY ./package*.json ./
COPY ./tsconfig.base.json ./
RUN npm install --verbose
COPY scripts /pidwin/scripts
COPY packages/shared-core /pidwin/packages/shared-core
COPY packages/shared-server /pidwin/packages/shared-server
COPY packages/shared-admin-backend /pidwin/packages/shared-admin-backend
RUN npm run build-admin-backend
WORKDIR /pidwin/packages/shared-server
RUN npm run build

FROM node:23-alpine AS production
ENV NODE_ENV=devcloud
ENV PORT=3000
WORKDIR /pidwin
COPY --from=build /pidwin/packages/shared-admin-backend /pidwin/packages/shared-admin-backend
COPY --from=build /pidwin/packages/shared-core /pidwin/packages/shared-core
COPY --from=build /pidwin/packages/shared-server /pidwin/packages/shared-server
WORKDIR /pidwin/packages/shared-admin-backend
RUN npm install --only=production
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install bcrypt
EXPOSE 3000
CMD ["npm", "run", "start"]