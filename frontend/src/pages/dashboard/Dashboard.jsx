import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import api from "../../api/axios";

import {
  CheckCircle,
  Clock,
  FolderKanban,
  AlertTriangle,
} from "lucide-react";


const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

       const response = await api.get(
  "/tasks/dashboard/stats"
);

        setDashboardData(response.data.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchDashboardData();

  }, []);


  const stats = [
    {
      title: "Total Tasks",
      value: dashboardData?.totalTasks || 0,
      icon: <CheckCircle size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Completed Tasks",
      value: dashboardData?.completedTasks || 0,
      icon: <CheckCircle size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Pending Tasks",
      value: dashboardData?.pendingTasks || 0,
      icon: <Clock size={28} />,
      color: "bg-yellow-500",
    },
    {
      title: "High Priority",
      value: dashboardData?.highPriorityTasks || 0,
      icon: <AlertTriangle size={28} />,
      color: "bg-red-500",
    },
  ];


  if (loading) {

    return (

      <DashboardLayout>

        <div className="text-xl font-semibold">
          Loading dashboard...
        </div>

      </DashboardLayout>
    );
  }


  return (

    <DashboardLayout>

      {/* Heading */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back! Here&apos;s your task summary.
        </p>

      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {
          stats.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-800">
                    {item.value}
                  </h2>

                </div>


                <div className={`${item.color} rounded-2xl p-4 text-white`}>

                  {item.icon}

                </div>

              </div>

            </div>
          ))
        }

      </div>


      {/* Recent Tasks */}
      <div className="mt-10 rounded-2xl bg-white p-6 shadow-md">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-gray-800">
            Recent Tasks
          </h2>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-left text-gray-500">

                <th className="pb-4">Task</th>

                <th className="pb-4">Priority</th>

                <th className="pb-4">Status</th>

                <th className="pb-4">Due Date</th>

              </tr>

            </thead>


            <tbody>

              {
                dashboardData?.recentTasks?.length > 0 ? (

                  dashboardData.recentTasks.map((task) => (

                    <tr
                      key={task._id}
                      className="border-b"
                    >

                      <td className="py-4 font-medium">
                        {task.title}
                      </td>

                      <td className="py-4">

                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">

                          {task.priority}

                        </span>

                      </td>

                      <td className="py-4">

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">

                          {task.status}

                        </span>

                      </td>

                      <td className="py-4 text-gray-500">

                        {
                          new Date(task.dueDate)
                            .toLocaleDateString()
                        }

                      </td>

                    </tr>
                  ))
                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="py-6 text-center text-gray-500"
                    >
                      No tasks found
                    </td>

                  </tr>
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;