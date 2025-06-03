// project/scripts/run-vitest.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Go up one level from 'scripts' to 'project', then into 'packages'
const packagesDir = path.resolve(__dirname, '../packages');

if (!fs.existsSync(packagesDir)) {
  console.error(`❌ Directory not found: ${packagesDir}`);
  process.exit(1);
}

// Get all subdirectories in packages
const packages = fs.readdirSync(packagesDir).filter((name) => {
  const fullPath = path.join(packagesDir, name);
  return fs.statSync(fullPath).isDirectory();
});

for (const pkg of packages) {
  const pkgPath = path.join(packagesDir, pkg);
  const testCommand = 'npx vitest run --no-file-parallelism --passWithNoTests';

  console.log(`\n🔍 Running tests in ${pkg}...`);
  try {
    execSync(testCommand, {
      cwd: pkgPath,
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(`❌ Tests failed in ${pkg}`);
  }
}


// const child = require("child_process");
// const green = (str) => `\x1b[32m${str}\x1b[0m`;
// const cyan = (str) => `\x1b[36m${str}\x1b[0m`;
// const magenta = (str) => `\x1b[35m${str}\x1b[0m`;

// const spawn = ({ prefix, command, doneText }) => new Promise((resolve, reject) => {
//   const proc = child.spawn(command, undefined, {
//     stdio: ["inherit", "pipe", "pipe"],
//     shell: true,
//   });

//   proc.stdout.on("data", (data) => {
//     if (doneText && data.toString().includes(doneText))
//       resolve();
//     else if (!doneText) resolve()

//     process.stdout.write(`${prefix} ${data}`);
//   });

//   proc.stderr.on("data", (data) => {
//     process.stderr.write(`${prefix} ${data}`);
//   });

//   proc.on("close", (code) => {
//     console.log(`${prefix} Process exited with code ${code}`);
//   });
// });

// (async() => {
//   try {

//     // core
//     await spawn({
//       prefix: `[${green("Core")}]`,
//       command: "cd ./packages/shared-core && npx vitest run --passWithNoTests",
//       doneText: "Tests complete"
//     })

//     // shared code client + server
//     await Promise.all([
//       spawn({
//         prefix: `[${green("Client")}]`,
//         command: "cd ./packages/shared-client && npx vitest run--passWithNoTests",
//         doneText: "Tests complete"
//       }),
//       spawn({
//         prefix: `[${green("Server")}]`,
//         command: "cd ./packages/shared-server && npx vitest run--passWithNoTests",
//         doneText: "Tests complete"
//       }),
//     ])


//     // backend servers
//     await Promise.all([
//       spawn({
//         prefix: `[${cyan("Master")}]`,
//         command: "cd ./packages/shared-reporting-server && npx vitest run--passWithNoTests",
//         doneText: "Tests complete"
//       }),

//       spawn({
//         prefix: `[${cyan("Game")}]`,
//         command: "cd ./packages/shared-game-server && npx vitest run --passWithNoTests",
//         doneText: "Tests complete"
//       }),

//       spawn({
//         prefix: `[${cyan("Admin")}]`,
//         command: "cd ./packages/shared-admin-backend && npx vitest run --passWithNoTests",
//         doneText: "Tests complete"
//       }),

//       spawn({
//         prefix: `[${cyan("Site")}]`,
//         command: "cd ./packages/shared-backend && npx vitest run --passWithNoTests",
//         doneText: "Tests complete"
//       }),

//       spawn({
//         prefix: `[${magenta("Admin")}]`,
//         command: "cd ./packages/shared-admin-frontend && npx vitest run --passWithNoTests",
//         doneText: "Tests complete"
//       }),

//       spawn({
//         prefix: `[${magenta("Site")}]`,
//         command: "cd ./packages/site-frontend && npx vitest run --passWithNoTests",
//         doneText: "Tests complete"
//       })
//     ])


//   } catch (error) {
//     console.error("Error running tests:", error);
//   }
// })();