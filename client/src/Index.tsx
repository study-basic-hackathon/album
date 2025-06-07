import { exhibitions } from "./mocks/data/exhibitions";

function ExhibitionInfo({ id }: { id: number }) {
  // started_date と ended_date が Date 型であれば、以下の処理は不要になる
  const startedDate = new Date(exhibitions[1].started_date);
  const endedDate = new Date(exhibitions[1].ended_date);

  return (
    <article>
      <h3>{exhibitions[id].name}</h3>
      <p>
        {startedDate.toLocaleDateString("ja-JP")} - {endedDate.toLocaleDateString("ja-JP")}
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
      <ExhibitionInfo id={1} />
      <ExhibitionInfo id={2} />
      <ExhibitionInfo id={3} />
      <ExhibitionInfo id={4} />
      <ExhibitionInfo id={5} />
    </>
  );
}
