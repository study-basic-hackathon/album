import styles from "./scss/heading-sub.module.scss";

export default function HeadingSub({ title }: { title: string }) {
  return <h2 className={styles.headingSub}>{title}</h2>;
}
