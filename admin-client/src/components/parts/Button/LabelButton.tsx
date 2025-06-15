import { button } from "./style";

export default function LabelButton({
  htmlFor,
  variant = "primary",
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  variant?: "link" | "primary" | "secondary" | "danger";
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={button({ variant, class: className })}
      {...props}
    >
      {children}
    </label>
  );
}
