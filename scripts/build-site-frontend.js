
const child = require("child_process");
const run = (cmd) => child.execSync(cmd, { stdio: "inherit" });

run("npm install");

run("cd ./packages/shared-core && npm install");
run("cd ./packages/shared-core && npm run build");

run("cd ./packages/shared-client && npm install");
run("cd ./packages/shared-client && npm run build");

run("cd ./packages/site-frontend && npm install");

process.exit();