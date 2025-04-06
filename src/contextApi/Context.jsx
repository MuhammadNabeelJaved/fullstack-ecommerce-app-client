import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import apiService from "../apis/fetchApis.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    console.log("Access Token in context:", accessToken);
    console.log("Refresh Token in context:", refreshToken);

    if (accessToken && refreshToken) {
      apiService
        .refreshAccessToken(refreshToken)
        .then((response) => {
          setIsLoggedIn(true);
          setCurrentUser(response.userData);
          setLoading(false);
          console.log("New genrated access Token is :", response);
          console.log("New genrated access Token is :", response?.data?.accessToken);
          console.log("New genrated Refresh Token is :", response?.data?.refreshToken);
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    if (!userData) return;
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentUser(userData);
    localStorage.setItem("accessToken", userData?.data?.accessToken);
    localStorage.setItem("refreshToken", userData?.data?.refreshToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        currentUser,
        isLoggedIn,
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
