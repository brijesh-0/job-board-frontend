import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../common/Loading";
import { UserRole } from "../../types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading only briefly while checking auth
  if (loading) {
    return <Loading />;
  }

  // Not authenticated - redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Wrong role - redirect to appropriate dashboard
  if (requiredRole && user.role !== requiredRole) {
    const redirectPath =
      user.role === "candidate" ? "/dashboard" : "/employer/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
