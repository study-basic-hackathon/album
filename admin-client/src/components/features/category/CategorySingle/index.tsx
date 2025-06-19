import { useParams, useNavigate } from "react-router";
import Breadcrumb from "@/components/parts/Breadcrumb";
import Card from "@/components/parts/Card";
import Alert from "@/components/parts/Alert";
import Button from "@/components/parts/Button";

import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from "@/hooks/category";

import UpdateCategoryForm from "./UpdateCategoryForm";

export default function CategorySingle() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const getQuery = useGetCategoryQuery(categoryId);
  const updateMutation = useUpdateCategoryMutation(categoryId);
  const deleteMutation = useDeleteCategoryMutation(categoryId);

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "ホーム", to: "/" },
            { label: "カテゴリ", to: "/categories" },
            {
              label: getQuery.data?.name ?? "カテゴリの詳細",
              to: `/categories/${categoryId}`,
            },
          ]}
        />
      </div>

      {getQuery.isError && (
        <Alert
          variant="error"
          message={getQuery.error.message || "カテゴリの取得に失敗しました"}
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
                navigate("/categories");
              }}
            >
              削除
            </Button>
          </div>

          {deleteMutation.isError && (
            <Alert variant="error" message="カテゴリの削除に失敗しました" />
          )}
          {deleteMutation.isPending && (
            <Alert variant="default" message="カテゴリを削除中…" />
          )}

          <Card>
            <UpdateCategoryForm
              category={getQuery.data}
              mutation={updateMutation}
            />
          </Card>
        </section>
      )}
    </div>
  );
}
