import Subscription from "../models/subscription.model.js";
import Plan from "../models/plan.model.js";

export const subscribeToPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const userId = req.user.id;

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const existingSubscription = await Subscription.findOne({ userId, planId });
    if (existingSubscription) {
      return res.status(400).json({ message: "Already subscribed to this plan" });
    }

    const subscription = await Subscription.create({ userId, planId });

    res.status(201).json({ message: "Subscribed successfully", subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscriptions = await Subscription.find({ userId }).populate({
      path: "planId",
      populate: { path: "trainerID", select: "name" }
    });

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
