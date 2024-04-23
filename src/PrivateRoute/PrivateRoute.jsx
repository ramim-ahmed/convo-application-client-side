/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
export default function PrivateRoute({ children }) {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/" />;
  }
  return children;
}
