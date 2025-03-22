FROM node:23-alpine
ENV NODE_ENV=devcloud \
    PORT=3000
WORKDIR /pidwin
COPY . .
RUN npm run init
WORKDIR /pidwin/packages/shared-admin-backend
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]


# FROM node:23-alpine AS builder
# ENV NODE_ENV=devcloud
# ENV PORT=3000
# WORKDIR /pidwin
# COPY . .
# RUN npm run init
# WORKDIR /pidwin/packages/shared-admin-backend
# RUN npm run build

# FROM node:23-alpine AS production
# ENV NODE_ENV=devcloud
# ENV PORT=3000
# WORKDIR /pidwin
# COPY --from=builder /pidwin/package.json ./
# COPY --from=builder /pidwin/tsconfig.json ./

# COPY --from=builder /pidwin/scripts ./
# COPY --from=builder /pidwin/packages/shared-admin-backend/* ./
# COPY --from=builder /pidwin/packages/shared-core/* ./shared-core/
# COPY --from=builder /pidwin/packages/shared-server/* ./shared-server/
# COPY --from=builder /pidwin/packages/shared-client/* ./shared-client/

# WORKDIR /pidwin/packages/shared-admin-backend
# EXPOSE 3000
# CMD ["npm", "run", "start"]
