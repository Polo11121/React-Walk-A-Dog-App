import useAuthContext from "hooks/context/AuthContext";
import { useParams } from "react-router-dom";

export const useOwner = () => {
  const { userId } = useAuthContext();
  const { id } = useParams();

  const isOwner = `${userId}` === id;

  return isOwner;
};
