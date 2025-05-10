import { getAllOrders } from "@/app/actions/order";
import OrdersWrapper from "./OrdersWrapper";

export default async function OrdersPage() {
  const initialData = await getAllOrders();

  return <OrdersWrapper initialData={initialData} />;
}
