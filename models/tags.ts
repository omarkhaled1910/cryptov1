import { model, models, Schema } from "mongoose";

export interface ITag {
  tags: string[];
  _id: string;
}

const TagSchema = new Schema<ITag>(
  {
    tags: { type: [String], default: [] },
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

const Tag = models.Tag || model("Tag", TagSchema);
export default Tag;
