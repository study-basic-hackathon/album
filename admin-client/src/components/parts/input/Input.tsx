import { forwardRef } from "react";
import { type VariantProps } from "tailwind-variants";
import type { InputHTMLAttributes } from "react";
import { input } from "./style";

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof input>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { intent, disabled, className, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      disabled={disabled}
      className={input({ intent, disabled, class: className })}
    />
  );
});

export default Input;
