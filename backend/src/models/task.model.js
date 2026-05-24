const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(

  {
    title: {

      type: String,

      required: [
        true,
        "Task title is required",
      ],

      trim: true,

      minlength: 3,

      maxlength: 200,
    },

    description: {

      type: String,

      required: [
        true,
        "Task description is required",
      ],

      trim: true,

      maxlength: 2000,
    },

    priority: {

      type: String,

      enum: [
        "low",
        "medium",
        "high",
      ],

      default: "medium",
    },

    status: {

      type: String,

      enum: [
        "todo",
        "in-progress",
        "done",
      ],

      default: "todo",
    },

    dueDate: {

      type: Date,

      required: true,
    },

    // ==========================
    // ASSIGNED USER
    // ==========================
    assignedTo: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    // ==========================
    // PROJECT
    // ==========================
    project: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Project",

      required: true,
    },

    // ==========================
    // CREATED BY
    // ==========================
    createdBy: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },
  },

  {
    timestamps: true,
  }
);


// ==============================
// INDEXES
// ==============================

// Text Search
taskSchema.index({
  title: "text",
  description: "text",
});

// Filters
taskSchema.index({
  status: 1,
});

taskSchema.index({
  priority: 1,
});

taskSchema.index({
  dueDate: 1,
});

taskSchema.index({
  assignedTo: 1,
});


// ==============================
// MODEL
// ==============================
const Task = mongoose.model(
  "Task",
  taskSchema
);

module.exports = Task;