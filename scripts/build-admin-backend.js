
const child = require("child_process");
const run = (cmd) => child.execSync(cmd, { stdio: "inherit" });

run("npm install");

run("cd ./packages/shared-core && npm install");
run("cd ./packages/shared-core && npm run build");

run("cd ./packages/shared-server && npm install");
run("cd ./packages/shared-server && npm run build");

run("cd ./packages/shared-admin-backend && npm install");;

process.exit();