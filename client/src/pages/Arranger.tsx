import { type components } from "../types/api";
import { works } from "../mocks/data/works";
import { arrangers } from "../mocks/data/arranger";
import "./works.css"; // ToDo: CSS のインポートの変更
import { Link, NavLink, useParams } from "react-router";

type Work = components["schemas"]["Work"];
type Arranger = components["schemas"]["Arranger"];

function getWorksForArranger(arrangerId: number): Work[] {
  return Object.values(works).filter((work) => work.arranger_id === arrangerId);
}

function ArrangerImages({ arranger_id }: { arranger_id: number }) {
  if (!arranger_id) {
    return <p>No arranger selected.</p>;
  }
  const arrangerWorks = getWorksForArranger(arranger_id);
  return (
    <>
      <div>
        <ul role="list" className="works-image-list">
          {arrangerWorks.map((work, index) => (
            <li key={index}>
              <img
                className="works-image-list__image"
                src={work.image_urls[0]}
                alt={work.title ? work.title : "無題の作品"}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Arranger() {
  const params = useParams();
  const arranger_id = Number(params.arranger_id); // ToDo: arranger_id が無効な値のときのエラーハンドリング
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">ホームへ戻る</NavLink>
        </nav>
      </header>
      <main>
        <h1>{arrangers[arranger_id].name}の作品一覧</h1>
        <ArrangerImages arranger_id={arranger_id} />
      </main>
    </>
  );
}
