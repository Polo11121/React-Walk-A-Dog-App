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

  const { data, isLoading } = useQuery("users", getUsers);

  return { users: data, isLoading };
};
