import { Skill} from "../model/skills_model.js";
import { User } from "../model/user_model.js";
import { skillsSchema } from "../schema/skills_schema.js"



//Get all skills
export const getSkills = async (req, res, next) => {
  try {
    //we are fetching education that belongs to a particular user
    const userSessionId = req.session.user.id
    //Get all skills from database
    const allSkills = await Skill.find({ user: userSessionId })
    // if (allSkills.length == 0) {

    //   //Return all skills as response 
    //   res.status(404).send(allSkills)
    // }
    res.status(200).json(allSkills)
  } catch (error) {
    next(error);
  }
};




//Get one skill
export const getSkill = async (req, res, next) => {
  try {
    //Get one skill by id
    const getOneSkill = await Skill.findById(req.params.id)
    //Return a response
    res.status(200).json(getOneSkill)
  } catch (error) {
    next(error);
  }
}





//Post a skill
export const postSkills = async (req, res, next) => {
  try {
    const { error, value } = skillsSchema.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const skill = await Skill.create({ ...value, user: userSessionId });

    user.skill.push(skill.id)

    await user.save();

    res.status(201).json({message:"Skill has been added", skill});
  } catch (error) {
    next(error)
    // return res.status(500).send(error)
  }
};








//Update Skills
export const patchSkills = async (req, res, next) => {
  try {
    //update skills by id
    const updateSkills = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"Skill has been updated", updateSkills});
  } catch (error) {
    next(error);
  }
};



//Delete a skill
export const deleteSkills = async (req, res, next) => {
  try {

    const userSessionId = re.session.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a skill by id
    const deleteOneSkill = await Skill.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneSkill) {
      res.status(200).send("Skill not found")
    }

    user.skills.pull(req.params.id);
    await user.save();
    res.status(200).json("Skill deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



