import Sidebar from "../components/layout/Sidebar";

import Navbar from "../components/layout/Navbar";


const DashboardLayout = ({ children }) => {

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar />


        {/* Page Content */}
        <main className="flex-1 p-8">

          {children}

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;