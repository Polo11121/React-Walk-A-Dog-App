import axios from "axios";
import { useQuery } from "react-query";
import { UserType } from "types/User.types";
import config from "config.json";

type UseGetUsersType = {
  users: UserType[];
  isLoading: boolean;
};

export const useGetUsers = (): UseGetUsersType => {
  const getUsers = () =>
    axios.get(`${config.API_URL}/api/user/`).then((resp) => resp.data);

  const { data, isLoading, isFetching } = useQuery("users", getUsers, {
    retry: 1,
    useErrorBoundary: true,
  });

  return { users: data, isLoading: isLoading || isFetching };
};
