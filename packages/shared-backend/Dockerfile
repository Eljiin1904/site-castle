FROM node:23-alpine AS builder
ENV NODE_ENV=devcloud
ENV PORT=3000
WORKDIR /pidwin
COPY . .
RUN npm run init
WORKDIR /pidwin/packages/shared-backend
RUN npm run build

FROM node:23-alpine AS production
ENV NODE_ENV=devcloud
ENV PORT=3000
WORKDIR /pidwin
RUN mkdir -p packages/shared-backend
WORKDIR /pidwin/packages/shared-backend
COPY --from=builder /pidwin/packages/shared-backend/package*.json ./
COPY --from=builder /pidwin/packages/shared-backend/build ./build
RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "run", "start"]


# FROM node:23-alpine
# ENV NODE_ENV=devcloud \
#     DB_URI="mongodb://localhost:27778/?directConnection=true" \
#     AWS_ID="" \
#     AWS_SECRET="" \
#     AWS_REGION=us-east-1 \
#     PORT=3000
# WORKDIR /pidwin
# COPY . .
# RUN npm run init
# WORKDIR /pidwin/packages/shared-backend
# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "run", "start"]