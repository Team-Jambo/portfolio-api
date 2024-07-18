import { Achievement } from "../model/achievement_model.js";
import { achievementSchema } from "../schema/achievement_schema.js";
import { User } from "../model/user_model.js";



export const getAchievements = async (req, res, next) => {
  try {
    //we are fetching achievements that belongs to a particular user
    const userSessionId = req.session.user.id
    const getAllAchievements = await Achievement.find({ user: userSessionId })

    //Return response
    res.status(200).json(getAllAchievements);
  } catch (error) {
    next(error);
  }
};




//Get one achievement
export const getAchievement = async (req, res, next) => {
  try {
    //Get one achievement by id
    const getOneAchievement = await Achievement.findById(req.params.id);

    //Return a response
    res.status(200).json(getOneAchievement)
  } catch (error) {
    next(error);

  }
}




//Post an achievement
export const postAchievement = async (req, res, next) => {
  try {
    const { error, value } = achievementSchema.validate({
      ...req.body,
      image: req.file.filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    const newAchievement = await Achievement.create({ ...value, user: userSessionId });

    user.achievements.push(newAchievement._id)
    await user.save();

    res.status(201).json({ message: "Achievement has been added.", newAchievement })
  } catch (error) {
    next(console.error('error'));
  }
};





//Update Achievements
export const patchAchievements = async (req, res, next) => {
  try {
    const { error, value } = achievementSchema.validate({
      ...req.body
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    //update achievements by id
    const updateAchievement = await Achievement.findByIdAndUpdate(req.params.id, value, { new: true });

    if (!updateAchievement) {
      return res.status(404).send("Achievement not found");
    }

    //return response
    res.status(200).json({ message: "Achievement has been updated.", updateAchievement });
  } catch (error) {
    next(error);
  }
};




//Delete an achievement
export const deleteAchievements = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send("User not found");
    }
    //Delete an achievement by id
    const deleteOneAchievement = await Achievement.findByIdAndDelete(req.params.id)

    user.achievements.pull(req.params.id);
    await user.save();
    //return response
    res.status(200).json("Achievement deleted")
  } catch (error) {
    next(error)
  }
};


