import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { useCurrentUser } = useAuth();
  const { data: user, isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading) return <div></div>;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
