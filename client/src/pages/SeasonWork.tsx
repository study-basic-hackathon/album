import { type components } from "../types/api";
import { useSeason } from "../hooks/season";
import { useSeasonWorkListItem } from "../hooks/season";
import { useParams, Link } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";
import AdjacentNavigationArrows from "../components/AdjacentNavigationArrows";
import styles from "./scss/work.module.scss";

type Season = components["schemas"]["Season"];
type WorkListNavigation = components["schemas"]["WorkListNavigation"];

function WorkHeading({ season }: { season: Season }) {
  const title: string = season.name;
  const worksUrl: string = `/exhibition/${season.id}`;
  return (
    <section className={styles.heading}>
      <h1>{title}の作品</h1>
      <nav>
        <Link to={worksUrl}>作品一覧へ戻る</Link>
      </nav>
    </section>
  );
}

function AdjacentNavigation({
  seasonId,
  navigation,
}: {
  seasonId: number;
  navigation: WorkListNavigation;
}) {
  const previousWorkUrl = navigation.previous
    ? `/season/${seasonId}/work/${navigation.previous}`
    : undefined;
  const nextWorkUrl = navigation.next ? `/season/${seasonId}/work/${navigation.next}` : undefined;
  return <AdjacentNavigationArrows previousWorkUrl={previousWorkUrl} nextWorkUrl={nextWorkUrl} />;
}

export default function SeasonWork() {
  const params = useParams();
  const seasonId = Number(params.seasonId);
  const workId = Number(params.workId);

  const workListItem = useSeasonWorkListItem(seasonId, workId);
  const work = workListItem?.work;
  const navigation = workListItem?.navigation;
  const { season, isLoading: seasonIsLoading, errorMessage: seasonErrorMessage } = useSeason(seasonId);

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
