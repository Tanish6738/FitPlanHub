import Plan from "../models/plan.model.js";
import Subscription from "../models/subscription.model.js";

export const createPlan = async (req, res) => {
  try {
    const { title, description, price, durationInDays } = req.body;
    
    const plan = await Plan.create({
      title,
      description,
      price,
      durationInDays,
      trainerID: req.user.id, 
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find()
      .select("title price trainerID")
      .populate("trainerID", "name");
    
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlanDetails = async (req, res) => {
  try {
    const { planId } = req.params;
    const userId = req.user.id;

    const plan = await Plan.findById(planId).populate("trainerID", "name");
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const isOwner = plan.trainerID._id.toString() === userId;

    const subscription = await Subscription.findOne({ userId, planId });
    const isSubscribed = !!subscription;

    if (isOwner || isSubscribed) {
      return res.status(200).json(plan);
    } else {
      return res.status(200).json({
        _id: plan._id,
        title: plan.title,
        price: plan.price,
        trainerID: plan.trainerID,
        message: "Subscribe to view full details"
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const userId = req.user.id;

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    if (plan.trainerID.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this plan" });
    }

    const updatedPlan = await Plan.findByIdAndUpdate(planId, req.body, { new: true });
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const userId = req.user.id;

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    if (plan.trainerID.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this plan" });
    }

    await Plan.findByIdAndDelete(planId);
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
