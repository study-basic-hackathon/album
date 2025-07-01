import { type components } from "../types/api";
import "./works.css"; // ToDo: CSS のインポートの変更
import { useParams } from "react-router";
import { useExhibition, useExhibitionWorkListItems } from "../hooks/exhibition";
import WorksImages from "../components/WorksImages";
import Heading from "../components/Heading";

type Exhibition = components["schemas"]["Exhibition"];
type Work = components["schemas"]["Work"];

export default function Exhibition() {
  const params = useParams();
  const exhibitionId = Number(params.exhibitionId);
  const exhibition = useExhibition(exhibitionId);
  const exhibitionWorks: Work[] = Object.values(useExhibitionWorkListItems(exhibitionId)).map(
    (item) => item.work
  );

  if (!exhibition || exhibitionWorks.length === 0) {
    return <h1>指定された華展は存在しません</h1>;
  }

  return (
    <>
      <Heading title={`${exhibition.name}の作品一覧`} />
      <WorksImages works={exhibitionWorks} />
    </>
  );
}
