import { model, models, Schema } from "mongoose";
import { IShippingDetails } from "./client";

// Define the shipping details interface

// Define the order item interface
interface IOrderItem {
  id: string;
  name: string;
  price: number;
  count: number;
  image: string;
}

// Define the order interface
export interface IOrder {
  userId: string;
  shippingDetails: IShippingDetails;
  paymentMethod: string;
  items: IOrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

// Define the schema for order items
const OrderItemSchema = new Schema<IOrderItem>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
    image: { type: String, required: false },
  },
  { _id: false }
);

// Define the schema for shipping details
const ShippingDetailsSchema = new Schema<IShippingDetails>(
  {
    city: { type: String, required: true },
    street: { type: String, required: true },
    floor: { type: String, required: true },
    apartment: { type: String, required: true },
    buildingNumber: { type: String, required: true },
    id: { type: String, required: true },
  },
  { _id: false }
);

// Define the main order schema
const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    shippingDetails: { type: ShippingDetailsSchema, required: true },
    paymentMethod: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  }
);

const Order = models.Order || model<IOrder>("Order", OrderSchema);
export default Order;
