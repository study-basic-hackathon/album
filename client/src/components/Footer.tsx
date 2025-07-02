import { Link } from "react-router";
import { LuHouse, LuArrowUp } from "react-icons/lu";
import styles from "./scss/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <aside>
        <Link to="/" aria-label="ホーム画面へ戻る">
          <LuHouse size={28} />
        </Link>
        <a href="#" aria-label="ページの先頭へ戻る">
          <LuArrowUp size={28} />
        </a>
      </aside>
    </footer>
  );
}
