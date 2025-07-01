import { type components } from "../types/api";
import { useExhibition } from "../hooks/exhibition";
import { useExhibitionWorkListItem } from "../hooks/exhibition";
import "./work.css";
import { Link, useParams } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";
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
  const previousWorkUrl: string = `/exhibition/${exhibitionId}/work/${navigation.previous}`;
  const nextWorkUrl: string = `/exhibition/${exhibitionId}/work/${navigation.next}`;
  return (
    <nav className={styles.adjacentNav}>
      <ul>
        <li>{navigation.previous ? <a href={previousWorkUrl}>←</a> : <span></span>}</li>
        <li>{navigation.next ? <a href={nextWorkUrl}>→</a> : <span></span>}</li>
      </ul>
    </nav>
  );
}

export default function ExhibitionWork() {
  const params = useParams();
  const exhibitionId = Number(params.exhibitionId);
  const workId = Number(params.workId);

  const workListItem = useExhibitionWorkListItem(exhibitionId, workId);
  const work = workListItem?.work;
  const navigation = workListItem?.navigation;
  const exhibition = useExhibition(work?.exhibition_id);

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
