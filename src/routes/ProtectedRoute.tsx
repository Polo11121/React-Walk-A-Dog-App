import useAuthContext from "hooks/context/AuthContext";
import { Navigate, useParams } from "react-router-dom";

export const ProtectedRoute = ({
  children,
  trainerBlock,
}: {
  children: JSX.Element;
  trainerBlock?: boolean;
}) => {
  const { userId, userInfo } = useAuthContext();
  const { id } = useParams();

  if (trainerBlock) {
    return userInfo?.is_trainer && `${userId}` === id ? (
      <Navigate to={`/user-profile/${userId}`} replace />
    ) : (
      children
    );
  }
  return `${userId}` !== id ? (
    <Navigate to={`/user-profile/${userId}`} replace />
  ) : (
    children
  );
};
