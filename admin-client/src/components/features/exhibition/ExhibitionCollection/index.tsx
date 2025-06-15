import Breadcrumb from "@/components/parts/Breadcrumb";
import LinkButton from "@/components/parts/Button/LinkButton";

import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import AdvancedTable from "@/components/parts/AdvancedTable";
import type { components } from "@/types/api";
import Card from "@/components/parts/Card";
import { useNavigate } from "react-router";
import { useGetExhibitionsQuery } from "@/hooks/exhibition";

type Exhibition = components["schemas"]["Exhibition"];


export default function ExhibitionCollection() {
  const navigate = useNavigate();
  const query = useGetExhibitionsQuery();

  const columns: ColumnDef<Exhibition>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span>,
    },
    {
      accessorKey: "name",
      header: "名称",
    },
    {
      accessorKey: "started_date",
      header: "開始日",
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      accessorKey: "ended_date",
      header: "終了日",
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
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
            { label: "花展", to: "/exhibitions" },
          ]}
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-xl font-bold">花展</h1>
        <LinkButton to="/exhibitions/new" variant="primary">
          作成
        </LinkButton>
      </div>
      <Card>
        <AdvancedTable
          table={table}
          onRowClick={(row) => {
            navigate(`/exhibitions/${row.id}`)
          }} />
      </Card>
    </div>
  );
}
