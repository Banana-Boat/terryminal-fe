import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const env = loadEnv("development", process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    strictPort: true,
    host: env.VITE_BASE_HOST,
    port: parseInt(env.VITE_BASE_PORT),
    proxy: {
      // 代理websocket连接
      "/terminal-ws": {
        target: `ws://${env.VITE_TERMINAL_WS_HOST}:${env.VITE_TERMINAL_WS_PORT}`,
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/terminal-ws/, ""),
      },
      "/chatbot/chat": {
        target: `http://${env.VITE_GATEWAY_HOST}:${env.VITE_GATEWAY_PORT}`,
        changeOrigin: true,
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
