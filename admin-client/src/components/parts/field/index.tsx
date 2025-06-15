import type { ReactNode } from "react";
import { formField } from "./style";
import type { VariantProps } from "tailwind-variants";
import type { FieldError } from "react-hook-form";

type FormFieldProps = {
  label?: string;
  htmlFor?: string;
  error?: FieldError | string;
  children: ReactNode;
} & VariantProps<typeof formField>;

export default function FormField({
  label,
  htmlFor,
  error,
  intent,
  children,
}: FormFieldProps) {
  const { root, label: labelStyle, error: errorStyle } = formField({
    intent: error ? "error" : intent,
  });

  const errorMessage =
    typeof error === "string" ? error : error?.message;

  return (
    <div className={root()}>
      {label && (
        <label htmlFor={htmlFor} className={labelStyle()}>
          {label}
        </label>
      )}
      {children}
      {errorMessage && <div className={errorStyle()}>{errorMessage}</div>}
    </div>
  );
}
