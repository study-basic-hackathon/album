import styles from "./scss/fallback.module.scss";

export default function Fallback({ message, isError }: { message: string; isError?: boolean }) {
  return (
    <div className={styles.fallback} role="status">
      <p className={isError ? styles.error : styles.normal}>{message}</p>
    </div>
  );
}
