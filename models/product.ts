import { model, models, Schema } from "mongoose";

export interface IProduct {
  price: number;
  name: string;
  status: "inStock" | "outStock";
  description: string;
  createdBy: string;
  count: number;
  lastModifiedBy?: string;
  category?: string;
  images?: string[];
  colors?: string[];
  oldPrice?: number;
  tags?: string[]; // Added tags field
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["inStock", "outStock"], required: true },
    createdBy: { type: String, required: true },
    lastModifiedBy: String,
    count: { type: Number, required: true },
    oldPrice: Number,
    category: String,
    images: [{ type: String }],
    colors: [{ type: String }],
    tags: [{ type: String }], // Added tags field
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
