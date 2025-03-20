# Use Node 23 on Alpine
FROM node:23-alpine

# Set environment
ENV NODE_ENV=devcloud
ENV PORT=3000

# 1) Set the working directory at the "root" of the repo
WORKDIR /pidwin

# DEBUG
RUN pwd
RUN ls -alt

# 2) Copy the root-level package.json and any lock file (if you have one)
COPY package*.json ./
COPY tsconfig.base.json ./

# 3) Copy only the needed subdirectories
COPY packages/shared-core ./packages/shared-core
COPY packages/shared-server ./packages/shared-server
COPY packages/shared-backend ./packages/shared-backend
COPY packages/shared-client ./packages/shared-client

# Set necessary environment variables for the build process
ENV NODE_ENV=devcloud \
    DB_URI="mongodb://localhost:27778/?directConnection=true" \
    AWS_ID="" \
    AWS_SECRET="" \
    AWS_REGION=us-east-1
    
# 5) Switch to the shared-backend directory
WORKDIR /pidwin/packages/shared-backend

# 6) (Optional) Run a local npm install if this package has extra dependencies
RUN npm install --verbose

# 7) Expose the port used by this service
EXPOSE 3000

# 8) Start the application (replace with your desired start script)
CMD ["npm", "run", "start"]
