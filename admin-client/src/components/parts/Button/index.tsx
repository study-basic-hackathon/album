import { button } from "./style"

export default function Button ({
  variant = "primary",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "link" | "primary" | "secondary" | "danger";
}) {
  return (
    <button className={button({ variant })} {...props}>
      {children}
    </button>
  );
}
