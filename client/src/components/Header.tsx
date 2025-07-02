import { NavLink } from "react-router";
import styles from "./scss/header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <NavLink to="/">ホーム画面へ戻る</NavLink>
      </nav>
    </header>
  );
}
