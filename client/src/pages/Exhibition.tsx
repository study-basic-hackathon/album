import { type components } from "../types/api";
import { useParams } from "react-router";
import { useExhibition, useExhibitionWorkListItems } from "../hooks/exhibition";
import WorksImages from "../components/WorksImages";
import Heading from "../components/Heading";
import Fallback from "../components/Fallback";

type Exhibition = components["schemas"]["Exhibition"];
type Work = components["schemas"]["Work"];

export default function Exhibition() {
  const params = useParams();
  const exhibitionId = Number(params.exhibitionId);
  const {
    exhibition,
    isLoading: exhibitionIsLoading,
    errorMessage: exhibitionErrorMessage,
  } = useExhibition(exhibitionId);
  const {
    workListItems,
    isLoading: worksIsLoading,
    errorMessage: worksErrorMessage,
  } = useExhibitionWorkListItems(exhibitionId);
  const exhibitionWorks: Work[] = workListItems
    ? Object.values(workListItems).map((item) => item.work)
    : [];
  const isLoading = exhibitionIsLoading || worksIsLoading;
  const errorMessage = exhibitionErrorMessage || worksErrorMessage;

  if (isLoading) {
    return <Fallback message="華展の作品一覧を読み込み中..." />;
  }
  if (errorMessage) {
    return <Fallback message={errorMessage} isError />;
  }
  if (!exhibition || exhibitionWorks.length === 0) {
    return <Fallback message="指定された華展は存在しません" isError />;
  }
  
  return (
    <>
      <Heading title={`${exhibition.name}の作品一覧`} />
      <WorksImages works={exhibitionWorks} />
    </>
  );
}
