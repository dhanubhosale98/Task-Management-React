import { useAuth } from "@/context/useAuth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthGaurd = ({ children }) => {
  const {user}=useAuth()
console.log(user,"...user")
  return user ? children : <Navigate to="/login" replace />;
};

export default AuthGaurd;
