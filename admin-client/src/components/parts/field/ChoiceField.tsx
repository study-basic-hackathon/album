import type { FieldError } from "react-hook-form";
import FormField from ".";
import InputChoice from "../input/InputChoice";

type Option = {
  label: string;
  value: string | number;
};

type ChoiceFieldProps = {
  label: string;
  name: string;
  type: "radio" | "checkbox";
  value: string | number | (string | number)[];
  onChange: (value: string | number | (string | number)[]) => void;
  options: Option[];
  error?: FieldError;
  disabled?: boolean;
};

export default function ChoiceField({
  label,
  name,
  type,
  value,
  onChange,
  options,
  error,
  disabled,
}: ChoiceFieldProps) {
  const intent = error ? "error" : "default";

  const isChecked = (optionValue: string | number): boolean => {
    if (type === "checkbox" && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleChange = (optionValue: string | number, checked: boolean) => {
    if (type === "checkbox") {
      if (!Array.isArray(value)) return;
      const newValue = checked
        ? [...value, optionValue]
        : value.filter((v) => v !== optionValue);
      onChange(newValue);
    } else {
      onChange(optionValue);
    }
  };

  return (
    <FormField
      label={label}
      htmlFor={name}
      intent={intent}
      error={error}
    >
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <InputChoice
            key={opt.value}
            type={type}
            name={name}
            value={opt.value}
            label={opt.label}
            checked={isChecked(opt.value)}
            disabled={disabled}
            onChange={(e) =>
              handleChange(opt.value, e.currentTarget.checked)
            }
          />
        ))}
      </div>
    </FormField>
  );
}
