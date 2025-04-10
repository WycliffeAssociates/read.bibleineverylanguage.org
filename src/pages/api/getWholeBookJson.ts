import type { IcfEnv } from "@customTypes/types";
import { allParamsAreValid, getHeaders } from "@lib/api";
import { SERVER_USER_AGENT } from "@lib/contants";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
	const runtime = context.locals.runtime;
	const env = runtime.env as IcfEnv;
	const { url } = context;

	const user = url.searchParams?.get("user");
	const repo = url.searchParams?.get("repo");
	const book = url.searchParams?.get("book"); //type guard in if statement beneath; Cast here to satisfy typescript that I'm going to ensure that they are valid params

	if (!allParamsAreValid([user, repo, book])) {
		return new Response(null, {
			status: 400,
			statusText: "Missing parameters",
		});
	}
	try {
		const baseUrl = env.PIPELINE_API_URL_BASE;
		const finalUrl = `${baseUrl}/${user}/${repo}/${book}/whole.json`;

		const response = await fetch(finalUrl, {
			headers: {
				"Content-Type": "application/json",
				"User-agent": SERVER_USER_AGENT,
			},
		});

		if (response.ok) {
			return new Response(response.body, {
				headers: {
					...getHeaders(),
					"Content-Type": "application/json",
				},
			});
		}
		return new Response(null, {
			status: 404,
			statusText: "that file does not exist for this repo",
		});
	} catch (error) {
		console.error(error);
		return new Response(null, {
			status: 404,
		});
	}
};
