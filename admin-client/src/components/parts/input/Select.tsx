import { type VariantProps } from "tailwind-variants";
import type { SelectHTMLAttributes } from "react";
import { input } from "./style"; // input({ intent, disabled }) を再利用

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof input>;

export default function Select({
  intent,
  disabled,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      disabled={disabled}
      className={input({ intent, disabled, class: className })}
    >
      {children}
    </select>
  );
}
