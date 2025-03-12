# Fetching the latest node image on alpine linux
FROM node:18-alpine AS development

# Declaring env
ENV NODE_ENV=devcloud
ENV PORT=3001

# Setting up the work directory
WORKDIR /pidwin

# Installing dependencies
COPY ./package*.json .
# COPY ./tsconfig.base.json .
COPY ./tsconfig.json .

RUN echo "-------------- Begin npm install --------------"
RUN npm install --verbose
RUN echo "------------- npm install Done --------------"

# Copying all the files in our project
COPY ./packages/shared-core ./packages/shared-core
COPY ./packages/shared-server ./packages/shared-server
COPY ./packages/shared-admin-backend ./packages/shared-admin-backend

WORKDIR /pidwin/packages/shared-admin-backend

EXPOSE 3001

# Starting our application
CMD ["npm", "run", "dev-start"]
