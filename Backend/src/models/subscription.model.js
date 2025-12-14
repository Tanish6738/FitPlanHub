import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
  },
  { timestamps: true }
);

subscriptionSchema.index({ userId: 1, planId: 1 }, { unique: true });

const Subscription = model("Subscription", subscriptionSchema);

export default Subscription;
