const express = require("express");

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getDashboardStatistics,
} = require("../controllers/task.controller");

const { protect } = require("../middlewares/auth.middleware");

const authorizeRoles = require("../middlewares/role.middleware");

const validate = require("../middlewares/validate.middleware");

const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validations/task.validation");


const router = express.Router();


// Dashboard Statistics
router.get(
  "/dashboard/stats",
  protect,
  getDashboardStatistics
);


// Create Task (Admin Only)
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validate(createTaskSchema),
  createTask
);


// Get All Tasks
router.get(
  "/",
  protect,
  getTasks
);


// Get Single Task
router.get(
  "/:id",
  protect,
  getTask
);


// Update Task
router.put(
  "/:id",
  protect,
  validate(updateTaskSchema),
  updateTask
);


// Delete Task (Admin Only)
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTask
);


module.exports = router;