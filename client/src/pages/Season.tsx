import { type components } from "../types/api";
import { works } from "../mocks/data/works";
import { seasons } from "../mocks/data/seasons";
import "./works.css"; // ToDo: CSS のインポートの変更
import { Link, NavLink, useParams } from "react-router";

type Work = components["schemas"]["Work"];
type Season = components["schemas"]["Season"];

function getWorksForSeason(seasonId: number): Work[] {
  return Object.values(works).filter((work) => work.season_id === seasonId);
}

function SeasonImages({ season_id }: { season_id: number }) {
  if (!season_id) {
    return <p>No season selected.</p>;
  }
  const seasonWorks = getWorksForSeason(season_id);
  return (
    <>
      <div>
        <ul role="list" className="works-image-list">
          {seasonWorks.map((work, index) => (
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
export default function Season() {
  const params = useParams();
  const season_id = Number(params.season_id); // ToDo: season_id が無効な値のときのエラーハンドリング

  return (
    <>
      <header>
        <nav>
          <NavLink to="/">ホームへ戻る</NavLink>
        </nav>
      </header>
      <main>
        <h1>{seasons[season_id].name}の作品一覧</h1>
        <SeasonImages season_id={season_id} />
      </main>
    </>
  );
}
