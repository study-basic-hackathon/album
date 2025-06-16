import { type components } from "../types/api";
import { works } from "../mocks/data/works";
import { exhibitions } from "../mocks/data/exhibitions";
import "./works.css"; // ToDo: CSS のインポートの変更
import { Link, useParams } from "react-router";

type Work = components["schemas"]["Work"];
type Exhibition = components["schemas"]["Exhibition"];

function getWorksForExhibition(exhibitionId: number): Work[] {
  return Object.values(works).filter((work) => work.exhibition_id === exhibitionId);
}

function ExhibitionImages({ exhibition_id }: { exhibition_id: number }) {
  if (!exhibition_id) {
    return <p>No exhibition selected.</p>;
  }
  const exhibitionWorks = getWorksForExhibition(exhibition_id);
  return (
    <>
      <div>
        <ul role="list" className="works-image-list">
          {exhibitionWorks.map((work, index) => (
            <li>
              <Link to={`work/${work.id}`}>
                <img
                  className="works-image-list__image"
                  key={index}
                  src={`${import.meta.env.VITE_API_BASE_URL}/works/${work.image_ids[0]}`}
                  alt={work.title ? work.title : "無題の作品"}
                />
              </Link>
              {/* ToDo: 遅延読み込み */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Exhibition() {
  const params = useParams();
  const exhibition_id = Number(params.exhibition_id); // ToDo: exhibition_id が無効な値のときのエラーハンドリング

  return (
    <>
      <main>
        <h1>{exhibitions[exhibition_id].name}の作品一覧</h1>
        <ExhibitionImages exhibition_id={exhibition_id} />
      </main>
    </>
  );
}
