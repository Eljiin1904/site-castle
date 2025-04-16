FROM 183631306381.dkr.ecr.us-east-1.amazonaws.com/pidwin/castle-base AS build
ENV NODE_ENV=devcloud \
    PORT=3000
WORKDIR /pidwin/packages/shared-backend
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install bcrypt
RUN npm run build

FROM node:23-alpine AS production
ENV NODE_ENV=devcloud
ENV PORT=3000
COPY --from=build /pidwin/node_modules /pidwin/node_modules
COPY --from=build /pidwin/packages/shared-backend /pidwin/packages/shared-backend
COPY --from=build /pidwin/packages/shared-core /pidwin/packages/shared-core
COPY --from=build /pidwin/packages/shared-server /pidwin/packages/shared-server

WORKDIR /pidwin/packages/shared-backend

EXPOSE 3000
CMD ["npm", "run", "start"]
