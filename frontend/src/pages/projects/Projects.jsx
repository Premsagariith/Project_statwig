import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import api from "../../api/axios";

import {
  Plus,
  Trash2,
} from "lucide-react";


const Projects = () => {

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [creating, setCreating] = useState(false);


  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
  });


  // Fetch Projects
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

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProjects();
  }, []);


  // Handle Input
  const handleChange = (e) => {

    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };


  // Create Project
  const handleCreateProject = async (e) => {

    e.preventDefault();

    try {

      setCreating(true);

      await api.post(
        "/projects",
        projectData
      );

      setProjectData({
        name: "",
        description: "",
      });

      setShowModal(false);

      fetchProjects();

    } catch (error) {

      console.log(error);

    } finally {

      setCreating(false);
    }
  };


  // Delete Project
  const handleDeleteProject = async (id) => {

    try {

      await api.delete(
        `/projects/${id}`
      );

      fetchProjects();

    } catch (error) {

      console.log(error);
    }
  };


  // Loading State
  if (loading) {

    return (

      <DashboardLayout>

        <div className="text-xl font-semibold">
          Loading projects...
        </div>

      </DashboardLayout>
    );
  }


  return (

    <DashboardLayout>

      {/* Top Section */}
      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Projects
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all your projects here.
          </p>

        </div>


        {/* Create Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >

          <Plus size={20} />

          Create Project

        </button>

      </div>


      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {
          projects.length > 0 ? (

            projects.map((project) => (

              <div
                key={project._id}
                className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl"
              >

                {/* Header */}
                <div className="mb-4 flex items-start justify-between">

                  <h2 className="text-2xl font-bold text-gray-800">
                    {project.name}
                  </h2>


                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="text-red-500 hover:text-red-600"
                  >

                    <Trash2 size={20} />

                  </button>

                </div>


                {/* Description */}
                <p className="mb-6 text-gray-600">
                  {project.description}
                </p>


                {/* Footer */}
                <div className="text-sm text-gray-500">

                  Created On:

                  {" "}

                  {
                    new Date(project.createdAt)
                      .toLocaleDateString()
                  }

                </div>

              </div>
            ))
          ) : (

            <div className="text-gray-500">
              No projects found.
            </div>
          )
        }

      </div>


      {/* Create Modal */}
      {
        showModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">

              {/* Header */}
              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-gray-800">
                  Create Project
                </h2>


                <button
                  onClick={() => setShowModal(false)}
                  className="text-2xl text-gray-500 hover:text-black"
                >
                  ×
                </button>

              </div>


              {/* Form */}
              <form
                onSubmit={handleCreateProject}
              >

                {/* Name */}
                <div className="mb-5">

                  <label className="mb-2 block font-medium text-gray-700">
                    Project Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter project name"
                    value={projectData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                </div>


                {/* Description */}
                <div className="mb-6">

                  <label className="mb-2 block font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    rows="4"
                    name="description"
                    placeholder="Enter description"
                    value={projectData.description}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                </div>


                {/* Buttons */}
                <div className="flex justify-end gap-4">

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-xl border border-gray-300 px-5 py-3 font-medium"
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    disabled={creating}
                    className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
                  >

                    {
                      creating
                        ? "Creating..."
                        : "Create Project"
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

export default Projects;