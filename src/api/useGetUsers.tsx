import axios from "axios";
import { useQuery } from "react-query";
import { UserType } from "types/User.types";

type UseGetUsersType = {
  users: UserType[];
  isLoading: boolean;
};

export const useGetUsers = (): UseGetUsersType => {
  const getUsers = () =>
    axios.get(`http://146.59.16.195:8000/api/user/`).then((resp) => resp.data);

  const { data, isLoading } = useQuery("users", getUsers);

  return { users: data, isLoading };
};
