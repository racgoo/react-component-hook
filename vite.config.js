import { defineConfig } from "vite";
import { resolve } from "path";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dtsPlugin({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
