import axios from "axios";
import { useQuery } from "react-query";
import { DogOpinionType } from "types/Opinion.types";
import config from "config.json";

type UseGetOpinionsType = {
  opinions: DogOpinionType[];
  isLoading: boolean;
};

export const useGetDogOpinions = (): UseGetOpinionsType => {
  const getOpinions = () =>
    axios
      .get(`${config.API_URL}/api/traineropinion/`)
      .then((resp) => resp.data);

  const { data, isLoading, isFetching } = useQuery(
    "dog-opinions",
    getOpinions,
    { retry: 1, useErrorBoundary: true }
  );

  return { opinions: data, isLoading: isLoading || isFetching };
};
