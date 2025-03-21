FROM node:23-alpine AS builder
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
WORKDIR /pidwin/packages/shared-backend
COPY --from=builder /pidwin/packages/shared-admin-backend/* ./
COPY --from=builder /pidwin/packages/shared-core/* ./
COPY --from=builder /pidwin/packages/shared-server/* ./
COPY --from=builder /pidwin/packages/shared-client/* ./

RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "run", "start"]
