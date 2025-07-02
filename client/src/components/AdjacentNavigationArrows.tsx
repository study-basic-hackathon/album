import styles from "./scss/adjacent-navigation-arrows.module.scss";
import { Link } from "react-router";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function AdjacentNavigationArrows({
  previousWorkUrl,
  nextWorkUrl,
}: {
  previousWorkUrl?: string;
  nextWorkUrl?: string;
}) {
  return (
    <nav className={styles.arrows} aria-label="前後の作品">
      <ul>
        <li>
          {previousWorkUrl ? (
            <Link to={previousWorkUrl} aria-label="前の作品">
              <LuChevronLeft size={28} />
            </Link>
          ) : (
            <span></span>
          )}
        </li>
        <li>
          {nextWorkUrl ? (
            <Link to={nextWorkUrl} aria-label="次の作品">
              <LuChevronRight size={28} />
            </Link>
          ) : (
            <span></span>
          )}
        </li>
      </ul>
    </nav>
  );
}
