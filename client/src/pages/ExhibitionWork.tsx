import { type components } from "../types/api";
import { useExhibition } from "../hooks/exhibition";
import { useExhibitionWorkListItem } from "../hooks/exhibition";
import { Link, useParams } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";
import AdjacentNavigationArrows from "../components/AdjacentNavigationArrows";
import styles from "./scss/work.module.scss";

type Exhibition = components["schemas"]["Exhibition"];
type WorkListNavigation = components["schemas"]["WorkListNavigation"];

function WorkHeading({ exhibition }: { exhibition: Exhibition }) {
  const title: string = exhibition.name;
  const worksUrl: string = `/exhibition/${exhibition.id}`;
  return (
    <section className={styles.heading}>
      <h1>{title}の作品</h1>
      <nav>
        <Link to={worksUrl}>作品一覧へ戻る</Link>
      </nav>
    </section>
  );
}

// ToDo: 矢印をいい感じのアイコンにする
function AdjacentNavigation({
  exhibitionId,
  navigation,
}: {
  exhibitionId: number;
  navigation: WorkListNavigation;
}) {
  const previousWorkUrl = navigation.previous
    ? `/exhibition/${exhibitionId}/work/${navigation.previous}`
    : undefined;
  const nextWorkUrl = navigation.next
    ? `/exhibition/${exhibitionId}/work/${navigation.next}`
    : undefined;
  return <AdjacentNavigationArrows previousWorkUrl={previousWorkUrl} nextWorkUrl={nextWorkUrl} />;
}

export default function ExhibitionWork() {
  const params = useParams();
  const exhibitionId = Number(params.exhibitionId);
  const workId = Number(params.workId);

  const workListItem = useExhibitionWorkListItem(exhibitionId, workId);
  const work = workListItem?.work;
  const navigation = workListItem?.navigation;
  const { exhibition, isLoading: exhibitionIsLoading, errorMessage: exhibitionErrorMessage } = useExhibition(exhibitionId);
  
  // TODO: ローディングと不正なアクセスを切り分けて表示する
  if (!workListItem || !work || !navigation || !exhibition) {
    return <h1>指定された作品は存在しません</h1>;
  }

  return (
    <>
      <WorkHeading exhibition={exhibition} />
      <WorkImages work={work} />
      <AdjacentNavigation exhibitionId={exhibitionId} navigation={navigation} />
      <WorkMetadata work={work} />
    </>
  );
}
