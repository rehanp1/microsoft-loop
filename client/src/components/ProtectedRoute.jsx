import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate, user]);

  return <Outlet />;
};

export default ProtectedRoute;
