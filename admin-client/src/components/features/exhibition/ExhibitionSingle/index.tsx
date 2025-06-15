import Breadcrumb from "@/components/parts/Breadcrumb";
import Card from "@/components/parts/Card";
import UpdateExhibitionForm from "./UpdateExhibitionForm";

import { useNavigate, useParams } from "react-router";
import Button from "@/components/parts/Button";
import Alert from "@/components/parts/Alert";

import LinkButton from "@/components/parts/Button/LinkButton";
import WorksTable from "@/components/parts/WorksTable";
import { useGetArrangersQuery } from "@/hooks/arranger";
import { useGetMaterialsQuery } from "@/hooks/material";
import { useGetCategoriesQuery } from "@/hooks/category";
import { useGetSeasonsQuery } from "@/hooks/season";
import { useDeleteExhibitionMutation, useGetExhibitionQuery, useGetExhibitionWorksQuery, useUpdateExhibitionMutation } from "@/hooks/exhibition";

export default function ExhibitionSingle() {
  const { exhibitionId } = useParams();
  const navigate = useNavigate();

  const getQuery = useGetExhibitionQuery(exhibitionId);
  const getWorksQuery = useGetExhibitionWorksQuery(exhibitionId);
  const getArrangersQuery = useGetArrangersQuery();
  const getMaterialsQuery = useGetMaterialsQuery();
  const getCategoriesQuery = useGetCategoriesQuery();
  const getSeasonsQuery = useGetSeasonsQuery();

  const updateMutation = useUpdateExhibitionMutation(exhibitionId);
  const deleteMutation = useDeleteExhibitionMutation(exhibitionId);

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "ホーム", to: "/" },
            { label: "花展", to: "/exhibitions" },
            {
              label: getQuery.data?.name ?? "花展の詳細",
              to: `/exhibitions/${exhibitionId}`
            },
          ]}
        />
      </div>
      {getQuery.isSuccess && getQuery.data && (
        <section className="mb-8">
          <div className="flex flex-row items-center mb-4 gap-2">
            <h1 className="text-xl font-bold grow-1">{getQuery.data.name}</h1>
            <Button variant="danger" onClick={async () => {
              if (!window.confirm("本当に削除しますか？")) return;
              await deleteMutation.mutateAsync();
              navigate("/exhibitions");
            }}>
              削除
            </Button>
          </div>
          {deleteMutation.isError && (
            <Alert variant="error" message="花展の削除に失敗しました" />
          )}
          {deleteMutation.isPending && (
            <Alert variant="default" message={`${getQuery.data.name}を削除中`} />
          )}
          <Card>
            <UpdateExhibitionForm
              exhibition={getQuery.data}
              mutation={updateMutation} />
          </Card>
        </section>
      )}
      {(
        getWorksQuery.isSuccess
        && getArrangersQuery.isSuccess
        && getMaterialsQuery.isSuccess
        && getCategoriesQuery.isSuccess
        && getSeasonsQuery.isSuccess
      ) && (
        <section>
          <div className="flex flex-row items-center mb-4 gap-2">
            <h1 className="text-xl font-bold grow-1">作品の一覧</h1>
            <LinkButton
              to={`/exhibitions/${exhibitionId}/works/new`}>
              作品の作成
            </LinkButton>
          </div>
          <Card>
            <WorksTable
              works={getWorksQuery.data}
              arrangers={getArrangersQuery.data}
              materials={getMaterialsQuery.data}
              categories={getCategoriesQuery.data}
              seasons={getSeasonsQuery.data}
              onRowClick={({ work }) => {
                navigate(`/exhibitions/${exhibitionId}/works/${work.id}`);
              }}
            />
          </Card>
        </section>
      )}
    </div>
  );
}
