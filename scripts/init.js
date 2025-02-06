
const child = require("child_process");
const run = (cmd) => child.execSync(cmd, { stdio: "inherit" });

run("npm install");

run("cd ./packages/shared-core && npm install");
run("cd ./packages/shared-core && npm run build");

run("cd ./packages/shared-client && npm install");
run("cd ./packages/shared-client && npm run build");

run("cd ./packages/shared-server && npm install");
run("cd ./packages/shared-server && npm run build");

run("cd ./packages/admin-backend && npm install");
run("cd ./packages/admin-frontend && npm install");
run("cd ./packages/affiliate-api && npm install");
run("cd ./packages/discord-bot && npm install");
run("cd ./packages/game-server && npm install");
run("cd ./packages/ipn-server && npm install");
run("cd ./packages/master-server && npm install");
run("cd ./packages/site-backend && npm install");
run("cd ./packages/site-frontend && npm install");

process.exit();