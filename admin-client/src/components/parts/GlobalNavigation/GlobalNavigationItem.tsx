import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";

import { navItem } from "./style";

export default function GlobalNavigationItem({
  to,
  children,
}: PropsWithChildren<{ to: string }>) {
  return (
    <div>
      <NavLink
        to={to}
        className={({ isActive }) => navItem({ active: isActive })}>
        {children}
      </NavLink>
    </div>
  );
}
