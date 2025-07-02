#!/bin/sh
# packages/shared-admin-frontend/entrypoint.sh

# Define the path for runtime-config.js
RUNTIME_CONFIG_PATH="/usr/share/nginx/html/runtime-config.js"

echo "Generating runtime-config.js for shared-admin-frontend"
echo "Received APP_ENV_NAME: ${APP_ENV_NAME}"
echo "Received SITE_URL_RUNTIME: ${SITE_URL_RUNTIME}"
echo "Received SITE_API_RUNTIME: ${SITE_API_RUNTIME}"
echo "Received ADMIN_URL_RUNTIME: ${ADMIN_URL_RUNTIME}"
echo "Received ADMIN_API_RUNTIME: ${ADMIN_API_RUNTIME}"
echo "Received STATIC_URL_RUNTIME: ${STATIC_URL_RUNTIME}"

cat > ${RUNTIME_CONFIG_PATH} <<EOF
window.runtimeConfig = {
  envName: "${APP_ENV_NAME:-devcloud}",
  siteURL: "${SITE_URL_RUNTIME:-https://dev.brickrax.com}",
  siteAPI: "${SITE_API_RUNTIME:-https://api.dev.brickrax.com}",
  adminURL: "${ADMIN_URL_RUNTIME:-https://admin.dev.brickrax.com}",
  adminAPI: "${ADMIN_API_RUNTIME:-https://aapi.dev.brickrax.com}",
  staticURL: "${STATIC_URL_RUNTIME:-https://font.brickrax.com}"
};
EOF

echo "runtime-config.js generated successfully at ${RUNTIME_CONFIG_PATH}:"
cat ${RUNTIME_CONFIG_PATH}

echo "Starting Nginx for shared-admin-frontend..."
exec "$@"