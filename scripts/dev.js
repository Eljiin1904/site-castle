
const child = require("child_process");
const green = (str) => `\x1b[32m${str}\x1b[0m`;
const cyan = (str) => `\x1b[36m${str}\x1b[0m`;
const magenta = (str) => `\x1b[35m${str}\x1b[0m`;

const spawn = ({ prefix, command, doneText }) => new Promise((resolve, reject) => {
  const proc = child.spawn(command, undefined, {
    stdio: ["inherit", "pipe", "pipe"],
    shell: true,
  });

  proc.stdout.on("data", (data) => {
    if (doneText && data.toString().includes(doneText))
      resolve();
    else if (!doneText) resolve()

    process.stdout.write(`${prefix} ${data}`);
  });

  proc.stderr.on("data", (data) => {
    process.stderr.write(`${prefix} ${data}`);
  });

  proc.on("close", (code) => {
    console.log(`${prefix} Process exited with code ${code}`);
  });
});

(async() => {
  try {

    // core
    await spawn({
      prefix: `[${green("Core")}]`,
      command: "cd ./packages/shared-core && npm run watch",
      doneText: "Watching for file changes"
    })

    // shared code client + server
    await Promise.all([
      spawn({
        prefix: `[${green("Client")}]`,
        command: "cd ./packages/shared-client && npm run watch-ts",
        doneText: "Watching for file changes"
      }),
      spawn({
        prefix: `[${green("Client Sass")}]`,
        command: "cd ./packages/shared-client && npm run watch-scss",
        doneText: "waiting for changes before restart"
      }),
      spawn({
        prefix: `[${green("Server")}]`,
        command: "cd ./packages/shared-server && npm run watch",
        doneText: "Watching for file changes"
      }),
    ])


    // backend servers
    await Promise.all([
      spawn({
        prefix: `[${cyan("Master")}]`,
        command: "cd ./packages/shared-reporting-server && npm run dev-start",
        doneText: "server running"
      }),

      spawn({
        prefix: `[${cyan("Game")}]`,
        command: "cd ./packages/shared-shared-game-server && npm run dev-start",
        doneText: "server running"
      }),

      spawn({
        prefix: `[${cyan("Admin")}]`,
        command: "cd ./packages/shared-admin-backend && npm run dev-start",
        doneText: "listening on port"
      }),

      spawn({
        prefix: `[${cyan("Site")}]`,
        command: "cd ./packages/shared-backend && npm run dev-start",
        doneText: "listening on port"
      }),

      spawn({
        prefix: `[${magenta("Admin")}]`,
        command: "cd ./packages/shared-admin-frontend && npm run dev-start",
        // doneText: "Local:" skipping for vite
      }),

      spawn({
        prefix: `[${magenta("Site")}]`,
        command: "cd ./packages/site-frontend && npm run dev-start",
      })
    ])

    // frontend servers
    await Promise.all([
      // spawn({
      //   prefix: `[${magenta("Admin")}]`,
      //   command: "cd ./packages/shared-admin-frontend && npm run dev-start",
      //   // doneText: "Local:" skipping for vite
      // }),
      // spawn({
      //   prefix: `[${magenta("Site")}]`,
      //   command: "cd ./packages/site-frontend && npm run dev-start",
      // })
    ])


  } catch (error) {
    console.error("Error running processes:", error);
  }
})();