import styles from "./scss/fallback.module.scss";

export default function Fallback({ message, isError }: { message: string, isError?: boolean }) {
  return (
    <section className={styles.fallback}>
      <p className={isError ? styles.error : styles.normal}>{message}</p>
    </section>
  );
}
