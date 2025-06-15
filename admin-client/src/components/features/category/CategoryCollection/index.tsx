import Breadcrumb from "@/components/parts/Breadcrumb";
import LinkButton from "@/components/parts/Button/LinkButton";

import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import AdvancedTable from "@/components/parts/AdvancedTable";
import type { components } from "@/types/api";
import Card from "@/components/parts/Card";
import { useNavigate } from "react-router";
import { useGetCategoriesQuery } from "@/hooks/category"; // 仮定

type Category = components["schemas"]["Category"];

export default function CategoryCollection() {
  const navigate = useNavigate();
  const query = useGetCategoriesQuery();

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span>,
    },
    {
      accessorKey: "name",
      header: "カテゴリ名",
    },
  ];

  const table = useReactTable({
    data: query.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "ホーム", to: "/" },
            { label: "カテゴリ", to: "/categories" },
          ]}
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-xl font-bold">カテゴリ</h1>
        <LinkButton to="/categories/new" variant="primary">
          作成
        </LinkButton>
      </div>
      <Card>
        <AdvancedTable
          table={table}
          onRowClick={(row) => {
            navigate(`/categories/${row.id}`);
          }}
        />
      </Card>
    </div>
  );
}
