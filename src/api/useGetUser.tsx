import axios from "axios";
import { useQuery } from "react-query";
import { UserType } from "types/User.types";
import config from "config.json";

type UseGetUserType = {
  user: UserType;
  isLoading: boolean;
  isFetched: boolean;
};

export const useGetUser = (userId?: string | null): UseGetUserType => {
  const getUser = () =>
    axios
      .get(`${config.API_URL}/api/user/${userId}/`)
      .then((resp) => resp.data);

  const { data, isLoading, isFetching, isFetched } = useQuery(
    ["user", `${userId}`],
    getUser,
    {
      retry: 1,
      useErrorBoundary: true,
      enabled: Boolean(userId) && userId !== "undefined",
    }
  );

  return { user: data, isLoading: isLoading || isFetching, isFetched };
};
