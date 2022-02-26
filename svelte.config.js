import node from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: node({ env: { port: process.env.PORT } }),
    prerender: {
      crawl: false,
      enabled: false,
    }
  },
};

export default config;
