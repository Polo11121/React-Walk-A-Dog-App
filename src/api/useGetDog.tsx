import axios from "axios";
import { useQuery } from "react-query";
import { DogType } from "types/Dog.types";
import config from "config.json";

type UseGetDogType = {
  dog: DogType;
  isLoading: boolean;
  isFetched: boolean;
};

export const useGetDog = (dogId?: string | null): UseGetDogType => {
  const getDog = () =>
    axios
      .get(`${config.API_URL}/api/dog/${dogId}/`)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading, isFetching, isFetched } = useQuery(
    ["dog", `${dogId}`],
    getDog,
    {
      retry: 1,
      useErrorBoundary: true,
      enabled: dogId === "undefined" ? false : Boolean(dogId),
    }
  );

  return { dog: data, isLoading: isLoading || isFetching, isFetched };
};
