import { fileURLToPath, URL } from "node:url";
import { dirname, resolve } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

// @ts-ignore
const root = new URL("./src", import.meta.url);
const isProduction = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
  },
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({
      include: resolve(
        // @ts-ignore
        dirname(fileURLToPath(import.meta.url)),
        "./src/i18n/**"
      ),
      strictMessage: false,
      escapeHtml: false,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(root),
    },
  },
});
