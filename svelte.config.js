import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { preprocessMeltUI, sequence } from "@melt-ui/pp"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),

	kit: {
		paths: {
			base: process.argv.includes("dev") ? "" : process.env.BASE_PATH,
		},
		adapter: adapter({
			fallback: "404.html",
		}),
	},
}

export default config
