/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

// biome-ignore lint/style/noNamespace: <explanation>
declare namespace App {
	interface Locals extends Runtime {}
}
