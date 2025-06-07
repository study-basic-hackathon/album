import { exhibitions } from "./mocks/data/exhibitions";

type Exhibition = {
  id: number;
  name: string;
  started_date: string;
  ended_date: string;
};

// ToDo: 日付フォーマットの方法について検討
function ExhibitionInfo({ id }: { id: number }) {
  const startedDate = new Date(exhibitions[id].started_date);
  const endedDate = new Date(exhibitions[id].ended_date);

  return (
    <article>
      <h3>{exhibitions[id].name}</h3>
      <p>
        開催期間: {startedDate.toLocaleDateString("ja-JP")}-{endedDate.toLocaleDateString("ja-JP")}
      </p>
    </article>
  );
}

// ToDo: より良いソートのアルゴリズムがないか検討
function getSortedExhibitions(): Exhibition[] {
  return Object.values(exhibitions)
    .sort((a, b) => new Date(b.started_date).getTime() - new Date(a.started_date).getTime());
}

function ExhibitionList() {
  const sortedExhibitions = getSortedExhibitions();
  return (
    <>
      <h2>華展一覧</h2>
      <ul role="list">
        {sortedExhibitions.map((exhibition) => (
          <li key={exhibition.id}>
            <ExhibitionInfo id={exhibition.id} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Index() {
  return (
    <>
      <main>
        <h1>華道用写真共有Webアプリ</h1>
        <p>このアプリは、華道の写真を共有するための Web アプリケーションです。</p>
        <ExhibitionList />
      </main>
    </>
  );
}
