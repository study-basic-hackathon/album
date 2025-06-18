import { type components } from "../types/api";
import "./works.css"; // ToDo: CSS のインポートの変更
import { Link, useParams } from "react-router";
import { useArranger, useArrangerWorkListItems } from "../hooks/arranger";

type Arranger = components["schemas"]["Arranger"];
type Work = components["schemas"]["Work"];

function ArrangerImages({ arrangerWorks }: { arrangerWorks: Work[] }) {
  return (
    <>
      <div>
        <ul role="list" className="works-image-list">
          {arrangerWorks.map((work, index) => (
            <li key={index}>
              <Link to={`work/${work.id}`}>
                <img
                  className="works-image-list__image"
                  src={`${import.meta.env.VITE_API_BASE_URL}/images/${work.image_ids[0]}`}
                  alt={work.title ? work.title : "無題の作品"}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Arranger() {
  const params = useParams();
  const arrangerId = Number(params.arrangerId);
  const arranger = useArranger(arrangerId);
  const arrangerWorks = Object.values(useArrangerWorkListItems(arrangerId)).map(
    (item) => item.work
  );

  if (!arranger || arrangerWorks.length === 0) {
    return (
      <main>
        <h1>指定された作者は存在しません</h1>
      </main>
    );
  }

  return (
    <>
      <main>
        <h1>{arranger.name}の作品一覧</h1>
        <ArrangerImages arrangerWorks={arrangerWorks} />
      </main>
    </>
  );
}
