import { Link, type LinkProps } from 'react-router'
import { button } from "./style"

export default function LinkButton ({
  to,
  variant = "primary",
  children,
  ...props
}: LinkProps & {
  variant?: "link" | "primary" | "secondary" | "danger";
}) {
  return (
    <Link to={to} className={button({ variant })} {...props}>
      {children}
    </Link>
  );
}
