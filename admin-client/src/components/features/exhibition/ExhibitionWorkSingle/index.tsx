import { useNavigate, useParams } from "react-router";
import Breadcrumb from "@/components/parts/Breadcrumb";
import Card from "@/components/parts/Card";
import Button from "@/components/parts/Button";
import Alert from "@/components/parts/Alert";
import UpdateWorkForm from "./UpdateWorkForm";

import { useGetWorkQuery, useDeleteWorkMutation, useUpdateWorkMutation } from "@/hooks/work";
import { useGetArrangersQuery } from "@/hooks/arranger";
import { useGetMaterialsQuery } from "@/hooks/material";
import { useGetCategoriesQuery } from "@/hooks/category";
import { useGetSeasonsQuery } from "@/hooks/season";
import { useGetExhibitionQuery } from "@/hooks/exhibition";

export default function ExhibitionWorkSingle() {
  const { exhibitionId, workId } = useParams();
  const navigate = useNavigate();

  const getExhibitionQuery = useGetExhibitionQuery(exhibitionId);
  const getWorkQuery = useGetWorkQuery(workId);
  const deleteMutation = useDeleteWorkMutation(workId);
  const updateMutation = useUpdateWorkMutation(workId, {
    onSuccess: () => {
      getWorkQuery.refetch();
    }
  });

  const getArrangersQuery = useGetArrangersQuery();
  const getMaterialsQuery = useGetMaterialsQuery();
  const getCategoriesQuery = useGetCategoriesQuery();
  const getSeasonsQuery = useGetSeasonsQuery();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "ホーム", to: "/" },
            { label: "花展", to: "/exhibitions" },
            {
              label: getExhibitionQuery.data?.name ?? "花展の詳細",
              to: `/exhibitions/${exhibitionId}`
            },
            {
              label: getWorkQuery.data?.title ?? "作品の詳細",
              to: `/exhibitions/${exhibitionId}/works/${workId}`
            }
          ]}
        />
      </div>

      {getWorkQuery.isError && (
        <Alert variant="error" message={getWorkQuery.error.message || "作品の取得に失敗しました"} />
      )}

      {getWorkQuery.isSuccess && (
        <section className="mb-8">
          <div className="flex flex-row items-center justify-between mb-4">
            <h1 className="text-xl font-bold">{getWorkQuery.data.title ?? "無題の作品"}</h1>
            <Button
              variant="danger"
              onClick={async () => {
                if (!window.confirm("本当に削除しますか？")) return;
                await deleteMutation.mutateAsync();
                navigate(`/exhibitions/${exhibitionId}`);
              }}
            >
              削除
            </Button>
          </div>

          {deleteMutation.isError && (
            <Alert variant="error" message="作品の削除に失敗しました" />
          )}

          <Card>
            <UpdateWorkForm
              work={getWorkQuery.data}
              categories={getCategoriesQuery.data ?? []}
              materials={getMaterialsQuery.data ?? []}
              seasons={getSeasonsQuery.data ?? []}
              arrangers={getArrangersQuery.data ?? []}
              mutation={updateMutation}
            />
          </Card>
        </section>
      )}
    </div>
  );
}
