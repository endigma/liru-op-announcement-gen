import { cva, type VariantProps } from "class-variance-authority"

export type InputProps = VariantProps<typeof input>
export const input = cva(
	"placeholder-base10A font-normal text-base11 border-base7 border bg-black/30 disabled:bg-base2 focus-visible:(outline-solid -outline-offset-2 outline-2 outline-accent8)",
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
