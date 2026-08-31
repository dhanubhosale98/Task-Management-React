import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("LoginUser") || "null"),
  );

  useEffect(() => {
    let userLocal = JSON.parse(localStorage.getItem("LoginUser") || "null");
    setUser(userLocal);
    // Listen for logout from Axios interceptor
    const handleLogout = () => {
      localStorage.setItem("LoginUser",JSON.stringify(null));
      localStorage.setItem("accessToken",JSON.stringify(null));
      setUser(null);
    };
    window.addEventListener("auth:logout", handleLogout);
    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  function login(user, token) {
    localStorage.setItem("LoginUser", JSON.stringify(user));
    localStorage.setItem("accessToken", JSON.stringify(token));
    setUser(user);
  }

  function logout() {
    localStorage.setItem("LoginUser", JSON.stringify(null));
    localStorage.setItem("accessToken", JSON.stringify(null));
    setUser(null);
  }

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
