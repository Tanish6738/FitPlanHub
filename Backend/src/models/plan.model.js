import { Schema, model } from "mongoose";

const planSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    durationInDays: { type: Number, required: true },
    trainerID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const planModel = model("Plan", planSchema);

export default planModel;
