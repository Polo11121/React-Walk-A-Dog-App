import axios from "axios";
import { useQuery } from "react-query";
import { DogType } from "types/Dog.types";

type UseGetDogType = {
  dog: DogType;
  isLoading: boolean;
};

export const useGetDog = (dogId?: string | null): UseGetDogType => {
  const getDog = () =>
    axios
      .get(`http://127.0.0.1:8000/api/dog/${dogId}/`)
      .then((resp) => resp.data);

  const { data, isLoading } = useQuery(["dog", `${dogId}`], getDog, {
    enabled: Boolean(dogId),
  });

  return { dog: data, isLoading };
};
