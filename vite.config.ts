import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";

const env = loadEnv("development", process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    strictPort: true,
    proxy: {
      "/api": {
        // target: `http://${env.VITE_BASE_HOST}:${env.VITE_BASE_PORT}`,
        target: "http://127.0.0.1:4523/m1/2727821-0-default",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
});
