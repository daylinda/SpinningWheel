

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby-KxZeTsN0i0zNjNhKJtubwgJqmQsKqzid8Ki7zdlVN0Mwjdv12VUmeAIYJVm7p_oKkw/exec";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/applicants": {
        target: GOOGLE_SCRIPT_URL,
        changeOrigin: true,
        secure: true,
        rewrite: () => "",
      },
    },
  },
});