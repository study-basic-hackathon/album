import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import Input from "../input/Input";
import FormField from ".";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: FieldError;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, error, className, ...props }, ref) => {
    const intent = error ? "error" : "default";

    return (
      <FormField
        label={label}
        htmlFor={name}
        intent={intent}
        error={error}
      >
        <Input
          id={name}
          ref={ref}
          name={name}
          intent={intent}
          className={className}
          {...props}
        />
      </FormField>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
