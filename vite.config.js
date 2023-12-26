import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/polygon": {
        target: "https://biz-assignment.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/polygon/, ""),
      },
    },
  },
});
