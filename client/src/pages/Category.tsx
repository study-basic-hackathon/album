import { type components } from "../types/api";
import "./works.css"; // ToDo: CSS のインポートの変更
import { useParams } from "react-router";
import { useCategory, useCategoryWorkListItems } from "../hooks/category";
import WorksImages from "../components/WorksImages";

type Work = components["schemas"]["Work"];
type Category = components["schemas"]["Category"];

export default function Category() {
  const params = useParams();
  const categoryId = Number(params.categoryId);
  const category = useCategory(categoryId);
  const categoryWorks: Work[] = Object.values(useCategoryWorkListItems(categoryId)).map(
    (item) => item.work
  );

  if (!category || categoryWorks.length === 0) {
    return (
      <main>
        <h1>指定されたカテゴリーは存在しません</h1>
      </main>
    );
  }

  return (
      <main>
        <h1>{category.name}の作品一覧</h1>
        <WorksImages works={categoryWorks} />
      </main>
  );
}
