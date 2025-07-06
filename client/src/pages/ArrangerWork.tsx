import { type components } from "../types/api";
import { useArranger } from "../hooks/arranger";
import { useArrangerWorkListItem } from "../hooks/arranger";
import { useParams, Link } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";
import AdjacentNavigationArrows from "../components/AdjacentNavigationArrows";
import Fallback from "../components/Fallback";
import Head from "../components/Head";
import styles from "./scss/work.module.scss";

type Arranger = components["schemas"]["Arranger"];
type WorkListNavigation = components["schemas"]["WorkListNavigation"];

function WorkHeading({ arranger }: { arranger: Arranger }) {
  const title: string = arranger.name;
  const worksUrl: string = `/arranger/${arranger.id}`;
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
  arrangerId,
  navigation,
}: {
  arrangerId: number;
  navigation: WorkListNavigation;
}) {
  const previousWorkUrl = navigation.previous
    ? `/arranger/${arrangerId}/work/${navigation.previous}`
    : undefined;
  const nextWorkUrl = navigation.next
    ? `/arranger/${arrangerId}/work/${navigation.next}`
    : undefined;
  return <AdjacentNavigationArrows previousWorkUrl={previousWorkUrl} nextWorkUrl={nextWorkUrl} />;
}

export default function ArrangerWork() {
  const params = useParams();
  const arrangerId = Number(params.arrangerId);
  const workId = Number(params.workId);

  const {
    workListItem,
    isLoading: workListItemIsLoading,
    errorMessage: workListItemErrorMessage,
  } = useArrangerWorkListItem(arrangerId, workId);
  const work = workListItem?.work;
  const navigation = workListItem?.navigation;
  const {
    arranger,
    isLoading: arrangerIsLoading,
    errorMessage: arrangerErrorMessage,
  } = useArranger(arrangerId);
  const isLoading = workListItemIsLoading || arrangerIsLoading;
  const errorMessage = workListItemErrorMessage || arrangerErrorMessage;

  if (isLoading) {
    return <Fallback message="作品を読み込み中..." />;
  }
  if (errorMessage) {
    return <Fallback message={errorMessage} isError />;
  }
  if (!workListItem || !work || !navigation || !arranger) {
    return <Fallback message="指定された作品は存在しません" isError />;
  }

  return (
    <>
      <Head
        title={`${arranger.name}の作品`}
        description={`${arranger.name}の作品の詳細ページです。`}
      />
      <WorkHeading arranger={arranger} />
      <WorkImages work={workListItem.work} />
      <AdjacentNavigation arrangerId={arrangerId} navigation={navigation} />
      <WorkMetadata work={workListItem.work} />
    </>
  );
}
