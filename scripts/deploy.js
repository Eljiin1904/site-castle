
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
    "master-server",
    "admin-backend",
    "affiliate-api",
    "discord-bot",
    "game-server",
    "ipn-server",
    "site-backend",
    "admin-frontend",
    "site-frontend",
  );
} else if (command === "admin") {
  services.push(
    "admin-backend",
    "admin-frontend",
  );
} else if (command === "site") {
  services.push(
    "site-backend",
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