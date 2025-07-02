FROM node:23-alpine AS build

# Define BUILD_ENV as an argument that can be passed during docker build
ARG BUILD_ENV=production
# Set VITE_BUILD_ENV environment variable from the BUILD_ENV build argument
ENV VITE_BUILD_ENV=$BUILD_ENV

WORKDIR /pidwin
COPY ./package*.json ./
COPY ./tsconfig.base.json ./

# This copies the workspace root 'scripts'. If entrypoint.sh is in packages/shared-admin-frontend/,
# it will be copied by the later COPY packages/shared-admin-frontend command.
COPY scripts/ /pidwin/scripts/
COPY packages/shared-core/ /pidwin/packages/shared-core/
COPY packages/shared-client/ /pidwin/packages/shared-client/
COPY packages/shared-admin-frontend /pidwin/packages/shared-admin-frontend

# Diagnostic COPY for index.html from the same source directory
COPY packages/shared-admin-frontend/index.html /tmp/index_test_copy.html

# Explicitly copy entrypoint.sh to a known temp location in build stage
COPY packages/shared-admin-frontend/entrypoint.sh /tmp/entrypoint.sh

RUN npm run build-site-frontend

# Stage 2: Production image using NGINX to serve the built static assets
FROM nginx:stable-alpine
COPY --from=build /pidwin/packages/shared-admin-frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /pidwin/packages/shared-admin-frontend/build/ /usr/share/nginx/html/ 

# Copy entrypoint.sh from the known temp location in build stage
COPY --from=build /tmp/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
# CMD will be passed as arguments to the entrypoint script
CMD ["nginx", "-g", "daemon off;"] 
# EXPOSE 80 was already there, keeping it.
EXPOSE 80