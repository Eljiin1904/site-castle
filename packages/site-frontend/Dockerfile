FROM node:23-alpine AS build
# Installing dependencies

# Define BUILD_ENV as an argument that can be passed during docker build
# Changed to "production" for Vite's build optimizations. Runtime env is separate.
ARG BUILD_ENV=production
# Set VITE_BUILD_ENV environment variable from the BUILD_ENV build argument
ENV VITE_BUILD_ENV=$BUILD_ENV

WORKDIR /pidwin
COPY ./package*.json ./
COPY ./tsconfig.base.json ./

# This copies the workspace root 'scripts'. If entrypoint.sh is in packages/site-frontend/,
# it will be copied by the later COPY packages/site-frontend command.
<<<<<<< HEAD
COPY scripts/ /pidwin/scripts/
COPY packages/shared-core/ /pidwin/packages/shared-core/
COPY packages/shared-client/ /pidwin/packages/shared-client/
COPY packages/site-frontend/ /pidwin/packages/site-frontend/

# Diagnostic COPY for index.html from the same source directory
COPY packages/site-frontend/index.html /tmp/index_test_copy.html

# Explicitly copy entrypoint.sh to a known temp location in build stage
COPY packages/site-frontend/entrypoint.sh /tmp/entrypoint.sh
=======
COPY scripts /pidwin/scripts 
COPY packages/shared-core /pidwin/packages/shared-core
COPY packages/shared-client /pidwin/packages/shared-client
COPY packages/site-frontend /pidwin/packages/site-frontend # This copies entrypoint.sh to /pidwin/packages/site-frontend/entrypoint.sh
>>>>>>> 3f7351a (vite fix)

RUN npm run build-site-frontend

# Stage 2: Production image using NGINX to serve the built static assets
FROM nginx:stable-alpine
COPY --from=build /pidwin/packages/site-frontend/nginx.conf /etc/nginx/conf.d/default.conf
<<<<<<< HEAD
COPY --from=build /pidwin/packages/site-frontend/build/ /usr/share/nginx/html/ 

# Copy entrypoint.sh from the known temp location in build stage
COPY --from=build /tmp/entrypoint.sh /entrypoint.sh
=======
COPY --from=build /pidwin/packages/site-frontend/build /usr/share/nginx/html

# Copy the entrypoint script from the build stage (where it was copied from the source)
COPY --from=build /pidwin/packages/site-frontend/entrypoint.sh /entrypoint.sh
>>>>>>> 3f7351a (vite fix)
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
# CMD will be passed as arguments to the entrypoint script
CMD ["nginx", "-g", "daemon off;"] 
# EXPOSE 80 was already there, keeping it.
EXPOSE 80
