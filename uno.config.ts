import transformerDirectives from "@unocss/transformer-directives"
import transformerVariantGroup from "@unocss/transformer-variant-group"
import { defineConfig, presetIcons, presetUno } from "unocss"
import { presetRadix, type RadixColors } from "unocss-preset-radix"

const palette: RadixColors[] = ["sage", "jade", "red"]
const aliases: { [key: string]: RadixColors } = {
	accent: "jade",
	base: "sage",
}

export default defineConfig({
	presets: [
		presetUno(),
		presetRadix({
			darkSelector: ":root",
			lightSelector: "never",
			palette: palette,
			aliases: aliases,
		}),
		presetIcons(),
	],
	theme: {
		zIndex: {
			base: 0,
			floating: 5,
			overlay: 10,
			modal: 20,
			top: 100,
		},
	},
	shortcuts: {
		h1: "text-4xl font-semibold",
		h2: "text-3xl font-semibold",
		h3: "text-2xl font-semibold",
		h4: "text-xl font-semibold",
		h5: "text-lg font-semibold",
		h6: "font-semibold",

		content: "max-w-4xl mx-auto px-6 py-10",
	},
	safelist: [
		...Array.from({ length: 10 }, (_, i) => `p-${i + 1}`),
		...Array.from({ length: 10 }, (_, i) => `mr-${i + 1}`),
		...Array.from({ length: 10 }, (_, i) => `ml-${i + 1}`),
		...palette.map((p) => `hue-${p}`),
		...Object.keys(aliases).map((a) => `hue-${a}`),
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
})
