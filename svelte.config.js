import node from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",
		adapter: node({ env: { port: process.env.PORT } }),
	},
};

export default config;
