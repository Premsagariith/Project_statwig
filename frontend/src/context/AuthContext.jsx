import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // Fetch Current User
  const fetchCurrentUser = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          withCredentials: true,
        }
      );

      setUser(response.data.data);

    } catch (error) {

      setUser(null);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchCurrentUser();

  }, []);


  // Logout
  const logout = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);

    } catch (error) {

      console.log(error);
    }
  };


  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};


export const useAuth = () => {

  return useContext(AuthContext);
};