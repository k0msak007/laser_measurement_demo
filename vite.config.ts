import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/laser_measurement_demo/",
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
