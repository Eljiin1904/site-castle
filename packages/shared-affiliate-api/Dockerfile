FROM node:23-alpine AS build
ENV NODE_ENV=devcloud \
    PORT=3000
WORKDIR /pidwin
COPY . .
RUN npm run init
WORKDIR /pidwin/packages/shared-affiliate-api
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install bcrypt
RUN npm run build

FROM node:23-alpine AS production
ENV NODE_ENV=devcloud
ENV PORT=3000
COPY --from=build /pidwin/node_modules /pidwin/node_modules
COPY --from=build /pidwin/packages/shared-affiliate-api /pidwin/packages/shared-affiliate-api
COPY --from=build /pidwin/packages/shared-core/build /pidwin/packages/shared-core/build
COPY --from=build /pidwin/packages/shared-server/build /pidwin/packages/shared-server/build

WORKDIR /pidwin/packages/shared-affiliate-api

EXPOSE 3000
CMD ["npm", "run", "start"]