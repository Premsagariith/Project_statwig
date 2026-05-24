const Project = require("../models/project.model");


// Create Project
const createProject = async (projectData) => {
  return await Project.create(projectData);
};


// Get All Projects
const getAllProjects = async ({
  filter,
  skip,
  limit,
  sort,
}) => {

  return await Project.find(filter)
    .populate("createdBy", "name email role")
    .populate("members", "name email role")
    .sort(sort)
    .skip(skip)
    .limit(limit);
};


// Count Projects
const countProjects = async (filter) => {
  return await Project.countDocuments(filter);
};


// Get Project By ID
const getProjectById = async (projectId) => {

  return await Project.findById(projectId)
    .populate("createdBy", "name email role")
    .populate("members", "name email role");
};


// Update Project
const updateProject = async (
  projectId,
  updateData
) => {

  return await Project.findByIdAndUpdate(
    projectId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("createdBy", "name email role")
    .populate("members", "name email role");
};


// Delete Project
const deleteProject = async (projectId) => {
  return await Project.findByIdAndDelete(projectId);
};


module.exports = {
  createProject,
  getAllProjects,
  countProjects,
  getProjectById,
  updateProject,
  deleteProject,
};