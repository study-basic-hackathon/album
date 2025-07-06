// import { exhibitions } from "../mocks/data/exhibitions";
import type { components } from "../types/api";
import { Link } from "react-router";
import { useExhibitions } from "../hooks/exhibition";
import Heading from "../components/Heading";
import HeadingSub from "../components/HeadingSub";
import Fallback from "../components/Fallback";
import styles from "./scss/index.module.scss";

type Exhibition = components["schemas"]["Exhibition"];

// ToDo: 日付フォーマットの方法について検討
function ExhibitionInfo({ exhibition }: { exhibition: Exhibition }) {
  const startedDate = new Date(exhibition.started_date);
  const endedDate = new Date(exhibition.ended_date);

  return (
    <Link to={`/exhibition/${exhibition.id}`}>
      <article>
        <h3>{exhibition.name}</h3>
        <p>
          {startedDate.toLocaleDateString("ja-JP")}-{endedDate.toLocaleDateString("ja-JP")}
        </p>
      </article>
    </Link>
  );
}

// ToDo: より良いソートのアルゴリズムがないか検討
function ExhibitionList({ exhibitions }: { exhibitions: Exhibition[] }) {
  const sortedExhibitions = [...exhibitions].sort(
    (a, b) => new Date(b.started_date).getTime() - new Date(a.started_date).getTime()
  );
  return (
    <section className={styles.exhibitionList}>
      <ul role="list">
        {sortedExhibitions.map((exhibition) => (
          <li key={exhibition.id}>
            <ExhibitionInfo exhibition={exhibition} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Index() {
  const { exhibitions, isLoading, errorMessage, refetch } = useExhibitions();
  const exhibitionList: Exhibition[] = Object.values(exhibitions);

  if (isLoading) {
    return <Fallback message="華展一覧を読み込み中..." />;
  }
  if (errorMessage) {
    return (
      <section className={styles.errorSection}>
        <Fallback message={errorMessage} isError />
        <button onClick={refetch}>再試行</button>
      </section>
    );
  }

  return (
    <>
      <Heading
        title="華道用写真共有Webアプリ"
        description="華展の写真を共有するための Web アプリケーションです。"
      />
      <HeadingSub title="華展一覧" />
      <ExhibitionList exhibitions={exhibitionList} />
    </>
  );
}
