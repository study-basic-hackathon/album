import { type components } from "../types/api";
import { useMaterial } from "../hooks/material";
import { useMaterialWorkListItem } from "../hooks/material";
import { useParams, Link } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";
import AdjacentNavigationArrows from "../components/AdjacentNavigationArrows";
import Fallback from "../components/Fallback";
import Head from "../components/Head";
import styles from "./scss/work.module.scss";

type Material = components["schemas"]["Material"];
type WorkListNavigation = components["schemas"]["WorkListNavigation"];

function WorkHeading({ material }: { material: Material }) {
  const title: string = material.name;
  const worksUrl: string = `/material/${material.id}`;
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
  materialId,
  navigation,
}: {
  materialId: number;
  navigation: WorkListNavigation;
}) {
  const previousWorkUrl = navigation.previous
    ? `/material/${materialId}/work/${navigation.previous}`
    : undefined;
  const nextWorkUrl = navigation.next
    ? `/material/${materialId}/work/${navigation.next}`
    : undefined;
  return <AdjacentNavigationArrows previousWorkUrl={previousWorkUrl} nextWorkUrl={nextWorkUrl} />;
}

export default function MaterialWork() {
  const params = useParams();
  const materialId = Number(params.materialId);
  const workId = Number(params.workId);

  const {
    workListItem,
    isLoading: workListItemIsLoading,
    errorMessage: workListItemErrorMessage,
  } = useMaterialWorkListItem(materialId, workId);
  const work = workListItem?.work;
  const navigation = workListItem?.navigation;
  const {
    material,
    isLoading: materialIsLoading,
    errorMessage: materialErrorMessage,
  } = useMaterial(materialId);
  const isLoading = workListItemIsLoading || materialIsLoading;
  const errorMessage = workListItemErrorMessage || materialErrorMessage;

  if (isLoading) {
    return <Fallback message="作品情報を読み込み中..." />;
  }
  if (errorMessage) {
    return <Fallback message={errorMessage} isError />;
  }
  if (!workListItem || !work || !navigation || !material) {
    return <Fallback message="指定された作品は存在しません" isError />;
  }

  return (
    <>
      <Head
        title={`${material.name}の作品`}
        description={`${material.name}の作品の詳細ページです。`}
      />
      <WorkHeading material={material} />
      <WorkImages work={work} />
      <AdjacentNavigation materialId={materialId} navigation={navigation} />
      <WorkMetadata work={work} />
    </>
  );
}
