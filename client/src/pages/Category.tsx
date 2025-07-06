import { type components } from "../types/api";
import { useParams } from "react-router";
import { useCategory, useCategoryWorkListItems } from "../hooks/category";
import WorksImages from "../components/WorksImages";
import Heading from "../components/Heading";
import Fallback from "../components/Fallback";
import Head from "../components/Head";

type Work = components["schemas"]["Work"];
type Category = components["schemas"]["Category"];

export default function Category() {
  const params = useParams();
  const categoryId = Number(params.categoryId);
  const {
    category,
    isLoading: categoryIsLoading,
    errorMessage: categoryErrorMessage,
  } = useCategory(categoryId);
  const {
    workListItems,
    isLoading: worksIsLoading,
    errorMessage: worksErrorMessage,
  } = useCategoryWorkListItems(categoryId);
  const categoryWorks: Work[] = workListItems
    ? Object.values(workListItems).map((item) => item.work)
    : [];
  const isLoading = categoryIsLoading || worksIsLoading;
  const errorMessage = categoryErrorMessage || worksErrorMessage;

  if (isLoading) {
    return <Fallback message="カテゴリーの作品一覧を読み込み中..." />;
  }
  if (errorMessage) {
    return <Fallback message={errorMessage} isError />;
  }
  if (!category || categoryWorks.length === 0) {
    return <Fallback message="指定されたカテゴリーは存在しません" isError />;
  }

  return (
    <>
      <Head
        title={`${category.name}の作品一覧`}
        description={`${category.name}の作品一覧ページです。`}
      />
      <Heading title={`${category.name}の作品一覧`} />
      <WorksImages works={categoryWorks} />
    </>
  );
}
