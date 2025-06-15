import { useMemo } from "react";
import { useReactTable, getCoreRowModel, createColumnHelper } from "@tanstack/react-table";
import AdvancedTable from "../AdvancedTable";
import { format } from "date-fns";

import type { components } from "@/types/api";

type WorkListItem = components["schemas"]["WorkListItem"];
type Arranger = components["schemas"]["Arranger"];
type Material = components["schemas"]["Material"];
type Category = components["schemas"]["Category"];
type Season = components["schemas"]["Season"];

type DisplayWorkRow = {
  id: number;
  title: string | null;
  arrangerName: string;
  seasonName: string;
  categoryName: string;
  materialNames: string;
  createdAt: string;
};

const columnHelper = createColumnHelper<DisplayWorkRow>();

export default function WorksTable({
  works,
  arrangers,
  materials,
  categories,
  seasons,
  onRowClick,
}: {
  works: WorkListItem[];
  arrangers: Arranger[];
  materials: Material[];
  categories: Category[];
  seasons: Season[];
  onRowClick?: (work: WorkListItem) => void;
}) {


  const displayRows = useMemo<DisplayWorkRow[]>(() => {
    return works.map(({ work }) => {
      const arrangerName = arrangers.find((a) => a.id === work.arranger_id)?.name ?? "（不明）";
      const seasonName = seasons.find((s) => s.id === work.season_id)?.name ?? "（不明）";
      const categoryName = categories.find((c) => c.id === work.category_id)?.name ?? "（不明）";
      const materialNames = work.material_ids
        ?.map((id) => materials.find((m) => m.id === id)?.name ?? "（不明）")
        .join(", ") ?? "";

      return {
        id: work.id,
        title: work.title ?? "",
        arrangerName,
        seasonName,
        categoryName,
        materialNames,
        createdAt: work.created_at ? format(new Date(work.created_at), "yyyy-MM-dd") : "----",
      };
    });
  }, [works, arrangers, materials, categories, seasons]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "タイトル",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("arrangerName", {
        header: "作者",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("seasonName", {
        header: "季節",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("categoryName", {
        header: "カテゴリ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("materialNames", {
        header: "材料",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("createdAt", {
        header: "作成日",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: displayRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AdvancedTable
      table={table}
      onRowClick={
        onRowClick
          ? (row) => {
              const original = works.find((w) => w.work.id === row.id);
              if (original) onRowClick(original);
            }
          : undefined
      }
    />
  );
}
