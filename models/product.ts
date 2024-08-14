import { model, models, Schema } from "mongoose";

export interface IProduct {
  price: number;
  name: string;
  status: "inStock" | "outStock";
  description: string;
  count: number;
  oldPrice?: number;
}
const ProductSchema = new Schema<IProduct>(
  {
    name: String,
    description: String,
    price: Number,
    status: String,
    count: Number,
    oldPrice: Number,
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
const Product = models.Product || model("Product", ProductSchema);
export default Product;
