import { model, models, Schema } from "mongoose";

export interface IComment {
  _id: string;
  createdBy: string;
  name: string;
  lastModifiedBy: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

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
  tags?: string[];
  comments?: IComment[];
}

const CommentSchema = new Schema<IComment>({
  _id: { type: String, required: true },
  createdBy: { type: String, required: true },
  name: { type: String, required: true },
  lastModifiedBy: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    status: { type: String, enum: ["inStock", "outStock"] },
    createdBy: { type: String },
    lastModifiedBy: String,
    count: { type: Number },
    oldPrice: Number,
    category: String,
    images: [{ type: String }],
    colors: [{ type: String }],
    tags: [{ type: String }],
    comments: [CommentSchema],
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
