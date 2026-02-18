/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === '/upload-numbers' && request.method === 'POST') {
			try {
				const body = await request.json(); // Assuming JSON body with numbers string
				const numbersString = body.numbers;

				if (!numbersString) {
					return new Response('Missing "numbers" in request body', { status: 400 });
				}

				// Store the numbers string in KV
				// 'env.PRIORITY_NUMBERS_KV' will be the KV namespace binding
				await env.PRIORITY_NUMBERS_KV.put('latest_priority_numbers', numbersString);

				return new Response('Priority numbers uploaded successfully!', { status: 200 });
			} catch (error) {
				console.error('Error processing upload:', error);
				return new Response('Error processing upload', { status: 500 });
			}
		}

		// Existing routes
		switch (url.pathname) {
			case '/message':
				return new Response('Hello, Cloudflare Worker!');
			case '/random':
				return new Response(crypto.randomUUID());
			default:
				return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env & { PRIORITY_NUMBERS_KV: KVNamespace }>;
