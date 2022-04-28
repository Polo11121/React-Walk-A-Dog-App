import useAuthContext from "hooks/context/AuthContext";

import { Navigate, useParams } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { userId } = useAuthContext();
  const { id } = useParams();

  return `${userId}` !== id ? (
    <Navigate to={`/user-profile/${userId}`} replace />
  ) : (
    children
  );
};
