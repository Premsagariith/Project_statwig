import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";


const AuthContext =
  createContext();


export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // ==========================
  // FETCH CURRENT USER
  // ==========================
  const fetchCurrentUser =
    async () => {

      try {

        const response =
          await api.get(
            "/auth/me"
          );

        setUser(
          response.data.data
        );

      } catch (error) {

        setUser(null);

      } finally {

        setLoading(false);
      }
    };


  // ==========================
  // INITIAL LOAD
  // ==========================
  useEffect(() => {

    fetchCurrentUser();

  }, []);


  // ==========================
  // LOGOUT
  // ==========================
  const logout = async () => {

    try {

      await api.post(
        "/auth/logout"
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


// ==========================
// CUSTOM HOOK
// ==========================
export const useAuth = () => {

  return useContext(
    AuthContext
  );
};