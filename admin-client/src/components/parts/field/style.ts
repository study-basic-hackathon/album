import { tv } from "tailwind-variants";

export const formField = tv({
  slots: {
    root: "space-y-1",
    label: "block text-sm font-medium",
    error: "text-xs text-red-500",
  },
  variants: {
    intent: {
      default: {
        label: "text-gray-700",
      },
      error: {
        label: "text-red-600",
      },
    },
  },
  defaultVariants: {
    intent: "default",
  },
});
