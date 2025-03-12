import path from "path";
import del from "rollup-plugin-delete";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";
import run from "@rollup/plugin-run";

const isWatch = process.env.ROLLUP_WATCH === "true";

export default {
  input: "src/index.ts",
  output: {
    file: "build/index.js",
    format: "es",
    sourcemap: true,
  },
  external: [/node_modules/],
  plugins: [
    del({ 
      targets: "build/*",
      runOnce: isWatch
    }),
    alias({
      entries: [
        { find: "#core", replacement: path.resolve(__dirname, "../shared-core/build") },
        { find: "@core", replacement: path.resolve(__dirname, "../shared-core/build") },
        { find: "#server", replacement: path.resolve(__dirname, "../shared-server/build") },
        { find: "@server", replacement: path.resolve(__dirname, "../shared-server/build") },
        { find: "#app", replacement: path.resolve(__dirname, "src") },
      ],
    }),
    resolve({
      preferBuiltins: true
    }),
    typescript({
      noEmitOnError: false
    }),
    isWatch && run()
  ],
  watch: {
    clearScreen: false,
  },
  onwarn: function(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
    warn(warning);
  }
}