import { type components } from "../types/api";
import "./works.css"; // ToDo: CSS のインポートの変更
import { useParams } from "react-router";
import { useCategory, useCategoryWorkListItems } from "../hooks/category";
import WorksImages from "../components/WorksImages";
import Heading from "../components/Heading";

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
    return <h1>指定されたカテゴリーは存在しません</h1>;
  }

  return (
    <>
      <Heading title={`${category.name}の作品一覧`} />
      <WorksImages works={categoryWorks} />
    </>
  );
}
