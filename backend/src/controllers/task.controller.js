const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createTaskService,
  getAllTasksService,
  getSingleTaskService,
  updateTaskService,
  deleteTaskService,
  getDashboardStatisticsService,
} = require("../services/task.service");


// Create Task Controller
const createTask = asyncHandler(async (req, res) => {

  const task = await createTaskService({
    ...req.body,
    createdBy: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      "Task created successfully",
      task
    )
  );
});


// Get All Tasks Controller
const getTasks = asyncHandler(async (req, res) => {

  const data = await getAllTasksService({
    user: req.user,
    query: req.query,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      "Tasks fetched successfully",
      data
    )
  );
});


// Get Single Task Controller
const getTask = asyncHandler(async (req, res) => {

  const task = await getSingleTaskService({
    taskId: req.params.id,
    user: req.user,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      "Task fetched successfully",
      task
    )
  );
});


// Update Task Controller
const updateTask = asyncHandler(async (req, res) => {

  const updatedTask = await updateTaskService({
    taskId: req.params.id,
    updateData: req.body,
    user: req.user,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      "Task updated successfully",
      updatedTask
    )
  );
});


// Delete Task Controller
const deleteTask = asyncHandler(async (req, res) => {

  await deleteTaskService(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Task deleted successfully"
    )
  );
});


// Dashboard Statistics Controller
const getDashboardStatistics = asyncHandler(
  async (req, res) => {

    const statistics =
      await getDashboardStatisticsService(
        req.user
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Dashboard statistics fetched successfully",
        statistics
      )
    );
  }
);


module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getDashboardStatistics,
};