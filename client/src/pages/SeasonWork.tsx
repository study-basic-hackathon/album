import { type components } from "../types/api";
import { useSeason } from "../hooks/season";
import { useSeasonWorkListItem } from "../hooks/season";
import "./work.css";
import { useParams, Link } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";

type Season = components["schemas"]["Season"];
type WorkListNavigation = components["schemas"]["WorkListNavigation"];

function WorkHeading({ season }: { season: Season }) {
  const title: string = season.name;
  const worksUrl: string = `/exhibition/${season.id}`;
  return (
    <>
      <h1>{title}の作品</h1>
      <nav>
        <Link to={worksUrl}>作品一覧へ戻る</Link>
      </nav>
    </>
  );
}

function AdjacentNavigation({
  seasonId,
  navigation,
}: {
  seasonId: number;
  navigation: WorkListNavigation;
}) {
  const previousWorkUrl: string = `/season/${seasonId}/work/${navigation.previous}`;
  const nextWorkUrl: string = `/season/${seasonId}/work/${navigation.next}`;
  return (
    <nav className="adjacent-nav">
      <ul>
        <li>{navigation.previous ? <a href={previousWorkUrl}>前の作品</a> : <span></span>}</li>
        <li>{navigation.next ? <a href={nextWorkUrl}>次の作品</a> : <span></span>}</li>
      </ul>
    </nav>
  );
}

export default function SeasonWork() {
  const params = useParams();
  const seasonId = Number(params.seasonId);
  const workId = Number(params.workId);

  const workListItem = useSeasonWorkListItem(seasonId, workId);
  const work = workListItem?.work;
  const navigation = workListItem?.navigation;
  const season = useSeason(seasonId);

  // TODO: ローディングと不正なアクセスを切り分けて表示する
  if (!workListItem || !work || !navigation || !season) {
    return <h1>指定された作品は存在しません</h1>;
  }

  return (
    <>
      <WorkHeading season={season} />
      <WorkImages work={work} />
      <AdjacentNavigation seasonId={seasonId} navigation={navigation} />
      <WorkMetadata work={work} />
    </>
  );
}
