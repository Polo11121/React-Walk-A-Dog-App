import axios from "axios";
import { useQuery } from "react-query";
import { DogType } from "types/Dog.types";
import config from "config.json";

type UseGetDogsType = {
  dogs: DogType[];
  isLoading: boolean;
};

export const useGetDogs = (): UseGetDogsType => {
  const getDogs = () =>
    axios
      .get(`${config.API_URL}/api/dog/`)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading, isFetching } = useQuery("dogs", getDogs, {
    retry: 1,
    useErrorBoundary: true,
  });

  return { dogs: data, isLoading: isLoading || isFetching };
};
