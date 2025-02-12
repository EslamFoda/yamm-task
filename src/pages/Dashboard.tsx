"use client";

import type React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ColumnDef } from "@tanstack/react-table";
import { Order, OrderDecision } from "@/types";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  fetchOrders,
  toggleOrderStatus,
  updateOrderDecision,
} from "@/store/ordersSlice";
import LoadingState from "@/components/LoadingState";
import DataTable from "@/components/DataTable";
import TablePagination from "@/components/TablePagination";

const columns: ColumnDef<Order>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "reason", header: "Reason" },
  { accessorKey: "store_name", header: "Store Name" },
  {
    accessorKey: "store_logo",
    header: "Store Logo",
    cell: ({ getValue }) => (
      <Avatar>
        <AvatarImage src={getValue() as string} alt="company logo" />
        <AvatarFallback>CL</AvatarFallback>
      </Avatar>
    ),
  },
  { accessorKey: "store_url", header: "Store URL" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => `$${(getValue() as number).toFixed(2)}`,
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ getValue }) =>
      (getValue() as boolean) ? (
        <Badge className="rounded-full" variant="secondary">
          Active
        </Badge>
      ) : (
        <Badge className="rounded-full" variant="destructive">
          Inactive
        </Badge>
      ),
  },
  {
    accessorKey: "decision",
    header: "Decision",
    cell: ({ getValue }) => getValue() || "Not yet",
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ getValue }) => (getValue() as Order["items"]).length,
  },
];

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, status, error, currentPage, totalPages, perPage } =
    useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders(currentPage));
  }, [dispatch, currentPage]);

  const handleAction = (order: Order, action: string) => {
    if (action === "toggle") {
      handleStatusToggle(order.id, !order.active);
    } else {
      const decision = action as OrderDecision;
      handleDecisionChange(order.id, decision);
    }
  };

  const handleDecisionChange = (id: string, decision: OrderDecision) => {
    dispatch(updateOrderDecision({ id, decision })).then(() => {
      toast({
        title: "Decision updated",
        description: `Order ${id} decision changed to ${decision}`,
      });
    });
  };

  const handleStatusToggle = (id: string, active: boolean) => {
    dispatch(toggleOrderStatus({ id, active })).then(() => {
      toast({
        title: "Status updated",
        description: `Order ${id} status changed to ${
          active ? "active" : "inactive"
        }`,
      });
    });
  };

  if (status === "loading") return <LoadingState />;

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refund Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={orders}
          columns={columns}
          onActionClick={handleAction}
          perPage={perPage}
        />

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => dispatch(fetchOrders(page))}
        />
      </CardContent>
    </Card>
  );
};
