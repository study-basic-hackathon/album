// import { exhibitions } from "../mocks/data/exhibitions";
import type { components } from "../types/api";
import { Link } from "react-router";
import { useExhibitions } from "../hooks/exhibition";

type Exhibition = components["schemas"]["Exhibition"];

// ToDo: 日付フォーマットの方法について検討
function ExhibitionInfo({ exhibition }: { exhibition: Exhibition }) {
  const started_date = new Date(exhibition.started_date);
  const ended_date = new Date(exhibition.ended_date);

  return (
    <article>
      <h3>
        <Link to={`/exhibition/${exhibition.id}`}>{exhibition.name}</Link>
      </h3>
      <p>
        開催期間: {started_date.toLocaleDateString("ja-JP")}-
        {ended_date.toLocaleDateString("ja-JP")}
      </p>
    </article>
  );
}

// ToDo: より良いソートのアルゴリズムがないか検討
function ExhibitionList({ exhibitions }: { exhibitions: Record<number, Exhibition> }) {
  const sortedExhibitions: Exhibition[] = Object.values(exhibitions).sort(
    (a, b) => new Date(b.started_date).getTime() - new Date(a.started_date).getTime()
  );
  return (
    <>
      <h2>華展一覧</h2>
      <ul role="list">
        {sortedExhibitions.map((exhibition) => (
          <li key={exhibition.id}>
            <ExhibitionInfo exhibition={exhibition} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Index() {
  const exhibitions = useExhibitions();

  return (
    <>
      <main>
        <h1>華道用写真共有Webアプリ</h1>
        <p>このアプリは、華道の写真を共有するための Web アプリケーションです。</p>
        <ExhibitionList exhibitions={exhibitions} />
      </main>
    </>
  );
}
