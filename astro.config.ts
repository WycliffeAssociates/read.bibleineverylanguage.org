// import { defineConfig } from "astro/config";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";
// https://vite-pwa-org.netlify.app/frameworks/astro.html
import AstroPWA from "@vite-pwa/astro";
import { visualizer } from "rollup-plugin-visualizer";
import { manifest } from "./manifest";
const siteUrl = import.meta.env.PROD
	? "https://read.bibleineverylanguage.org"
	: import.meta.env.DEV
		? "https://read-dev.bibleineverylanguage.org"
		: "";
const isDev = import.meta.env.DEV;

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	output: "server",
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
			configPath: ".dev.vars",
		},
	}),
	integrations: [

		solidJs(),
		AstroPWA({
			/* your pwa options */
			srcDir: "src",
			filename: "sw.ts",
			strategies: "injectManifest",
			registerType: "autoUpdate",
			manifest: manifest,
			injectManifest: {
				globIgnores: ["**/_worker.js/**"],
			},
			devOptions: {
				enabled: true,
				type: "module",
				/* other options */
			},
		}),
	],
	vite: {
		plugins: [
			// @ts-expect-error
			tailwindcss(),
			// @ts-expect-error
			visualizer({
				brotliSize: true,
				template: "treemap",
				// open: true,
				// goal:  ~100kib of HTML/CSS/Fonts (e.g. check network tab for amount loaded), and then ~300-350kib JS gzipped: see readme for link to article
				gzipSize: true,
			}),
		],
	},
});
