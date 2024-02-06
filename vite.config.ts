import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

import uno from "unocss/vite"
import extractorSvelte from "@unocss/extractor-svelte"

export default defineConfig({
	plugins: [
		uno({
			extractors: [extractorSvelte],
			content: {
				pipeline: {
					include: ["./**/*.svelte", "./src/lib/styles/*.ts"],
				},
			},
		}),
		sveltekit(),
	],
})
