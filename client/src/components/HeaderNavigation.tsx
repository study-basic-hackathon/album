import { NavLink } from "react-router";

export default function HeaderNavigation() {
  return (
    <header>
      <nav>
        <NavLink to="/">ホームへ戻る</NavLink>
      </nav>
    </header>
  );
}
