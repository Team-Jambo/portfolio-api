
import { Education } from "../model/education_model.js";
import { User } from "../model/user_model.js";
import { educationSchema } from "../schema/education_schema.js";

export const addEducation = async (req, res) => {

   try {
    const {error, value} = educationSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    //create education with the value
    const education = await Education.create(value)

    //after, find the user with the id that you passed when creating the education 
    const id = req.session?.user?.id || req?.user?.id; // Assuming user ID is stored in session

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    //if you find the user, push the education id you just created inside
    user.education.push(education._id);
    
    //and save the user now with the educationId
    await user.save();

    //return the education
    res.status(201).json({education})

   } catch (error) {
    return res.status(500).send(error)
   }



}



export const getAllEducation = async (req, res) => {

    try {
        //we are fetching education that belongs to a particular user
        const userId = req.params.id
        const alleducation = await Education.find({user: userId})
    if(alleducation.length == 0){
        return res.status(404).send(alleducation)
    }
    res.status(200).json({education:alleducation})
    } catch (error) {
        
    }

}

export const getOneEducation = async (req, res) => {

    try {
        const education = await Education.findById(req.params.id)
        if (!education) {
            return res.status(404).send('Education not found');
          }
      
          res.status(200).json({ education });
    } catch (error) {
        console.error('Error fetching education:', error);
    res.status(500).send(error.message);
    }

};


export const updateEducation = async (req, res) => {
    try {
      const { error, value } = educationSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const updatedEducation = await Education.findByIdAndUpdate(
        req.params.educationId,
        value,
        { new: true }
      );
  
      if (!updatedEducation) {
        return res.status(404).send('Education not found');
      }
  
      res.status(200).json({ education: updatedEducation });
    } catch (error) {
      console.error('Error updating education:', error);
      res.status(500).send(error.message);
    }
  }; 


  export const deleteEducation = async (req, res) => {
    try {
      const deletedEducation = await Education.findByIdAndDelete(req.params.educationId);
  
      if (!deletedEducation) {
        return res.status(404).send('Education not found');
      }
  
      // Remove education reference from user
      const user = await User.findById(deletedEducation.user);
      if (user) {
        user.education = user.education.filter(educationId => educationId.toString() !== req.params.educationId);
        await user.save();
      }
  
      res.status(200).json({ message: 'Education deleted successfully', education: deletedEducation });
    } catch (error) {
      console.error('Error deleting education:', error);
      res.status(500).send(error.message);
    }
  };
