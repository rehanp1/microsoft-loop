import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ login }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate, login]);

  return <Outlet />;
};

export default ProtectedRoute;
