import { Link } from "react-router";
import { LuHouse, LuArrowUp } from "react-icons/lu";
import styles from "./scss/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" aria-label="ホーム画面へ戻る">
          <LuHouse size={28} />
        </Link>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="ページの先頭へ戻る"
        >
          <LuArrowUp size={28} />
        </button>
      </div>
    </footer>
  );
}
