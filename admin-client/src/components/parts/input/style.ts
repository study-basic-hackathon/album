import { tv } from "tailwind-variants";

export const input = tv({
  base: "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm",
  variants: {
    intent: {
      default: "border-gray-300 text-gray-900",
      error: "border-red-500 text-red-600 placeholder-red-400",
      success: "border-green-500 text-green-600",
    },
    disabled: {
      true: "bg-gray-100 text-gray-400 cursor-not-allowed",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

export const inputChoice = tv({
  base: "inline-flex items-center gap-2 border px-3 py-1.5 rounded-md cursor-pointer text-sm transition-colors",
  variants: {
    checked: {
      true: "bg-primary border-blue-500 text-gray-900 bg-blue-50",
      false: "bg-white border-gray-300 text-gray-700",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    checked: false,
    disabled: false,
  },
});
