import { type ComponentPropsWithoutRef } from "react";
import { table, tableRow, tableHeadCell, tableCell } from "./style";

export function Table({
  className,
  variant = "default",
  ...props
}: ComponentPropsWithoutRef<"table"> & {
  variant?: "default" | "bordered";
}) {
  return (
    <table className={table({ variant, class: className })} {...props} />
  );
}

// <thead>
export function TableHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead className={table({ class: className })} {...props} />
  );
}

// <tbody>
export function TableBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"tbody">) {
  return <tbody className={className} {...props} />;
}

// <tr>
export function TableRow({
  className,
  striped = false,
  ...props
}: ComponentPropsWithoutRef<"tr"> & { striped?: boolean }) {
  return (
    <tr className={tableRow({ striped, class: className })} {...props} />
  );
}

// <th>
export function TableHeadCell({
  className,
  ...props
}: ComponentPropsWithoutRef<"th">) {
  return (
    <th className={tableHeadCell({ class: className })} {...props} />
  );
}

// <td>
export function TableCell({
  className,
  ...props
}: ComponentPropsWithoutRef<"td">) {
  return (
    <td className={tableCell({ class: className })} {...props} />
  );
}
