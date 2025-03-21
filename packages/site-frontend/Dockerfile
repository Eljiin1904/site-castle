# Fetching the latest node image on alpine linux
FROM node:18-alpine AS development

# Declaring env
ENV NODE_ENV=devcloud

# Setting up the work directory
WORKDIR /pidwin

# Installing dependencies
COPY ./package*.json .
COPY ./tsconfig.base.json .

RUN echo "-------------- Begin npm install --------------"
RUN npm install --verbose
RUN echo "------------- npm install Done --------------"

# Copying all the files in our project
COPY ./packages/shared-core ./packages/shared-core
COPY ./packages/shared-server ./packages/shared-server
COPY ./packages/site-backend ./packages/site-backend

WORKDIR /pidwin/packages/site-backend

EXPOSE 5000

# Starting our application
CMD ["npm", "run", "dev-cloud"]