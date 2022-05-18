import axios from "axios";
import { useQuery } from "react-query";
import { DogType } from "types/Dog.types";

type UseGetDogType = {
  dog: DogType;
  isLoading: boolean;
  isFetched: boolean;
};

export const useGetDog = (dogId?: string | null): UseGetDogType => {
  const getDog = () =>
    axios
      .get(`http://146.59.16.195:8000/api/dog/${dogId}/`)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading, isFetched } = useQuery(["dog", `${dogId}`], getDog, {
    enabled: Boolean(dogId),
  });

  return { dog: data, isLoading, isFetched };
};