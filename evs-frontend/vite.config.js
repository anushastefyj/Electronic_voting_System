import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
 
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // ✅ Frontend always runs on 3000
    proxy: {
      "/api": {
        target: "http://localhost:8081", // ✅ Fixed: was 8080, now matches server.port=8081
        changeOrigin: true,
      },
    },
  },
});
 