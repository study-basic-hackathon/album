import { type components } from "../types/api";
import { useParams } from "react-router";
import { useMaterial, useMaterialWorkListItems } from "../hooks/material";
import WorksImages from "../components/WorksImages";
import Heading from "../components/Heading";
import Fallback from "../components/Fallback";
import Head from "../components/Head";

type Work = components["schemas"]["Work"];
type Material = components["schemas"]["Material"];

export default function Material() {
  const params = useParams();
  const materialId = Number(params.materialId);
  const {
    material,
    isLoading: materialIsLoading,
    errorMessage: materialErrorMessage,
  } = useMaterial(materialId);
  const {
    workListItems,
    isLoading: worksIsLoading,
    errorMessage: worksErrorMessage,
  } = useMaterialWorkListItems(materialId);
  const materialWorks: Work[] = workListItems
    ? Object.values(workListItems).map((item) => item.work)
    : [];
  const isLoading = materialIsLoading || worksIsLoading;
  const errorMessage = materialErrorMessage || worksErrorMessage;

  if (isLoading) {
    return <Fallback message="素材の作品一覧を読み込み中..." />;
  }
  if (errorMessage) {
    return <Fallback message={errorMessage} isError />;
  }
  if (!material || materialWorks.length === 0) {
    return <Fallback message="指定された素材は存在しません" isError />;
  }

  return (
    <>
      <Head
        title={`${material.name}の作品一覧`}
        description={`${material.name}の作品一覧ページです。`}
      />
      <Heading title={`${material.name}の作品一覧`} />
      <WorksImages works={materialWorks} />
    </>
  );
}
