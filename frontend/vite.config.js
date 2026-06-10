import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Sports-Performance-Tracker/",
  build: {
    outDir: "../docs",
    emptyOutDir: true
  }
});
