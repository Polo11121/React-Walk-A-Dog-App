import axios from "axios";
import { useQuery } from "react-query";
import { UserType } from "types/User.types";

type UseGetUsersType = {
  users: UserType[];
  isLoading: boolean;
};

export const useGetUsers = (): UseGetUsersType => {
  const getUsers = () =>
    axios.get(`http://127.0.0.1:8000/api/user/`).then((resp) => resp.data);

  const { data, isLoading } = useQuery("users", getUsers);

  return { users: data, isLoading };
};
