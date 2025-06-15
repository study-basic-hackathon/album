import { tv } from "tailwind-variants";

export const button = tv({
  base: "inline-flex items-center justify-center font-medium rounded px-4 py-1 transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  variants: {
    variant: {
      link: "text-blue-600 hover:underline hover:text-blue-800",
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      danger: "bg-red-600 text-white hover:bg-red-700",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
