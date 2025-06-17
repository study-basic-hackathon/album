import { type components } from "../types/api";
import "./works.css"; // ToDo: CSS のインポートの変更
import { Link, useParams } from "react-router";
import { useExhibition, useExhibitionWorks } from "../api/exhibition";

type Exhibition = components["schemas"]["Exhibition"];
type Work = components["schemas"]["Work"];

function ExhibitionImages({ exhibitionWorks }: { exhibitionWorks: Work[] }) {
  return (
    <>
      <div>
        <ul role="list" className="works-image-list">
          {exhibitionWorks.map((work, index) => (
            <li key={index}>
              <Link to={`work/${work.id}`}>
                <img
                  className="works-image-list__image"
                  src={`${import.meta.env.VITE_API_BASE_URL}/images/${work.image_ids[0]}`}
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
  const exhibitionId = Number(params.exhibitionId);
  const exhibition = useExhibition(exhibitionId);
  const exhibitionWorks: Work[] = Object.values(useExhibitionWorks(exhibitionId)).map(
    (item) => item.work
  );

  if (!exhibition) {
    return (
      <main>
        <h1>指定された華展は存在しません</h1>
      </main>
    );
  }

  return (
    <>
      <main>
        <h1>{`${exhibition.name}の作品一覧`}</h1>
        <ExhibitionImages exhibitionWorks={exhibitionWorks} />
      </main>
    </>
  );
}
