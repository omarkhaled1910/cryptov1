import { model, models, Schema } from "mongoose";

// Define the shipping details interface
interface IShippingDetails {
  country: string;
  city: string;
  street: string;
  id: string;
}

// Update the IClient interface to use an array of IShippingDetails
export interface IClient {
  phone_Number: string;
  is_Verfied: boolean;
  lastVisited: string;
  name: string;
  shipping_Details?: IShippingDetails[]; // Use an array here
  code?: string;
}

// Define the schema for shipping details
const ShippingDetailsSchema = new Schema<IShippingDetails>(
  {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    id: { type: String, required: true },
  },
  { _id: false }
); // Disable the _id field for this sub-document

// Update the ClientSchema to use the array of ShippingDetailsSchema
const ClientSchema = new Schema<IClient>(
  {
    phone_Number: { type: String, required: true },
    is_Verfied: { type: Boolean, default: false },
    code: { type: String, required: false },
    lastVisited: { type: String, required: true },
    name: { type: String, required: true },
    shipping_Details: { type: [ShippingDetailsSchema], required: false }, // Use an array of the shipping details schema
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

const Client = models.Client || model<IClient>("Client", ClientSchema);
export default Client;
