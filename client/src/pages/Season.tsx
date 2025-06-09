import { type components } from "../types/api";
import { works } from "../mocks/data/works";
import { seasons } from "../mocks/data/seasons";
import "./works.css"; // ToDo: CSS のインポートの変更

type Work = components["schemas"]["Work"];
type Season = components["schemas"]["Season"];

const season_id: number = 2; // ToDo: season_id を URL パラメータから取得するように変更

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
  return (
    <>
      <main>
        <h1>{seasons[season_id].name}の作品一覧</h1>
        <SeasonImages season_id={season_id} />
      </main>
    </>
  );
}
