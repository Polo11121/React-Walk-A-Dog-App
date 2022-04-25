import axios from "axios";
import { useQuery } from "react-query";

type UseGetUserType = {
  user: {
    id: number;
    username: string;
    email: string;
    avatar_url: string;
    phone_number: number;
    is_trainer: boolean;
  };
  isLoading: boolean;
};

export const useGetUser = (userId?: string | null): UseGetUserType => {
  const getUser = () =>
    axios
      .get(`http://127.0.0.1:8000/api/user/${userId}/`)
      .then((resp) => resp.data);

  const { data, isLoading } = useQuery(["user", `${userId}`], getUser, {
    enabled: Boolean(userId),
  });

  return { user: data, isLoading };
};
