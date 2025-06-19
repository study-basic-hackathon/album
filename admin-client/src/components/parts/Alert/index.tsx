import { tv, type VariantProps } from "tailwind-variants";

const alert = tv({
  base: "rounded-md p-4 text-sm border",
  variants: {
    variant: {
      default: "bg-gray-50 text-gray-800 border-gray-300",
      success: "bg-green-50 text-green-800 border-green-300",
      error: "bg-red-50 text-red-800 border-red-300",
      warning: "bg-yellow-50 text-yellow-800 border-yellow-300",
      info: "bg-blue-50 text-blue-800 border-blue-300",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AlertProps = {
  message: string;
} & VariantProps<typeof alert>;

export default function Alert({ message, variant }: AlertProps) {
  return <div className={alert({ variant })}>{message}</div>;
}
