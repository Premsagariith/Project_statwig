const Task = require("../models/task.model");


// ==============================
// CREATE TASK
// ==============================
const createTask = async (
  taskData
) => {

  return await Task.create(
    taskData
  );
};


// ==============================
// GET ALL TASKS
// ==============================
const getAllTasks = async ({
  filter,
  skip,
  limit,
  sort,
}) => {

  return await Task.find(filter)

    // FIXED
    .populate(
      "assignedTo",
      "name email role"
    )

    .populate(
      "project",
      "name status"
    )

    .populate(
      "createdBy",
      "name email role"
    )

    .sort(sort)

    .skip(skip)

    .limit(limit);
};


// ==============================
// COUNT TASKS
// ==============================
const countTasks = async (
  filter
) => {

  return await Task.countDocuments(
    filter
  );
};


// ==============================
// GET TASK BY ID
// ==============================
const getTaskById = async (
  taskId
) => {

  return await Task.findById(
    taskId
  )

    // FIXED
    .populate(
      "assignedTo",
      "name email role"
    )

    .populate(
      "project",
      "name status"
    )

    .populate(
      "createdBy",
      "name email role"
    );
};


// ==============================
// UPDATE TASK
// ==============================
const updateTask = async (
  taskId,
  updateData
) => {

  return await Task.findByIdAndUpdate(
    taskId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  )

    // FIXED
    .populate(
      "assignedTo",
      "name email role"
    )

    .populate(
      "project",
      "name status"
    )

    .populate(
      "createdBy",
      "name email role"
    );
};


// ==============================
// DELETE TASK
// ==============================
const deleteTask = async (
  taskId
) => {

  return await Task.findByIdAndDelete(
    taskId
  );
};


// ==============================
// TASK STATISTICS
// ==============================
const getTaskStatistics =
  async (
    matchFilter = {}
  ) => {

    const stats =
      await Task.aggregate([

        {
          $match:
            matchFilter,
        },

        {
          $facet: {

            totalTasks: [
              {
                $count:
                  "count",
              },
            ],

            completedTasks: [
              {
                $match: {
                  status:
                    "done",
                },
              },
              {
                $count:
                  "count",
              },
            ],

            pendingTasks: [
              {
                $match: {
                  status: {
                    $ne:
                      "done",
                  },
                },
              },
              {
                $count:
                  "count",
              },
            ],

            tasksByPriority: [
              {
                $group: {
                  _id:
                    "$priority",

                  count: {
                    $sum: 1,
                  },
                },
              },
            ],

            tasksByStatus: [
              {
                $group: {
                  _id:
                    "$status",

                  count: {
                    $sum: 1,
                  },
                },
              },
            ],
          },
        },
      ]);

    return stats[0];
  };


module.exports = {
  createTask,
  getAllTasks,
  countTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStatistics,
};