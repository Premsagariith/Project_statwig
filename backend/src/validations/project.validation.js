const { z } = require("zod");



const createProjectSchema = z.object({

  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name cannot exceed 100 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  members: z
    .array(z.string())
    .optional(),

  status: z
    .enum(["active", "completed", "archived"])
    .optional(),
});



const updateProjectSchema = z.object({

  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name cannot exceed 100 characters")
    .optional(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  members: z
    .array(z.string())
    .optional(),

  status: z
    .enum(["active", "completed", "archived"])
    .optional(),
});

module.exports = {
  createProjectSchema,
  updateProjectSchema,
};