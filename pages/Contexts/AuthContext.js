import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus(); // Check authentication status when the component mounts
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { userId, username, role } = parseJwt(token);
      setIsAuthenticated(true);
      setUser({ userId, username, role });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    setIsAuthenticated(true);
    setUser({
      username: userData.username,
      role: userData.role,
      userId: userData.userId,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const authContextValue = {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
