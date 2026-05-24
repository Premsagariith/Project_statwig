const ApiError = require("../utils/ApiError");
const mongoose = require('mongoose');
const Task = require("../models/task.model");

const {
  getAllTasks,
  countTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../repositories/task.repository");


// ==============================
// CREATE TASK SERVICE
// ==============================
const createTaskService = async (
  taskData
) => {

  const task = await Task.create({

    title: taskData.title,

    description:
      taskData.description,

    priority:
      taskData.priority,

    status:
      taskData.status,

    dueDate:
      taskData.dueDate,

    assignedTo:
      taskData.assignedTo,

    project:
      taskData.project,

    createdBy:
      taskData.createdBy,
  });

  return task;
};


// ==============================
// GET ALL TASKS SERVICE
// ==============================
const getAllTasksService = async ({
  user,
  query,
}) => {

  const page =
    parseInt(query.page) || 1;

  const limit =
    parseInt(query.limit) || 10;

  const skip =
    (page - 1) * limit;

  const search =
    query.search || "";

  const status =
    query.status;

  const priority =
    query.priority;

  const project =
    query.project;

  const assignedUser =
    query.assignedUser;

  // ==========================
  // FILTER
  // ==========================
  const filter = {};

  // Search
  if (search) {

    filter.$text = {
      $search: search,
    };
  }

  // Status
  if (status) {

    filter.status = status;
  }

  // Priority
  if (priority) {

    filter.priority = priority;
  }

  // Project
  if (project) {

    filter.project = project;
  }

  // Assigned User
  if (assignedUser) {

    filter.assignedTo =
      assignedUser;
  }

  // ==========================
  // RBAC
  // ==========================
  if (user.role !== "admin") {

    filter.assignedTo =
      user._id;
  }

  const tasks =
    await getAllTasks({
      filter,
      skip,
      limit,
      sort: {
        createdAt: -1,
      },
    });

  const totalTasks =
    await countTasks(filter);

  return {

    tasks,

    pagination: {

      total: totalTasks,

      page,

      limit,

      totalPages:
        Math.ceil(
          totalTasks / limit
        ),
    },
  };
};


// ==============================
// GET SINGLE TASK SERVICE
// ==============================
const getSingleTaskService =
  async ({
    taskId,
    user,
  }) => {

    const task =
      await getTaskById(taskId);

    if (!task) {

      throw new ApiError(
        404,
        "Task not found"
      );
    }

    // RBAC CHECK
    if (
      user.role !== "admin" &&
      task.assignedTo.toString() !==
        user._id.toString()
    ) {

      throw new ApiError(
        403,
        "You are not authorized to access this task"
      );
    }

    return task;
  };


// ==============================
// UPDATE TASK SERVICE
// ==============================
const updateTaskService =
  async ({
    taskId,
    updateData,
    user,
  }) => {

    const existingTask =
      await getTaskById(taskId);

    if (!existingTask) {

      throw new ApiError(
        404,
        "Task not found"
      );
    }

    // ==========================
    // NORMAL USER
    // ==========================
   // ==========================
// NORMAL USER
// ==========================
if (user.role !== "admin") {

  // ONLY STATUS UPDATE ALLOWED
  const allowedFields = [
    "status",
  ];

  const updateFields =
    Object.keys(updateData);

  const isAllowed =
    updateFields.every(
      (field) =>
        allowedFields.includes(
          field
        )
    );

  if (!isAllowed) {

    throw new ApiError(
      403,
      "You can only update task status"
    );
  }

  // USER CAN UPDATE ONLY OWN TASK
  if (
    existingTask.assignedTo.toString() !==
    user._id.toString()
  ) {

    throw new ApiError(
      403,
      "You are not authorized to update this task"
    );
  }
}

    const updatedTask =
      await updateTask(
        taskId,
        updateData
      );

    return updatedTask;
  };


// ==============================
// DELETE TASK SERVICE
// ==============================
const deleteTaskService =
  async (taskId) => {

    const deletedTask =
      await deleteTask(taskId);

    if (!deletedTask) {

      throw new ApiError(
        404,
        "Task not found"
      );
    }

    return deletedTask;
  };


// ==============================
// DASHBOARD STATS
// ==============================
// ==============================
// DASHBOARD STATS
// ==============================
const getDashboardStatisticsService =
  async (user) => {

    let filter = {};

    // ==========================
    // USER => ONLY ASSIGNED TASKS
    // ==========================
    if (user.role !== "admin") {

      filter = {
        assignedTo: user._id,
      };
    }

    // ==========================
    // ADMIN => ALL TASKS
    // ==========================
    const tasks = await Task.find(
      filter
    )

      .sort({
        createdAt: -1,
      })

      .populate(
        "project",
        "name"
      )

      .populate(
        "assignedTo",
        "name email"
      );

    // ==========================
    // TOTAL TASKS
    // ==========================
    const totalTasks =
      tasks.length;

    // ==========================
    // COMPLETED TASKS
    // ==========================
    const completedTasks =
      tasks.filter(
        (task) =>
          task.status === "done"
      ).length;

    // ==========================
    // PENDING TASKS
    // ==========================
    const pendingTasks =
      tasks.filter(
        (task) =>
          task.status !== "done"
      ).length;

    // ==========================
    // HIGH PRIORITY TASKS
    // ==========================
    const highPriorityTasks =
      tasks.filter(
        (task) =>
          task.priority === "high"
      ).length;

    // ==========================
    // RECENT TASKS
    // ==========================
    const recentTasks =
      tasks.slice(0, 5);

    return {

      totalTasks,

      completedTasks,

      pendingTasks,

      highPriorityTasks,

      recentTasks,
    };
  };
module.exports = {
  createTaskService,
  getAllTasksService,
  getSingleTaskService,
  updateTaskService,
  deleteTaskService,
  getDashboardStatisticsService,
};