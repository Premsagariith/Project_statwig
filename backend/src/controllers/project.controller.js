const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createProjectService,
  getAllProjectsService,
  getSingleProjectService,
  updateProjectService,
  deleteProjectService,
} = require("../services/project.service");


// Create Project Controller
const createProject = asyncHandler(async (req, res) => {

  const project = await createProjectService({
    ...req.body,
    createdBy: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      "Project created successfully",
      project
    )
  );
});


// Get All Projects Controller
const getProjects = asyncHandler(async (req, res) => {

  const data = await getAllProjectsService({
    user: req.user,
    query: req.query,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      "Projects fetched successfully",
      data
    )
  );
});


// Get Single Project Controller
const getProject = asyncHandler(async (req, res) => {

  const project = await getSingleProjectService({
    projectId: req.params.id,
    user: req.user,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      "Project fetched successfully",
      project
    )
  );
});


// Update Project Controller
const updateProject = asyncHandler(async (req, res) => {

  const updatedProject = await updateProjectService({
    projectId: req.params.id,
    updateData: req.body,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      "Project updated successfully",
      updatedProject
    )
  );
});


const deleteProject = asyncHandler(async (req, res) => {

  await deleteProjectService(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Project deleted successfully"
    )
  );
});


module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};