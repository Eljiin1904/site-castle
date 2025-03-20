# Use Node 23 on Alpine
FROM node:23-alpine
ENV NODE_ENV=devcloud \
    DB_URI="mongodb://localhost:27778/?directConnection=true" \
    AWS_ID="" \
    AWS_SECRET="" \
    AWS_REGION=us-east-1 \
    PORT=3000
WORKDIR /pidwin
COPY . .
RUN npm run init
# 5) Switch to the shared-backend directory
WORKDIR /pidwin/packages/shared-backend
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]