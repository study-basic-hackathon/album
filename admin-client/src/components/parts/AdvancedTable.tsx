import type { Table as ReactTable } from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell
} from './table';

export default function AdvancedTable<T>({
  table,
  onRowClick,
}: {
  table: ReactTable<T>;
  onRowClick?: (row: T) => void;
}) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeadCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : typeof header.column.columnDef.header === "function"
                  ? header.column.columnDef.header(header.getContext())
                  : header.column.columnDef.header}
              </TableHeadCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => onRowClick?.(row.original)} // 👈 ここ
            className="cursor-pointer hover:bg-gray-100" // optional UX
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {typeof cell.column.columnDef.cell === "function"
                  ? cell.column.columnDef.cell(cell.getContext())
                  : cell.column.columnDef.cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
