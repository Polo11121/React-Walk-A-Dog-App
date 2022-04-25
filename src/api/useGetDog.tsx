import axios from "axios";
import { useQuery } from "react-query";

type UseGetUserType = {
  dog: {
    id: number;
    name: string;
    owner: number;
    age: number;
    breed: string;
    weight: number;
    recommendation: string;
    contraindications: string;
    avatar_url: string;
  };
  isLoading: boolean;
};

export const useGetDog = (dogId?: string | null): UseGetUserType => {
  const getDog = () =>
    axios
      .get(`http://127.0.0.1:8000/api/dog/${dogId}/`)
      .then((resp) => resp.data);

  const { data, isLoading } = useQuery(["dog", `${dogId}`], getDog, {
    enabled: Boolean(dogId),
  });

  return { dog: data, isLoading };
};
