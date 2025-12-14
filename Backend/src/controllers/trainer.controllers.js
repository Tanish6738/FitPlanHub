import TrainerFollow from "../models/trainer_follow.model.js";
import User from "../models/user.model.js";
import Plan from "../models/plan.model.js";

export const followTrainer = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const userId = req.user.id;

    if (userId === trainerId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const trainer = await User.findById(trainerId);
    if (!trainer || trainer.role !== "trainer") {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const existingFollow = await TrainerFollow.findOne({ userId, trainerId });
    if (existingFollow) {
      return res.status(400).json({ message: "Already following this trainer" });
    }

    await TrainerFollow.create({ userId, trainerId });
    res.status(200).json({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unfollowTrainer = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const userId = req.user.id;

    const deleted = await TrainerFollow.findOneAndDelete({ userId, trainerId });
    if (!deleted) {
      return res.status(400).json({ message: "Not following this trainer" });
    }

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowedTrainers = async (req, res) => {
  try {
    const userId = req.user.id;
    const follows = await TrainerFollow.find({ userId }).populate("trainerId", "name email");
    
    const trainers = follows.map(f => f.trainerId);
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrainerProfile = async (req, res) => {
  try {
    const { trainerId } = req.params;
    
    const trainer = await User.findById(trainerId).select("name email role");
    if (!trainer || trainer.role !== "trainer") {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const plans = await Plan.find({ trainerID: trainerId }).select("title price durationInDays");

    let isFollowing = false;
    if (req.user) {
        const follow = await TrainerFollow.findOne({ userId: req.user.id, trainerId });
        isFollowing = !!follow;
    }

    res.status(200).json({ trainer, plans, isFollowing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
