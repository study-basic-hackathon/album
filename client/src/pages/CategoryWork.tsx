import { type components } from "../types/api";
import { useCategory } from "../hooks/category";
import { useCategoryWorkListItem } from "../hooks/category";
import { useParams, Link } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";
import AdjacentNavigationArrows from "@/components/AdjacentNavigationArrows";
import styles from "./scss/work.module.scss";

type Category = components["schemas"]["Category"];
type WorkListNavigation = components["schemas"]["WorkListNavigation"];

function WorkHeading({ category }: { category: Category }) {
  const title: string = category.name;
  const worksUrl: string = `/category/${category.id}`;

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
  categoryId,
  navigation,
}: {
  categoryId: number;
  navigation: WorkListNavigation;
}) {
  const previousWorkUrl = navigation.previous
    ? `/category/${categoryId}/work/${navigation.previous}`
    : undefined;
  const nextWorkUrl = navigation.next
    ? `/category/${categoryId}/work/${navigation.next}`
    : undefined;
  return <AdjacentNavigationArrows previousWorkUrl={previousWorkUrl} nextWorkUrl={nextWorkUrl} />;
}

export default function CategoryWork() {
  const params = useParams();
  const categoryId = Number(params.categoryId);
  const workId = Number(params.workId);

  const workListItem = useCategoryWorkListItem(categoryId, workId);
  const work = workListItem?.work;
  const navigation = workListItem?.navigation;
  const category = useCategory(categoryId);

  // TODO: ローディングと不正なアクセスを切り分けて表示する
  if (!workListItem || !work || !navigation || !category) {
    return <h1>指定された作品は存在しません</h1>;
  }

  return (
    <>
      <WorkHeading category={category} />
      <WorkImages work={work} />
      <AdjacentNavigation categoryId={categoryId} navigation={navigation} />
      <WorkMetadata work={work} />
    </>
  );
}
