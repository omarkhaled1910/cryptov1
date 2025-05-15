import { getOrderById } from "@/app/actions/order";
import { OrderStatusForm } from "./OrderStatusForm";

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrderById(params.id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary p-2 rounded-lg">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Order Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Order ID:</span> {order.id}
              </p>
              <p>
                <span className="font-medium">Status:</span> {order.status}
              </p>
              <p>
                <span className="font-medium">Total:</span> $
                {order.total.toFixed(2)}
              </p>
              <p>
                <span className="font-medium">Payment Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Created At:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
            <div className="space-y-2">
              <p>{order.shippingDetails.street}</p>
              <p>
                {order.shippingDetails.city}, {order.shippingDetails.country}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Update Order Status</h2>
          <OrderStatusForm order={order} />
        </div>
      </div>
    </div>
  );
}
