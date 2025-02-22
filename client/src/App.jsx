import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateWorkSpace from "./pages/dashboard/pages/CreateWorkSpace";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {!user && <Route path="/sign-up" element={<SignUp />} />}
        {!user && <Route path="/sign-in" element={<SignIn />} />}

        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/dashboard/:worspaceId" element={<Dashboard />} /> */}
          <Route path="/create-workspace" element={<CreateWorkSpace />} />
          <Route path="/sign-up" element={<Navigate to="/dashboard" />} />
          <Route path="/sign-in" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
