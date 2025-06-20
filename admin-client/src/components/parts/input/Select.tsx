import {
  type SelectHTMLAttributes,
  type Ref,
  forwardRef,
} from "react";
import { type VariantProps } from "tailwind-variants";
import { input } from "./style";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof input>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ intent, disabled, className, children, ...props }, ref: Ref<HTMLSelectElement>) => {
    return (
      <select
        {...props}
        ref={ref}
        disabled={disabled}
        className={input({ intent, disabled, class: className })}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
