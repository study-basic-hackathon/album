import { type components } from "../types/api";
import "./works.css"; // ToDo: CSS のインポートの変更
import { Link, useParams } from "react-router";
import { useSeason, useSeasonWorkListItems } from "../hooks/season";

type Work = components["schemas"]["Work"];
type Season = components["schemas"]["Season"];

function SeasonImages({ seasonWorks }: { seasonWorks: Work[] }) {
  return (
    <>
      <div>
        <ul role="list" className="works-image-list">
          {seasonWorks.map((work, index) => (
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
export default function Season() {
  const params = useParams();
  const seasonId = Number(params.seasonId);
  const season = useSeason(seasonId);
  const seasonWorks: Work[] = Object.values(useSeasonWorkListItems(seasonId)).map(
    (item) => item.work
  );

  if (!season || seasonWorks.length === 0) {
    return (
      <main>
        <h1>指定された季節は存在しません</h1>
      </main>
    );
  }

  return (
    <>
      <main>
        <h1>{season.name}の作品一覧</h1>
        <SeasonImages seasonWorks={seasonWorks} />
      </main>
    </>
  );
}
