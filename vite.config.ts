// vite.config.ts
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig( {
  build: {
    minify: false,
    outDir: "dist",
    lib: {
      entry: {
        index: path.resolve( process.cwd(), "./src/index.ts" ),
      },
      formats: [ "es", "cjs" ],
    },
  },
  plugins: [
    dts( {
      exclude: [ "./**/*.test.ts", "./**/*.bench.ts" ],
    } ),
  ],
} );

const root = path.resolve( process.cwd(), "./src/dev" );
