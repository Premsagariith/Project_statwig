import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {

  const { user, loading } = useAuth();


  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl font-semibold">
          Loading...
        </h1>
      </div>
    );
  }


  // Not Logged In
  if (!user) {
    return <Navigate to="/login" />;
  }


  // Authorized
  return children;
};

export default ProtectedRoute;