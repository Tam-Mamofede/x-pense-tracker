import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Auto update the service worker
      manifest: {
        name: "X-pense",
        short_name: "X-P",
        description:
          "A budgeting and expense tracking app to track your finances",
        start_url: "/",
        display: "standalone",
        background_color: "#e3f0af",
        theme_color: "#1f4529",
        icons: [
          {
            src: "/assets/logo-dk.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/logo-dk.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    sourcemap: true, // Ensure source maps are enabled for production
  },
});
