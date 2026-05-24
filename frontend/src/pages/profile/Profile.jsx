import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/AuthContext";


const Profile = () => {

  const { user } = useAuth();


  return (

    <DashboardLayout>

      {/* Heading */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your account information
        </p>

      </div>


      {/* Profile Card */}
      <div className="max-w-3xl rounded-2xl bg-white p-8 shadow-md">

        {/* Avatar */}
        <div className="mb-8 flex items-center gap-6">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white">

            {
              user?.name?.charAt(0).toUpperCase()
            }

          </div>


          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              {user?.name}
            </h2>

            <p className="mt-2 text-gray-500">
              {user?.email}
            </p>

          </div>

        </div>


        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Name */}
          <div>

            <label className="mb-2 block font-medium text-gray-600">
              Full Name
            </label>

            <div className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3">

              {user?.name}

            </div>

          </div>


          {/* Email */}
          <div>

            <label className="mb-2 block font-medium text-gray-600">
              Email Address
            </label>

            <div className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3">

              {user?.email}

            </div>

          </div>


          {/* Role */}
          <div>

            <label className="mb-2 block font-medium text-gray-600">
              Role
            </label>

            <div className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 capitalize">

              {user?.role}

            </div>

          </div>


          {/* Status */}
          <div>

            <label className="mb-2 block font-medium text-gray-600">
              Account Status
            </label>

            <div className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-green-600 font-medium">

              Active

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Profile;