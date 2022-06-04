import axios from "axios";
import { useQuery } from "react-query";
import { OpinionType } from "types/Opinion.types";
import config from "config.json";

type UseGetOpinionType = {
  opinion: OpinionType;
  isLoading: boolean;
};

export const useGetOpinion = (opinionId?: string | null): UseGetOpinionType => {
  const getOpinion = () =>
    axios
      .get(`${config.API_URL}/api/clientopinion/${opinionId}/`)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading } = useQuery(
    ["opinion", `${opinionId}`],
    getOpinion,
    { retry: 1, useErrorBoundary: true, enabled: Boolean(opinionId) }
  );

  return { opinion: data, isLoading };
};
