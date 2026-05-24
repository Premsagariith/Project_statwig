import { Menu } from "lucide-react";

import { useAuth } from "../../context/AuthContext";


const Navbar = () => {

  const { user } = useAuth();


  return (

    <div className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button className="md:hidden">

          <Menu size={24} />

        </button>

        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>

      </div>


      {/* Right */}
      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="font-semibold text-gray-800">
            {user?.name}
          </p>

          <p className="text-sm capitalize text-gray-500">
            {user?.role}
          </p>

        </div>


        {/* Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">

          {
            user?.name?.charAt(0).toUpperCase()
          }

        </div>

      </div>

    </div>
  );
};

export default Navbar;