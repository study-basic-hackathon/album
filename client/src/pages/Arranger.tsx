import { type components } from "../types/api";
import { useParams } from "react-router";
import { useArranger, useArrangerWorkListItems } from "../hooks/arranger";
import WorksImages from "../components/WorksImages";
import Heading from "../components/Heading";

type Arranger = components["schemas"]["Arranger"];
type Work = components["schemas"]["Work"];

export default function Arranger() {
  const params = useParams();
  const arrangerId = Number(params.arrangerId);
  const arranger = useArranger(arrangerId);
  const arrangerWorks: Work[] = Object.values(useArrangerWorkListItems(arrangerId)).map(
    (item) => item.work
  );

  if (!arranger || arrangerWorks.length === 0) {
    return <h1>指定された作者は存在しません</h1>;
  }

  return (
    <>
      <Heading title={`${arranger.name}の作品一覧`} />
      <WorksImages works={arrangerWorks} />
    </>
  );
}
