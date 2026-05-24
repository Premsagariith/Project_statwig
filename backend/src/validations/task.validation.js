const { z } = require("zod");


// Create Task Validation
const createTaskSchema = z.object({

  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters"),

  priority: z.enum([
    "low",
    "medium",
    "high",
  ]),

  status: z.enum([
    "todo",
    "in-progress",
    "done",
  ]),

  dueDate: z.string(),

  assignedTo: z
    .string()
    .min(1, "Assigned user is required"),

  project: z
    .string()
    .min(1, "Project is required"),
});


// Update Task Validation
const updateTaskSchema = z.object({

  title: z
    .string()
    .min(3)
    .max(200)
    .optional(),

  description: z
    .string()
    .min(10)
    .max(2000)
    .optional(),

  priority: z.enum([
    "low",
    "medium",
    "high",
  ])
  .optional(),

  status: z.enum([
    "todo",
    "in-progress",
    "done",
  ])
  .optional(),

  dueDate: z
    .string()
    .optional(),

  assignedTo: z
    .string()
    .optional(),

  project: z
    .string()
    .optional(),
});


// Update Status Validation
const updateTaskStatusSchema = z.object({

  status: z.enum([
    "todo",
    "in-progress",
    "done",
  ]),
});


module.exports = {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
};