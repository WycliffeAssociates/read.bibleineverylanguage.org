import type { IcfEnv } from "@customTypes/types";
import { getHeaders } from "@lib/api";
import { SERVER_USER_AGENT } from "@lib/contants";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
	const runtime = context.locals.runtime;
	const env = runtime.env as IcfEnv;
	const { url } = context;

	const user = url.searchParams?.get("user");
	const repo = url.searchParams?.get("repo");
	if (!user || !repo || user === "undefined" || repo === "undefined") {
		return new Response(null, {
			status: 400,
			statusText: "Missing parameters",
		});
	}

	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	let returnValue;

	const baseUrl = env.PIPELINE_API_URL_BASE;
	const finalUrl = `${baseUrl}/${user}/${repo}/index.json`;
	try {
		// http://localhost/u/WA-Catalog/en_ulb/index.json;
		const response = await fetch(finalUrl, {
			headers: {
				"Content-Type": "application/json",
				"User-agent": SERVER_USER_AGENT,
			},
		});

		returnValue = response.body;
		return new Response(returnValue, {
			headers: getHeaders(),
		});
	} catch (error) {
		console.error(error);
		return new Response(null, {
			status: 404,
			statusText: `Fetch for ${finalUrl} failed.`,
		});
	}
};
