import { tv } from "tailwind-variants";

export const table = tv({
  base: "w-full border-collapse text-sm text-left",
  variants: {
    variant: {
      default: "",
      bordered: "border border-gray-300",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const tableRow = tv({
  base: "",
  variants: {
    striped: {
      true: "even:bg-gray-50",
      false: "",
    },
  },
});

export const tableHeadCell = tv({
  base: "px-4 py-2 font-semibold border-b border-gray-300 text-left",
});

export const tableCell = tv({
  base: "px-4 py-2 border-b border-gray-200",
});
