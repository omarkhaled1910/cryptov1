"use client";

import { IOrder } from "@/models/order";
import { updateOrderStatus } from "@/app/actions/order";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface OrderStatusFormProps {
  order: IOrder;
}

export function OrderStatusForm({ order }: OrderStatusFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState(order.status);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateOrderStatus(order.id, status);
      toast({
        title: "Order status updated",
        description: "The order status has been updated successfully",
      });
      router.push(`/dashboard/orders`);
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        value={status}
        onValueChange={(value) => setStatus(value as IOrder["status"])}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Status"}
      </Button>
    </form>
  );
}
