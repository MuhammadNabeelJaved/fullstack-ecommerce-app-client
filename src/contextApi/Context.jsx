import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import apiService from "../apis/fetchApis.js";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null)

  console.log("User:", user);
  console.log("Token:", token);

  // Check if user is already logged in - simplified to a single function
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    
    console.log("Client Access Token:", accessToken);
    console.log("Client Refresh Token:", refreshToken);
 

    if (!(accessToken && refreshToken)) {
      console.log("No tokens found");
      return;
    }

    const isLoggedIn = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/users/refresh-access-token`,
          { refreshToken }
        );
        console.log("Tokens Response data", response.data?.data);
        localStorage.setItem("accessToken", response.data?.data?.accessToken);
        localStorage.setItem("refreshToken", response.data?.data?.refreshToken);
        setToken(response.data?.data?.refreshToken);
        setUser(response.data?.data?.user);
        setLoading(false);
      } catch (error) {
        console.log("Error in useEffect", error);
      }
    };

    isLoggedIn();
  }, []);

  const login = async (email, password) => {
    if ((!email, !password)) {
      console.error("Invalid login data received:", email, password);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/login`,
        {
          email,
          password,
        }
      );
      console.log("Login Response data", response.data?.data);
      // Store tokens
      setUser(response.data?.data?.userData);
      setIsLoggedIn(true);
      localStorage.setItem("accessToken", response.data?.data?.accessToken);
      localStorage.setItem("refreshToken", response.data?.data?.refreshToken);
      setUser(response.data?.data?.userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
    }
    console.log("User logged in successfully");
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isLoggedIn,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
