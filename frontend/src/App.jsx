import { useState } from "react";
import Layout from "./pages/layout";

import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { Task } from "@/pages/Task";
import { Dashboard } from "@/pages/Dashboard";
import { Login } from "./pages/login";
import AuthLayout from "./pages/authLayout";
import AuthGaurd from "./gaurds/auth";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          {/* Login */}

            <Route path="/login" element={<Login />} />
        </Route>

        {/* Layout is the parent */}
        <Route element={<AuthGaurd><Layout /></AuthGaurd>}>
          {/* / → /tasks */}
          <Route path="/" element={<Navigate to="/tasks" replace />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Tasks */}
          <Route path="/tasks" element={<Task />} />

          {/* Unknown route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
