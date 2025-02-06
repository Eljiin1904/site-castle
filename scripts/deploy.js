
const child = require("child_process");
const run = (cmd) => child.execSync(cmd, { stdio: "inherit" });

const env = process.argv[2];
const command = process.argv[3];

run("cd ./packages/shared-core && npm install");
run("cd ./packages/shared-core && npm run build");

run("cd ./packages/shared-client && npm install");
run("cd ./packages/shared-client && npm run build");

run("cd ./packages/shared-server && npm install");
run("cd ./packages/shared-server && npm run build");

const services = [];

if (command === "all") {
  services.push(
    "shared-reporting-server",
    "shared-admin-backend",
    "shared-affiliate-api",
    "shared-discord-bot",
    "shared-game-server",
    "shared-ipn-server",
    "shared-site-backend",
    "shared-admin-frontend",
    "site-frontend",
  );
} else if (command === "admin") {
  services.push(
    "shared-admin-backend",
    "admin-frontend",
  );
} else if (command === "site") {
  services.push(
    "shared-site-backend",
    "site-frontend",
  );
} else {
  services.push(command);
}

for (const service of services) {
  run(`cd ./packages/${service} && npm install`);
  run(`cd ./packages/${service} && npm run deploy-${env}`);
}

process.exit();