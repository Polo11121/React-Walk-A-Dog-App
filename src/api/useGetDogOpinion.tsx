import axios from "axios";
import { useQuery } from "react-query";
import { DogOpinionType } from "types/Opinion.types";
import config from "config.json";

type UseGetOpinionType = {
  opinion: DogOpinionType;
  isLoading: boolean;
};

export const useGetDogOpinion = (
  opinionId?: string | null
): UseGetOpinionType => {
  const getOpinion = () =>
    axios
      .get(`${config.API_URL}/api/traineropinion/${opinionId}/`)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading } = useQuery(
    ["dog-opinion", `${opinionId}`],
    getOpinion,
    { retry: 1, useErrorBoundary: true, enabled: Boolean(opinionId) }
  );

  return { opinion: data, isLoading };
};
