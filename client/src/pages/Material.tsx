import { type components } from "../types/api";
import "./works.css"; // ToDo: CSS のインポートの変更
import { useParams } from "react-router";
import { useMaterial, useMaterialWorkListItems } from "../hooks/material";
import WorksImages from "../components/WorksImages";

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
    return (
      <main>
        <h1>指定された素材は存在しません</h1>
      </main>
    );
  }

  return (
      <main>
        <h1>{material.name}の作品一覧</h1>
        <WorksImages works={materialWorks} />
      </main>
  );
}
