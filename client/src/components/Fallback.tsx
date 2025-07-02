import styles from "./scss/fallback.module.scss";

export default function Fallback({ message }: { message: string }) {
  return (
    <section className={styles.fallback}>
      <p>{message}</p>
    </section>
  );
}
