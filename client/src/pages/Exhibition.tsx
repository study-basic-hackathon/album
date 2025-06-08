import { type components } from "../types/api";
import { works } from "../mocks/data/works";
import { exhibitions } from "../mocks/data/exhibitions";
import "./exhibition.css"; // ToDo: CSS のインポートの変更

type Work = components["schemas"]["Work"];
type Exhibition = components["schemas"]["Exhibition"];

// ToDo: exhibition_id を URL パラメータから取得するように変更
const exhibition_id: number = 1;

function getWorksForExhibition(exhibitionId: number): Work[] {
  return Object.values(works).filter((work) => work.exhibition_id === exhibitionId);
}

export function ExhibitionImages({ exhibition_id }: { exhibition_id: number }) {
  if (!exhibition_id) {
    return <p>No exhibition selected.</p>;
  }
  const exhibitionWorks = getWorksForExhibition(exhibition_id);
  return (
    <>
      <div>
        <ul role="list" className="image-list">
          {exhibitionWorks.map((work, index) => (
            <li>
              <img
                className="image-list__image"
                key={index}
                src={work.image_urls[0]}
                alt={work.title ? work.title : "無題の作品"}
              />
              {/* ToDo: 遅延読み込み */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Exhibition() {
  return (
    <>
      <main>
        <h1>{exhibitions[exhibition_id].name}</h1>
        <ExhibitionImages exhibition_id={exhibition_id} />
      </main>
    </>
  );
}
