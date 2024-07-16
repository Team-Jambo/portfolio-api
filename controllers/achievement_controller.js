import { Achievement } from "../models/achievement_model.js";
import { Achievement} from "../schema/user_schema.js";
import { User } from "../models/user_model.js";



export const getAchievements = async (req, res, next) => {
  try {
    //we are fetching achievements that belongs to a particular user
    const userSessionId = req.session.user.id
    const getAllAchievements = await Achievement.find({ user: userSessionId })
    if (getAllAchievements.length == 0) {
      res.status(404).send("No achievement added")
    }

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
    const { error, value } = Achievement.validate({
      ...req.body,
      award: req.files.award[0].filename,
      image: req.files.image[0].filename,
    })


    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session.user.id;
    const user = await User.findById(userSessionId);

    const newAchievement = await Achievement.create({ ...value, user: userSessionId });

    user.achievements.push(newAchievement._id)
    await user.save();

    res.status(201).json(newAchievement)
  } catch (error) {
    next(console.error('error'));
  }
};





//Update Achievements
export const patchAchievements = async (req, res, next) => {
  try {
    const { error, value } = Achievement.validate({
      ...req.body,
      award: req.files.award[0].filename,
      image: req.files.image[0].filename
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.use.id;
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
    res.status(200).json(updateAchievement);
  } catch (error) {
    next(error);
  }
};



//Delete an achievement
export const deleteAchievements = async (req, res, next) => {
  try {
    const userSessionId = req.session.user.id;
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
    return res.status(500).json({ error })
  }
};


