import axios from "axios";
import { useQuery } from "react-query";
import { UserType } from "types/User.types";

type UseGetUserType = {
  user: UserType;
  isLoading: boolean;
  isFetched: boolean;
};

export const useGetUser = (userId?: string | null): UseGetUserType => {
  const getUser = () =>
    axios
      .get(`http://127.0.0.1:8000/api/user/${userId}/`)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading, isFetched } = useQuery(
    ["user", `${userId}`],
    getUser,
    {
      enabled: Boolean(userId) && userId !== "undefined",
    }
  );

  return { user: data, isLoading, isFetched };
};
