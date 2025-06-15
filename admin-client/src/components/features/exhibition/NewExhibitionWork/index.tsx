import { useNavigate, useParams } from "react-router";

import Breadcrumb from "@/components/parts/Breadcrumb";
import Card from "@/components/parts/Card";
import { useGetExhibitionQuery } from "@/hooks/exhibition";
import { useCreateWorkMutation } from "@/hooks/work";
import { useGetArrangersQuery } from "@/hooks/arranger";
import { useGetMaterialsQuery } from "@/hooks/material";
import { useGetCategoriesQuery } from "@/hooks/category";
import { useGetSeasonsQuery } from "@/hooks/season";

import CreateExhibitionWorkForm from "./CreateExhibitionWorkForm";

export default function NewExhibitionWork() {
  const navigate = useNavigate();
  const { exhibitionId } = useParams<{ exhibitionId: string }>();

  const getQuery = useGetExhibitionQuery(exhibitionId);
  const getArrangersQuery = useGetArrangersQuery();
  const getMaterialsQuery = useGetMaterialsQuery();
  const getCategoriesQuery = useGetCategoriesQuery();
  const getSeasonsQuery = useGetSeasonsQuery();

  const mutation = useCreateWorkMutation({
    onSuccess: (id) => {
      const to = `/exhibitions/${exhibitionId}/works/${id}`;
      navigate(to);
    }
  });

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
            {
              label: "作品の作成",
              to: `/exhibitions/${exhibitionId}/works/new`,
            },
          ]}
        />
      </div>
      {(
        getQuery.isSuccess
        && getArrangersQuery.isSuccess
        && getMaterialsQuery.isSuccess
        && getCategoriesQuery.isSuccess
        && getSeasonsQuery.isSuccess
      ) && (
        <section>
          <div className="flex flex-row items-center justify-between mb-4">
            <h1 className="text-xl font-bold">作品の作成</h1>
          </div>
          <Card>
            <CreateExhibitionWorkForm
              exhibition={getQuery.data}
              categories={getCategoriesQuery.data}
              materials={getMaterialsQuery.data}
              seasons={getSeasonsQuery.data}
              arrangers={getArrangersQuery.data}
              mutation={mutation} />
          </Card>
        </section>
      )}
    </div>
  );
}
