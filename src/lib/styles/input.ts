import { cva, type VariantProps } from "class-variance-authority"

export type InputProps = VariantProps<typeof input>
export const input = cva(
	"placeholder-base10A text-base12 border-base7 border bg-black/50 disabled:bg-base2 focus-visible:(outline-solid -outline-offset-2 outline-2 outline-accent8)",
	{
		variants: {
			size: {
				md: ["px-3", "h-8", "text-sm"],
			},
		},

		defaultVariants: {
			size: "md",
		},
	},
)
