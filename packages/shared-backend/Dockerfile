FROM node:23-alpine
ENV NODE_ENV=devcloud \
    PORT=3000
WORKDIR /pidwin
COPY . .
RUN npm run init
WORKDIR /pidwin/packages/shared-backend
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

#  
# FROM node:23-alpine AS builder
# WORKDIR /pidwin
# ENV NODE_ENV=devcloud
# ENV PORT=3000
# COPY . .

# RUN npm run init

# WORKDIR /pidwin/packages/shared-backend

# RUN npm run build

# FROM node:23-alpine AS production
# ENV NODE_ENV=devcloud
# ENV PORT=3000
# COPY --from=build /pidwin/packages/shared-backend /pidwin/packages/shared-backend
# COPY --from=build /pidwin/scripts /pidwin/scripts
# COPY --from=build /pidwin/packages/shared-core /pidwin/packages/shared-core
# COPY --from=build /pidwin/packages/shared-client /pidwin/packages/shared-client



# RUN npm install --only=production
# EXPOSE 3000
# CMD ["npm", "run", "start"]
