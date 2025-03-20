# Use Node 23 on Alpine
FROM node:23-alpine

# Set environment
ENV NODE_ENV=devcloud

# 1) Set the working directory at the "root" of the repo
WORKDIR /pidwin

# DEBUG
RUN pwd
RUN ls -alt

# 2) Copy the root-level package.json and any lock file (if you have one)
# COPY package*.json ./
# COPY tsconfig.base.json ./
# # If your init script is located at ./scripts/init.js, copy that too:
# COPY scripts/ ./scripts/

# 3) Copy only the needed subdirectories
# COPY packages/shared-core ./packages/shared-core
# COPY packages/shared-server ./packages/shared-server
# COPY packages/shared-backend ./packages/shared-backend
# COPY packages/shared-client ./packages/shared-client
COPY . .
# Set necessary environment variables for the build process
ENV NODE_ENV=devcloud \
    DB_URI="mongodb://localhost:27778/?directConnection=true" \
    AWS_ID=AKIAUX3EXIFVAOIJ2U4Z \
    AWS_SECRET=1Zq2NYfpgymMTJPS6t3XgQBsPqqp3uC0yvhYRmXu \
    AWS_REGION=us-east-1
    
# 4) Install dependencies at the root (this runs your init script to set everything up)
# RUN npm install --verbose
RUN npm run init --verbose

# 5) Switch to the shared-backend directory
WORKDIR /pidwin/packages/shared-backend

# 6) (Optional) Run a local npm install if this package has extra dependencies
RUN npm install --verbose

# 7) Expose the port used by this service
EXPOSE 5000

# 8) Start the application (replace with your desired start script)
CMD ["npm", "run", "start"]
