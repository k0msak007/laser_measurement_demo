import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Laser_Measurement_client/",
  build: {
    outDir: "dist", // หรือ public แล้วแต่ Netlify config
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
