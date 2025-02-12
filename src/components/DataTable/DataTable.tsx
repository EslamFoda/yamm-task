"use client";

import { Link } from "react-router-dom";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderDecision } from "@/types";
import { Eye } from "lucide-react";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onActionClick?: (item: T, action: string) => void;
  perPage: number;
}

export default function DataTable<
  T extends { id: string; decision?: OrderDecision; active: boolean }
>({ data, columns, perPage, onActionClick }: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: { pageIndex: 0, pageSize: perPage },
    },
  });

  return (
    <ShadcnTable>
      <TableHeader className="sticky top-0 bg-background z-10">
        <TableRow>
          {table.getHeaderGroups()[0].headers.map((header, index) => (
            <TableHead
              key={header.id}
              className={`whitespace-nowrap ${
                index === 0 ? "sticky left-0 bg-background z-10" : ""
              }`}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
          <TableHead className="whitespace-nowrap sticky right-0 bg-background z-10">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell, index) => (
              <TableCell
                key={cell.id}
                className={`whitespace-nowrap ${
                  index === 0 ? "sticky left-0 bg-background z-10" : ""
                }`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
            <TableCell className="whitespace-nowrap sticky right-0 bg-background z-10">
              <div className="flex items-center  space-x-8">
                <Select
                  value={row.original.decision || ""}
                  onValueChange={(value) =>
                    onActionClick && onActionClick(row.original, value)
                  }
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {["reject", "accept", "escalate"].map((decision) => (
                      <SelectItem key={decision} value={decision}>
                        {decision}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Switch
                  checked={row.original.active}
                  onCheckedChange={() =>
                    onActionClick && onActionClick(row.original, "toggle")
                  }
                />
                <Button variant="link" asChild className="p-0">
                  <Link to={`/order/${row.original.id}`}>
                    <Eye />
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </ShadcnTable>
  );
}
