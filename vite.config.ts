import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
            return "vendor-react";
          }
          if (id.includes("@radix-ui")) {
            return "vendor-radix";
          }
          if (id.includes("@react-three") || id.includes("three")) {
            return "vendor-three";
          }
          if (id.includes("framer-motion") || id.includes("gsap")) {
            return "vendor-animation";
          }
          if (id.includes("recharts") || id.includes("d3-")) {
            return "vendor-charts";
          }
          if (id.includes("lucide-react")) {
            return "vendor-icons";
          }
          return "vendor";
        },
      },
    },
  },
}));
