import { type components } from "../types/api";
import { useParams } from "react-router";
import { useMaterial, useMaterialWorkListItems } from "../hooks/material";
import WorksImages from "../components/WorksImages";
import Heading from "../components/Heading";

type Work = components["schemas"]["Work"];
type Material = components["schemas"]["Material"];

export default function Material() {
  const params = useParams();
  const materialId = Number(params.materialId);
  const material = useMaterial(materialId);
  const materialWorks: Work[] = Object.values(useMaterialWorkListItems(materialId)).map(
    (item) => item.work
  );

  if (!material || materialWorks.length === 0) {
    return <h1>指定された素材は存在しません</h1>;
  }

  return (
    <>
      <Heading title={`${material.name}の作品一覧`} />
      <WorksImages works={materialWorks} />
    </>
  );
}
