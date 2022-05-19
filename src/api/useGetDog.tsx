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

  const { data, isLoading, isFetched } = useQuery(["dog", `${dogId}`], getDog, {
    enabled: Boolean(dogId),
  });

  return { dog: data, isLoading, isFetched };
};
