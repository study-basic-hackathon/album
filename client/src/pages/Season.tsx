import { type components } from "../types/api";
import { useParams } from "react-router";
import { useSeason, useSeasonWorkListItems } from "../hooks/season";
import WorksImages from "../components/WorksImages";
import Heading from "../components/Heading";
import Fallback from "../components/Fallback";

type Work = components["schemas"]["Work"];
type Season = components["schemas"]["Season"];

export default function Season() {
  const params = useParams();
  const seasonId = Number(params.seasonId);
  const {
    season,
    isLoading: seasonIsLoading,
    errorMessage: seasonErrorMessage,
  } = useSeason(seasonId);
  const {
    workListItems,
    isLoading: worksIsLoading,
    errorMessage: worksErrorMessage,
  } = useSeasonWorkListItems(seasonId);
  const seasonWorks: Work[] = workListItems
    ? Object.values(workListItems).map((item) => item.work)
    : [];
  const isLoading = seasonIsLoading || worksIsLoading;
  const errorMessage = seasonErrorMessage || worksErrorMessage;

  if (isLoading) {
    return <Fallback message="季節の作品一覧を読み込み中..." />;
  }
  if (errorMessage) {
    return <Fallback message={errorMessage} isError />;
  }
  if (!season || seasonWorks.length === 0) {
    return <Fallback message="指定された季節は存在しません" isError />;
  }

  return (
    <>
      <Heading title={`${season.name}の作品一覧`} />
      <WorksImages works={seasonWorks} />
    </>
  );
}
