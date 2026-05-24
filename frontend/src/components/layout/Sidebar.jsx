import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  User,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


const Sidebar = () => {

  const location = useLocation();

  const { logout } = useAuth();


  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <FolderKanban size={20} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <CheckSquare size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
  ];


  return (

    <div className="flex h-screen w-64 flex-col bg-indigo-700 text-white">

      {/* Logo */}
      <div className="border-b border-indigo-500 px-6 py-6">

        <h1 className="text-3xl font-bold">
          TaskManager
        </h1>

      </div>


      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-2">

        {
          navLinks.map((link) => (

            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
              ${
                location.pathname === link.path
                  ? "bg-white text-indigo-700"
                  : "hover:bg-indigo-600"
              }`}
            >

              {link.icon}

              <span className="font-medium">
                {link.name}
              </span>

            </Link>
          ))
        }

      </div>


      {/* Logout */}
      <div className="p-4">

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold transition hover:bg-red-600"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  );
};

export default Sidebar;