import { type components } from "../types/api";
import { works } from "../mocks/data/works";
import { exhibitions } from "../mocks/data/exhibitions";
import { useParams } from "react-router";
import "./works.css"; // ToDo: CSS のインポートの変更

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
              <img
                className="works-image-list__image"
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
  const { id } = useParams();
  const exhibition_id = Number(id); // ToDo: id が無効な値のときのエラーハンドリング
  return (
    <>
      <header>
        <nav>
          <a href="/">ホームへ戻る</a>
        </nav>
      </header>
      <main>
        <h1>{exhibitions[exhibition_id].name}の作品一覧</h1>
        <ExhibitionImages exhibition_id={exhibition_id} />
      </main>
    </>
  );
}
