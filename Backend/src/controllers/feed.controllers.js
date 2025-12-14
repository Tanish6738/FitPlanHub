import Plan from "../models/plan.model.js";
import TrainerFollow from "../models/trainer_follow.model.js";
import Subscription from "../models/subscription.model.js";

export const getUserFeed = async (req, res) => {
  try {
    const userId = req.user.id;

    const follows = await TrainerFollow.find({ userId }).select("trainerId");
    const trainerIds = follows.map(f => f.trainerId);

    if (trainerIds.length === 0) {
      return res.status(200).json([]);
    }

    const plans = await Plan.find({ trainerID: { $in: trainerIds } })
      .populate("trainerID", "name")
      .sort({ createdAt: -1 });

    const subscriptions = await Subscription.find({ userId }).select("planId");
    const subscribedPlanIds = new Set(subscriptions.map(s => s.planId.toString()));

    const feed = plans.map(plan => ({
      _id: plan._id,
      title: plan.title,
      price: plan.price,
      trainerName: plan.trainerID.name,
      trainerId: plan.trainerID._id,
      isPurchased: subscribedPlanIds.has(plan._id.toString())
    }));

    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
