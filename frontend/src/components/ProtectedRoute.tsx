import React from "react";
import { Navigate } from "react-router-dom";
import { getStoredToken } from "../services/auth";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const token = getStoredToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
