import {defineConfig} from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";
// https://vite-pwa-org.netlify.app/frameworks/astro.html
import AstroPWA from "@vite-pwa/astro";
import {manifest} from "./manifest";
import {visualizer} from "rollup-plugin-visualizer";


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    mode: 'directory'
  }),
  integrations: [
    tailwind(),
    solidJs(),
    AstroPWA({
      /* your pwa options */

      base: "/",
      scope: "/",
      srcDir: "src",
      filename: "sw.js",
      mode: import.meta.env.MODE,
      strategies: "injectManifest",
      // injectManifest: {
      // swDest: "dist/client/sw.js",
      // globDirectory: "dist/client",
      // globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
      // sourcemap: true,
      // },
      registerType: "prompt",
      manifest: manifest,
    }),
  ],
  vite: {
    plugins: [
      visualizer({
        // open: true,
        gzipSize: true,
      }),
    ]
  }
});
