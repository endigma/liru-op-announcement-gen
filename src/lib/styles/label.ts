import { cva, type VariantProps } from "class-variance-authority"

export type LabelProps = VariantProps<typeof label>
export const label = cva("font-semibold flex flex-col gap-1")
