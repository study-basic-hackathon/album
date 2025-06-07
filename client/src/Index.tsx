import { exhibitions } from "./mocks/data/exhibitions";

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

export default function Index() {
  return (
    <>
      <h1>華道用写真共有Webアプリ</h1>
      <p>このアプリは、華道の写真を共有するための Web アプリケーションです。</p>
      <h2>華展一覧</h2>
      <ul role="list">
        <li>
          <ExhibitionInfo id={1} />
        </li>
        <li>
          <ExhibitionInfo id={2} />
        </li>
        <li>
          <ExhibitionInfo id={3} />
        </li>
        <li>
          <ExhibitionInfo id={4} />
        </li>
        <li>
          <ExhibitionInfo id={5} />
        </li>
      </ul>
    </>
  );
}
