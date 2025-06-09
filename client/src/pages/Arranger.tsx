import { type components } from "../types/api";
import { works } from "../mocks/data/works";
import { arrangers } from "../mocks/data/arranger";
import "./works.css"; // ToDo: CSS のインポートの変更

type Work = components["schemas"]["Work"];
type Arranger = components["schemas"]["Arranger"];

const arranger_id: number = 2; // ToDo: arranger_id を URL パラメータから取得するように変更

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
  return (
    <>
      <main>
        <h1>{arrangers[arranger_id].name}の作品一覧</h1>
        <ArrangerImages arranger_id={arranger_id} />
      </main>
    </>
  );
}
