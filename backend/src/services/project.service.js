const ApiError = require("../utils/ApiError");

const {
  createProject,
  getAllProjects,
  countProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../repositories/project.repository");


// Create Project Service
const createProjectService = async ({
  name,
  description,
  members,
  status,
  createdBy,
}) => {

  const project = await createProject({
    name,
    description,
    members,
    status,
    createdBy,
  });

  return project;
};


// Get All Projects Service
const getAllProjectsService = async ({
  user,
  query,
}) => {

  const page = parseInt(query.page) || 1;

  const limit = parseInt(query.limit) || 10;

  const skip = (page - 1) * limit;

  const search = query.search || "";

  const status = query.status;


  // Base filter
  const filter = {};


  // Search
  if (search) {
    filter.$text = {
      $search: search,
    };
  }


  // Status filter
  if (status) {
    filter.status = status;
  }


  // RBAC filtering
  if (user.role !== "admin") {
    filter.members = user._id;
  }


  const projects = await getAllProjects({
    filter,
    skip,
    limit,
    sort: { createdAt: -1 },
  });


  const totalProjects = await countProjects(filter);


  return {
    projects,
    pagination: {
      total: totalProjects,
      page,
      limit,
      totalPages: Math.ceil(totalProjects / limit),
    },
  };
};


// Get Single Project Service
const getSingleProjectService = async ({
  projectId,
  user,
}) => {

  const project = await getProjectById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }


  // RBAC Access Check
  if (
    user.role !== "admin" &&
    !project.members.some(
      (member) =>
        member._id.toString() === user._id.toString()
    )
  ) {
    throw new ApiError(
      403,
      "You are not authorized to access this project"
    );
  }

  return project;
};


// Update Project Service
const updateProjectService = async ({
  projectId,
  updateData,
}) => {

  const updatedProject = await updateProject(
    projectId,
    updateData
  );

  if (!updatedProject) {
    throw new ApiError(404, "Project not found");
  }

  return updatedProject;
};


// Delete Project Service
const deleteProjectService = async (projectId) => {

  const deletedProject = await deleteProject(projectId);

  if (!deletedProject) {
    throw new ApiError(404, "Project not found");
  }

  return deletedProject;
};


module.exports = {
  createProjectService,
  getAllProjectsService,
  getSingleProjectService,
  updateProjectService,
  deleteProjectService,
};
