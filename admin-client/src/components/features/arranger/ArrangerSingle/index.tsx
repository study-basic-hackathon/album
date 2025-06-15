import { useParams, useNavigate } from "react-router";
import Breadcrumb from "@/components/parts/Breadcrumb";
import Card from "@/components/parts/Card";
import Alert from "@/components/parts/Alert";
import Button from "@/components/parts/Button";

import UpdateCategoryForm from "./UpdateCategoryForm";
import { useDeleteArrangerMutation, useGetArrangerQuery, useUpdateArrangerMutation } from "@/hooks/arranger";

export default function CategorySingle() {
  const { arrangerId } = useParams();
  const navigate = useNavigate();

  const getQuery = useGetArrangerQuery(arrangerId);
  const updateMutation = useUpdateArrangerMutation(arrangerId, {
    onSuccess: () => {
      getQuery.refetch();
    }
  });
  const deleteMutation = useDeleteArrangerMutation(arrangerId);

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "ホーム", to: "/" },
            { label: "作者", to: "/arrangers" },
            {
              label: getQuery.data?.name ?? "作者の詳細",
              to: `/arrangers/${arrangerId}`,
            },
          ]}
        />
      </div>

      {getQuery.isError && (
        <Alert
          variant="error"
          message={getQuery.error.message || "作者の取得に失敗しました"}
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
                navigate("/arrangers");
              }}
            >
              削除
            </Button>
          </div>

          {deleteMutation.isError && (
            <Alert variant="error" message="作者の削除に失敗しました" />
          )}
          {deleteMutation.isPending && (
            <Alert variant="default" message="作者を削除中…" />
          )}

          <Card>
            <UpdateCategoryForm
              arranger={getQuery.data}
              mutation={updateMutation}
            />
          </Card>
        </section>
      )}
    </div>
  );
}
// This code defines a React component for displaying and managing a single category in an application.
