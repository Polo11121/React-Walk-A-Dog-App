import axios from "axios";
import { useQuery } from "react-query";
import { DogType } from "types/Dog.types";
import config from "config.json";

type UseGetUserDogsType = {
  dogs: DogType[];
  isLoading: boolean;
};

export const useGetUserDogs = (userId?: string): UseGetUserDogsType => {
  const getUserDogs = () =>
    axios.get(`${config.API_URL}/api/dog/`).then((resp) => resp.data);

  const { data, isLoading } = useQuery<DogType[]>("dogs", getUserDogs);

  if (data && userId) {
    return { dogs: data.filter(({ owner }) => owner === +userId), isLoading };
  }
  return { dogs: [], isLoading };
};
