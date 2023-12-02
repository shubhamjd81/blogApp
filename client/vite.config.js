import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
      },
    },
  },
  plugins: [react()],
});

// server: {
//   proxy: {
//     "/api": {
//       target: "http://localhost:8080/",
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api/, ""),
//     },
//   },
// },
