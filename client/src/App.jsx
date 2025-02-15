import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [login, setLogin] = useState(true);
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        {!login && <Route path="/sign-up" element={<SignUp />} />}
        {!login && <Route path="/sign-in" element={<SignIn />} />}

        <Route element={<ProtectedRoute login={login} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sign-up" element={<Navigate to="/dashboard" />} />
          <Route path="/sign-in" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
