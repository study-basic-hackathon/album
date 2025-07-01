import { type components } from "../types/api";
import { useArranger } from "../hooks/arranger";
import { useArrangerWorkListItem } from "../hooks/arranger";
import "./work.css";
import { useParams, Link } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";
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
  const previousWorkUrl: string = `/arranger/${arrangerId}/work/${navigation.previous}`;
  const nextWorkUrl: string = `/arranger/${arrangerId}/work/${navigation.next}`;
  return (
    <nav className={styles.adjacentNav}>
      <ul>
        <li>{navigation.previous ? <a href={previousWorkUrl}>←</a> : <span></span>}</li>
        <li>{navigation.next ? <a href={nextWorkUrl}>→</a> : <span></span>}</li>
      </ul>
    </nav>
  );
}

export default function ArrangerWork() {
  const params = useParams();
  const arrangerId = Number(params.arrangerId);
  const workId = Number(params.workId);

  const workListItem = useArrangerWorkListItem(arrangerId, workId);
  const work = workListItem?.work;
  const navigation = workListItem?.navigation;
  const arranger = useArranger(work?.arranger_id);

  // TODO: ローディングと不正なアクセスを切り分けて表示する
  if (!workListItem || !work || !navigation || !arranger) {
    return <h1>指定された作品は存在しません</h1>;
  }

  return (
    <>
      <WorkHeading arranger={arranger} />
      <WorkImages work={workListItem.work} />
      <AdjacentNavigation arrangerId={arrangerId} navigation={navigation} />
      <WorkMetadata work={workListItem.work} />
    </>
  );
}
