import { type components } from "../types/api";
import { useParams } from "react-router";
import { useArranger, useArrangerWorkListItems } from "../hooks/arranger";
import WorksImages from "../components/WorksImages";
import Heading from "../components/Heading";
import Fallback from "../components/Fallback";

type Arranger = components["schemas"]["Arranger"];
type Work = components["schemas"]["Work"];

export default function Arranger() {
  const params = useParams();
  const arrangerId = Number(params.arrangerId);
  const {
    arranger,
    isLoading: arrangerIsLoading,
    errorMessage: arrangerErrorMessage,
  } = useArranger(arrangerId);
  const {
    workListItems,
    isLoading: worksIsLoading,
    errorMessage: worksErrorMessage,
  } = useArrangerWorkListItems(arrangerId);
  const arrangerWorks: Work[] = workListItems
    ? Object.values(workListItems).map((item) => item.work)
    : [];
  const isLoading = arrangerIsLoading || worksIsLoading;
  const errorMessage = arrangerErrorMessage || worksErrorMessage;

  if (isLoading) {
    return <Fallback message="作者の作品一覧を読み込み中..." />;
  }
  if (errorMessage) {
    return <Fallback message={errorMessage} isError />;
  }
  if (!arranger || arrangerWorks.length === 0) {
    return <Fallback message="指定された作者は存在しません" isError />;
  }

  return (
    <>
      <Heading title={`${arranger.name}の作品一覧`} />
      <WorksImages works={arrangerWorks} />
    </>
  );
}
