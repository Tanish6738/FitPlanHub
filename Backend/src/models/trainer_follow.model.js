import { Schema, model } from "mongoose";

const trainerFollowSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trainerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

trainerFollowSchema.index({ userId: 1, trainerId: 1 }, { unique: true });

const TrainerFollow = model("TrainerFollow", trainerFollowSchema);

export default TrainerFollow;
