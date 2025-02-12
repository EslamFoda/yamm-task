"use client";

import type React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchOrders } from "@/store/ordersSlice";
import { ArrowUpRight, Package } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";

export const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) =>
    state.orders.orders.find((o) => o.id === id)
  );

  useEffect(() => {
    if (!order) {
      dispatch(fetchOrders(1));
    }
  }, [dispatch, order]);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Package className="animate-pulse w-16 h-16 text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={order.store_logo || "/placeholder.svg"}
              alt={order.store_name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <CardTitle className="text-2xl">{order.store_name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Order ID: {order.id}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-4 sm:mt-0 cursor-pointer"
            onClick={() => window.open(order.store_url, "_blank")}
          >
            Visit Store <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Reason
            </h3>
            <p className="text-lg">{order.reason}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Amount
            </h3>
            <p className="text-lg font-semibold">${order.amount.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Status
            </h3>
            <Badge variant={order.active ? "default" : "secondary"}>
              {order.active ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Decision
            </h3>
            <Badge
              variant={order.decision === "reject" ? "destructive" : "default"}
            >
              {(order.decision ?? "not yet").charAt(0).toUpperCase() +
                (order.decision ?? "not yet").slice(1)}
            </Badge>
          </div>
        </div>
        <Separator className="my-6" />
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Items</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-secondary/20 p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
