import type { InputHTMLAttributes } from "react";
import {
  FiCircle,
  FiCheckCircle,
  FiSquare,
  FiCheckSquare,
} from "react-icons/fi";
import { inputChoice } from "./style";

type InputChoiceProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  checked?: boolean;
};

export default function InputChoice({
  type,
  name,
  value,
  label,
  checked = false,
  disabled = false,
  ...props
}: InputChoiceProps) {
  const inputId = `${name}-${value}`;

  const Icon =
    type === "radio"
      ? checked
        ? FiCheckCircle
        : FiCircle
      : checked
      ? FiCheckSquare
      : FiSquare;

  return (
    <label htmlFor={inputId} className={inputChoice({ checked, disabled })}>
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <Icon
        className={`w-4 h-4 ${
          checked ? "text-blue-500" : "text-gray-700"
        } transition-colors`}
      />
      <span>
        {label}
      </span>
    </label>
  );
}
