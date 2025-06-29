import { type components } from "../types/api";
import { useMaterial } from "../hooks/material";
import { useMaterialWorkListItem } from "../hooks/material";
import "./work.css";
import { useParams, Link } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";

type Material = components["schemas"]["Material"];
type WorkListNavigation = components["schemas"]["WorkListNavigation"];

function WorkHeading({ material }: { material: Material }) {
  const title: string = material.name;
  const worksUrl: string = `/material/${material.id}`;
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
  materialId,
  navigation,
}: {
  materialId: number;
  navigation: WorkListNavigation;
}) {
  const previousWorkUrl: string = `/material/${materialId}/work/${navigation.previous}`;
  const nextWorkUrl: string = `/material/${materialId}/work/${navigation.next}`;
  return (
    <nav className="adjacent-nav">
      <ul>
        <li>{navigation.previous ? <a href={previousWorkUrl}>前の作品</a> : <span></span>}</li>
        <li>{navigation.next ? <a href={nextWorkUrl}>次の作品</a> : <span></span>}</li>
      </ul>
    </nav>
  );
}

export default function MaterialWork() {
  const params = useParams();
  const materialId = Number(params.materialId);
  const workId = Number(params.workId);

  const workListItem = useMaterialWorkListItem(materialId, workId);
  const work = workListItem?.work;
  const navigation = workListItem?.navigation;
  const material = useMaterial(materialId);

  // TODO: ローディングと不正なアクセスを切り分けて表示する
  if (!workListItem || !work || !navigation || !material) {
    return <h1>指定された作品は存在しません</h1>;
  }

  return (
    <>
      <WorkHeading material={material} />
      <WorkImages work={work} />
      <AdjacentNavigation materialId={materialId} navigation={navigation} />
      <WorkMetadata work={work} />
    </>
  );
}
