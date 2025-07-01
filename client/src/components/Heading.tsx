import styles from "./scss/heading.module.scss";

export default function Heading({ title, description }: { title: string; description?: string }) {
  if (!description) {
    return (
      <section className={styles.heading}>
        <h1>{title}</h1>
      </section>
    );
  }
  return (
    <section className={styles.heading}>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
