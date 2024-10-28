import { model, models, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone_Number?: string;
  is_Admin: boolean;
}
const UserSchema = new Schema<IUser>(
  {
    name: String,
    phone_Number: String,
    password: String,
    email: String,
    is_Admin: Boolean,
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
const User = models.User || model("User", UserSchema);
export default User;
