import { useParams, useNavigate } from "react-router";
import Breadcrumb from "@/components/parts/Breadcrumb";
import Card from "@/components/parts/Card";
import Alert from "@/components/parts/Alert";
import Button from "@/components/parts/Button";

import UpdateCategoryForm from "./UpdateCategoryForm";
import { useDeleteMaterialMutation, useGetMaterialQuery, useUpdateMaterialMutation } from "@/hooks/material";

export default function CategorySingle() {
  const { materialId } = useParams();
  const navigate = useNavigate();

  const getQuery = useGetMaterialQuery(materialId);
  const updateMutation = useUpdateMaterialMutation(materialId, {
    onSuccess: () => {
      getQuery.refetch();
    }
  });
  const deleteMutation = useDeleteMaterialMutation(materialId);

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "ホーム", to: "/" },
            { label: "花材", to: "/materials" },
            {
              label: getQuery.data?.name ?? "花材の詳細",
              to: `/materials/${materialId}`,
            },
          ]}
        />
      </div>

      {getQuery.isError && (
        <Alert
          variant="error"
          message={getQuery.error.message || "花材の取得に失敗しました"}
        />
      )}

      {getQuery.isSuccess && getQuery.data && (
        <section>
          <div className="flex flex-row items-center mb-4 gap-2">
            <h1 className="text-xl font-bold grow-1">{getQuery.data.name}</h1>
            <Button
              variant="danger"
              onClick={async () => {
                if (!window.confirm("本当に削除しますか？")) return;
                await deleteMutation.mutateAsync();
                navigate("/materials");
              }}
            >
              削除
            </Button>
          </div>

          {deleteMutation.isError && (
            <Alert variant="error" message="花材の削除に失敗しました" />
          )}
          {deleteMutation.isPending && (
            <Alert variant="default" message="花材を削除中…" />
          )}

          <Card>
            <UpdateCategoryForm
              material={getQuery.data}
              mutation={updateMutation}
            />
          </Card>
        </section>
      )}
    </div>
  );
}
// This code defines a React component for displaying and managing a single category in an application.
