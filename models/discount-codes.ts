import { model, models, Schema } from "mongoose";

export interface IDiscountCode {
  name: string; // Name of the discount code
  code: string; // The actual code used for discounts
  discountPercentage: number; // Discount percentage
  validFrom: string; // Start date of validity
  validTo: string; // End date of validity
  status: "active" | "inactive"; // Status of the discount code
  description?: string; // Optional description
  createdBy?: string; // Optional description
}

const DiscountCodeSchema = new Schema<IDiscountCode>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    validFrom: {
      type: String,
      required: true,
    },
    validTo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    description: {
      type: String,
      default: "",
    },
    createdBy: {
      type: String,
      default: "",
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

const DiscountCode =
  models.DiscountCode || model("DiscountCode", DiscountCodeSchema);
export default DiscountCode;
