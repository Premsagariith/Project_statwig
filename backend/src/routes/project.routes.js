const express = require("express");

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const { protect } = require("../middlewares/auth.middleware");

const authorizeRoles = require("../middlewares/role.middleware");

const validate = require("../middlewares/validate.middleware");

const {
  createProjectSchema,
  updateProjectSchema,
} = require("../validations/project.validation");


const router = express.Router();


// Create Project (Admin Only)
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validate(createProjectSchema),
  createProject
);


// Get All Projects
router.get(
  "/",
  protect,
  getProjects
);


// Get Single Project
router.get(
  "/:id",
  protect,
  getProject
);


// Update Project (Admin Only)
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validate(updateProjectSchema),
  updateProject
);


// Delete Project (Admin Only)
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteProject
);


module.exports = router;