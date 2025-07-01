import { type components } from "../types/api";
import { useParams } from "react-router";
import { useSeason, useSeasonWorkListItems } from "../hooks/season";
import WorksImages from "../components/WorksImages";
import Heading from "../components/Heading";

type Work = components["schemas"]["Work"];
type Season = components["schemas"]["Season"];

export default function Season() {
  const params = useParams();
  const seasonId = Number(params.seasonId);
  const season = useSeason(seasonId);
  const seasonWorks: Work[] = Object.values(useSeasonWorkListItems(seasonId)).map(
    (item) => item.work
  );

  if (!season || seasonWorks.length === 0) {
    return <h1>指定された季節は存在しません</h1>;
  }

  return (
    <>
      <Heading title={`${season.name}の作品一覧`} />
      <WorksImages works={seasonWorks} />
    </>
  );
}
