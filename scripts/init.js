
const child = require("child_process");
const run = (cmd) => child.execSync(cmd, { stdio: "inherit" });

run("npm install");

run("cd ./packages/shared-core && npm install");
run("cd ./packages/shared-core && npm run build");

run("cd ./packages/shared-client && npm install");
run("cd ./packages/shared-client && npm run build");

run("cd ./packages/shared-server && npm install");
run("cd ./packages/shared-server && npm run build");

run("cd ./packages/shared-admin-backend && npm install");
run("cd ./packages/shared-admin-frontend && npm install");
run("cd ./packages/shared-affiliate-api && npm install");
run("cd ./packages/shared-discord-bot && npm install");
run("cd ./packages/shared-game-server && npm install");
run("cd ./packages/shared-ipn-server && npm install");
run("cd ./packages/shared-reporting-server && npm install");
run("cd ./packages/shared-backend && npm install");
run("cd ./packages/site-frontend && npm install");

process.exit();