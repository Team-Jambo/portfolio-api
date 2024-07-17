import { Project } from "../model/project_model.js";
import { User } from "../model/user_model.js";
import { projectSchema } from "../schema/project_schema.js";


//  defining routes to get projects, create projects and find projects by id
export const getAllProjects = async (req, res) => {
    try {
        //we are fetching projects that belongs to a particular user
        const userId = req.params.id
        const allprojects = await Project.find({user: userId})
    if(allprojects.length == 0){
        return res.status(404).send('No project available!');
    }
    res.status(200).json({project: allprojects});
    } catch (error) {
        return res.status(500).send(error);
    }
};


export const postProject = async (req, res) => {
    try {
        const {error, value} = projectSchema.validate(req.body);
        if(error){
            return res.status(400).send(error.details[0].message)
        };

        //create project with the value
        const project = await Project.create(value);

        //after, find the user with the id that you passed when creating the project 
        const userId = req.session?.user?.id || req?.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        //if you find the user, push the project id you just created inside
        user.project.push(project._id);

        //and save the user now with the projectId
        await user.save();

        //return the project
        res.status(201).json({project});
    } catch (error) {
        console.error("Can't add project: ", error);
        return res.status(500).send(error);
    }
};

export const getOneProject = async (req, res) => {

    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch (error) {
        return res.status(500).send(error);
    }

};


export const updateProject = async (req, res) => {
    try {
        const { error, value } = projectSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.projectId,
            value,
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).send("Project not found");
        }

        res.status(200).json({ project: updatedProject });
    } catch (error) {
        console.error("Project update error!: ", error);
        res.status(500).send(error.message);
    }
};


export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.projectId);

        if (!deletedProject) {
            return res.status(404).send("Project not found!");
        }

        // Remove project reference from user
        const user = await User.findById(deletedProject.user);
        if (user) {
            user.projects = user.projects.filter(projectId => projectId.toString() !== req.params.projectId);
            await user.save();
        }

        res.status(200).json({ project: deletedProject });
    } catch (error) {
        console.error("Project deletion error: ", error);
        res.status(500).send(error.message);
    }
};

