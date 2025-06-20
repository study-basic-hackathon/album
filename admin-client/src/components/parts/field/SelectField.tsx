import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import FormField from ".";
import Select from "../input/Select";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  error?: FieldError;
};

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, name, error, className, children, ...props }, ref) => {
    const intent = error ? "error" : "default";

    return (
      <FormField
        label={label}
        htmlFor={name}
        intent={intent}
        error={error}
      >
        <Select
          ref={ref}
          id={name}
          name={name}
          intent={intent}
          className={className}
          {...props}
        >
          {children}
        </Select>
      </FormField>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
