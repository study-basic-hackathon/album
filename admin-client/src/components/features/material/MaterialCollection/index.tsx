import Breadcrumb from "@/components/parts/Breadcrumb";
import LinkButton from "@/components/parts/Button/LinkButton";

import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import AdvancedTable from "@/components/parts/AdvancedTable";
import type { components } from "@/types/api";
import Card from "@/components/parts/Card";
import { useNavigate } from "react-router";
import { useGetMaterialsQuery } from "@/hooks/material";

type Material = components["schemas"]["Material"];

export default function MaterialCollection() {
  const navigate = useNavigate();
  const query = useGetMaterialsQuery();

  const columns: ColumnDef<Material>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span>,
    },
    {
      accessorKey: "name",
      header: "花材名",
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
            { label: "花材", to: "/materials" },
          ]}
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-xl font-bold">花材</h1>
        <LinkButton to="/materials/new" variant="primary">
          作成
        </LinkButton>
      </div>
      <Card>
        <AdvancedTable
          table={table}
          onRowClick={(row) => {
            navigate(`/materials/${row.id}`);
          }}
        />
      </Card>
    </div>
  );
}
