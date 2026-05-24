import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import api from "../../api/axios";

import {
  Plus,
  Trash2,
} from "lucide-react";


const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [creating, setCreating] = useState(false);

  const [statusFilter, setStatusFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [editingTaskId, setEditingTaskId] =
    useState(null);

  const loggedUser = JSON.parse(
    localStorage.getItem("user")
  );


  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
    assignedTo: "",
    project: "",
  });


  // ==========================
  // FETCH TASKS
  // ==========================
  const fetchTasks = async () => {

    try {

      const response = await api.get(
        "/tasks"
      );

      setTasks(
        response.data.data.tasks
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  // ==========================
  // FETCH PROJECTS
  // ==========================
  const fetchProjects = async () => {

    try {

      const response = await api.get(
        "/projects"
      );

      setProjects(
        response.data.data.projects
      );

    } catch (error) {

      console.log(error);
    }
  };


  // ==========================
  // FETCH USERS
  // ==========================
  const fetchUsers = async () => {

    try {

      const response = await api.get(
        "/users"
      );

      setUsers(
        response.data.data.users
      );

    } catch (error) {

      console.log(error);
    }
  };


  // ==========================
  // INITIAL LOAD
  // ==========================
  useEffect(() => {

    fetchTasks();

    fetchProjects();

    fetchUsers();

  }, []);


  // ==========================
  // HANDLE INPUT
  // ==========================
  const handleChange = (e) => {

    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };


  // ==========================
  // CREATE / UPDATE TASK
  // ==========================
  const handleCreateTask = async (e) => {

    e.preventDefault();

    try {

      setCreating(true);

      setError("");

      // Validation
      if (
        taskData.description.length < 10
      ) {

        setError(
          "Description must be at least 10 characters"
        );

        setCreating(false);

        return;
      }

      const payload = {

        title: taskData.title,

        description:
          taskData.description,

        priority:
          taskData.priority,

        status:
          taskData.status,

        dueDate: new Date(
          taskData.dueDate
        ).toISOString(),

        assignedTo:
          taskData.assignedTo,

        project:
          taskData.project,
      };

      // UPDATE
      if (editingTaskId) {

        await api.put(
          `/tasks/${editingTaskId}`,
          payload
        );

      } else {

        // CREATE
        await api.post(
          "/tasks",
          payload
        );
      }

      // RESET
      setTaskData({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
        assignedTo: "",
        project: "",
      });

      setEditingTaskId(null);

      setShowModal(false);

      fetchTasks();

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Task operation failed"
      );

    } finally {

      setCreating(false);
    }
  };


  // ==========================
  // EDIT TASK
  // ==========================
  const handleEditTask = (
    task
  ) => {

    setTaskData({

      title: task.title,

      description:
        task.description,

      priority:
        task.priority,

      status:
        task.status,

      dueDate:
        task.dueDate?.split("T")[0],

      assignedTo:
        task.assignedTo?._id,

      project:
        task.project?._id,
    });

    setEditingTaskId(
      task._id
    );

    setShowModal(true);
  };


  // ==========================
  // DELETE TASK
  // ==========================
  const handleDeleteTask = async (
    id
  ) => {

    try {

      await api.delete(
        `/tasks/${id}`
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  // ==========================
  // UPDATE STATUS
  // ==========================
  // ==========================
// UPDATE STATUS
// ==========================
const handleStatusChange = async (
  id,
  status
) => {

  try {

    // ONLY SEND STATUS
    const payload = {
      status,
    };

    console.log(payload);

    const response =
      await api.put(
        `/tasks/${id}`,
        payload
      );

    console.log(response.data);

    // Refresh Tasks
    await fetchTasks();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Status update failed"
    );
  }
};

  // ==========================
  // FILTER TASKS
  // ==========================
  const filteredTasks =
    tasks.filter((task) => {

      const matchesStatus =
        statusFilter === "All"
          ? true
          : task.status ===
            statusFilter;

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesStatus &&
        matchesSearch
      );
    });


  // ==========================
  // LOADING
  // ==========================
  if (loading) {

    return (

      <DashboardLayout>

        <div className="text-xl font-semibold">
          Loading tasks...
        </div>

      </DashboardLayout>
    );
  }


  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Tasks
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your tasks efficiently
          </p>

        </div>


        {/* ACTIONS */}
        <div className="flex flex-col gap-3 md:flex-row">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none"
          />


          {/* FILTER */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none"
          >

            <option value="All">
              All
            </option>

            <option value="todo">
              Todo
            </option>

            <option value="in-progress">
              In Progress
            </option>

            <option value="done">
              Done
            </option>

          </select>


          {/* CREATE BUTTON */}
          {
            loggedUser?.role ===
              "admin" && (

              <button
                onClick={() => {

                  setEditingTaskId(
                    null
                  );

                  setShowModal(
                    true
                  );
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
              >

                <Plus size={20} />

                Create Task

              </button>
            )
          }

        </div>

      </div>


      {/* TASK TABLE */}
      <div className="overflow-x-auto rounded-2xl bg-white p-6 shadow-md">

        <table className="w-full">

          <thead>

            <tr className="border-b text-left text-gray-500">

              <th className="pb-4">
                Title
              </th>

              <th className="pb-4">
                Priority
              </th>

              <th className="pb-4">
                Status
              </th>

              <th className="pb-4">
                Assigned To
              </th>

              <th className="pb-4">
                Project
              </th>

              <th className="pb-4">
                Due Date
              </th>

              {
                loggedUser?.role ===
                  "admin" && (
                  <th className="pb-4">
                    Actions
                  </th>
                )
              }

            </tr>

          </thead>


          <tbody>

            {
              filteredTasks.length > 0 ? (

                filteredTasks.map((task) => (

                  <tr
                    key={task._id}
                    className="border-b"
                  >

                    <td className="py-4 font-medium">
                      {task.title}
                    </td>

                    <td className="py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium
                        ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >

                        {task.priority}

                      </span>

                    </td>


                    {/* STATUS */}
                    <td className="py-4">

                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(
                            task._id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-gray-300 px-3 py-2 outline-none"
                      >

                        <option value="todo">
                          Todo
                        </option>

                        <option value="in-progress">
                          In Progress
                        </option>

                        <option value="done">
                          Done
                        </option>

                      </select>

                    </td>


                    {/* ASSIGNED */}
                    <td className="py-4">
                      {
                        task.assignedTo
                          ?.name
                      }
                    </td>


                    {/* PROJECT */}
                    <td className="py-4">
                      {
                        task.project?.name
                      }
                    </td>


                    {/* DATE */}
                    <td className="py-4">

                      {
                        new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      }

                    </td>


                    {/* ADMIN ACTIONS */}
                    {
                      loggedUser?.role ===
                        "admin" && (

                        <td className="py-4">

                          <div className="flex items-center gap-3">

                            {/* EDIT */}
                            <button
                              onClick={() =>
                                handleEditTask(
                                  task
                                )
                              }
                              className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
                            >
                              Edit
                            </button>


                            {/* DELETE */}
                            <button
                              onClick={() =>
                                handleDeleteTask(
                                  task._id
                                )
                              }
                              className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
                            >

                              <Trash2 size={16} />

                            </button>

                          </div>

                        </td>
                      )
                    }

                  </tr>
                ))
              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="py-6 text-center text-gray-500"
                  >

                    No matching tasks found

                  </td>

                </tr>
              )
            }

          </tbody>

        </table>

      </div>


      {/* MODAL */}
      {
        showModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

            <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-2xl">

              <h2 className="mb-6 text-2xl font-bold text-gray-800">

                {
                  editingTaskId
                    ? "Edit Task"
                    : "Create Task"
                }

              </h2>


              {
                error && (

                  <div className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-600">

                    {error}

                  </div>
                )
              }


              <form
                onSubmit={
                  handleCreateTask
                }
              >

                {/* TITLE */}
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  value={taskData.title}
                  onChange={handleChange}
                  required
                  className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3"
                />


                {/* DESCRIPTION */}
                <textarea
                  rows="4"
                  name="description"
                  placeholder="Description"
                  value={
                    taskData.description
                  }
                  onChange={handleChange}
                  required
                  className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3"
                />


                {/* PRIORITY */}
                <select
                  name="priority"
                  value={
                    taskData.priority
                  }
                  onChange={handleChange}
                  className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3"
                >

                  <option value="low">
                    Low
                  </option>

                  <option value="medium">
                    Medium
                  </option>

                  <option value="high">
                    High
                  </option>

                </select>


                {/* STATUS */}
                <select
                  name="status"
                  value={
                    taskData.status
                  }
                  onChange={handleChange}
                  className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3"
                >

                  <option value="todo">
                    Todo
                  </option>

                  <option value="in-progress">
                    In Progress
                  </option>

                  <option value="done">
                    Done
                  </option>

                </select>


                {/* ASSIGN USER */}
                <select
                  name="assignedTo"
                  value={
                    taskData.assignedTo
                  }
                  onChange={handleChange}
                  required
                  className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3"
                >

                  <option value="">
                    Select User
                  </option>

                  {
                    users.map((user) => (

                      <option
                        key={user._id}
                        value={user._id}
                      >

                        {user.name}

                      </option>
                    ))
                  }

                </select>


                {/* PROJECT */}
                <select
                  name="project"
                  value={
                    taskData.project
                  }
                  onChange={handleChange}
                  required
                  className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3"
                >

                  <option value="">
                    Select Project
                  </option>

                  {
                    projects.map(
                      (project) => (

                        <option
                          key={
                            project._id
                          }
                          value={
                            project._id
                          }
                        >

                          {project.name}

                        </option>
                      )
                    )
                  }

                </select>


                {/* DUE DATE */}
                <input
                  type="date"
                  name="dueDate"
                  value={taskData.dueDate}
                  onChange={handleChange}
                  required
                  className="mb-6 w-full rounded-xl border border-gray-300 px-4 py-3"
                />


                {/* BUTTONS */}
                <div className="flex justify-end gap-4">

                  <button
                    type="button"
                    onClick={() =>
                      setShowModal(
                        false
                      )
                    }
                    className="rounded-xl border border-gray-300 px-5 py-3"
                  >

                    Cancel

                  </button>


                  <button
                    type="submit"
                    disabled={creating}
                    className="rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
                  >

                    {
                      creating
                        ? (
                            editingTaskId
                            ? "Updating..."
                            : "Creating..."
                          )
                        : (
                            editingTaskId
                            ? "Update Task"
                            : "Create Task"
                          )
                    }

                  </button>

                </div>

              </form>

            </div>

          </div>
        )
      }

    </DashboardLayout>
  );
};

export default Tasks;