import axios from "axios";
import { useQuery } from "react-query";
import { DogType } from "types/Dog.types";

type UseGetDogsType = {
  dogs: DogType[];
  isLoading: boolean;
};

export const useGetDogs = (): UseGetDogsType => {
  const getDogs = () =>
    axios.get(`http://127.0.0.1:8000/api/dog/`).then((resp) => resp.data);

  const { data, isLoading } = useQuery("dogs", getDogs);

  return { dogs: data, isLoading };
};
