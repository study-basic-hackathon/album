import { tv } from "tailwind-variants";

export const navItem = tv({
  base: "px-4 py-2 text-gray-600 hover:text-blue-500 transition-colors block hover:bg-blue-50",
  variants: {
    active: {
      true: "font-bold text-gray-900 bg-blue-100",
      false: "",
    },
  },
});
