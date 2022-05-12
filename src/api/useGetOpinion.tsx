import axios from "axios";
import { useQuery } from "react-query";
import { OpinionType } from "types/Opinion.types";

type UseGetOpinionType = {
  opinion: OpinionType;
  isLoading: boolean;
};

export const useGetOpinion = (opinionId?: string | null): UseGetOpinionType => {
  const getOpinion = () =>
    axios
      .get(`http://127.0.0.1:8000/api/clientopinion/${opinionId}/`)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading } = useQuery(["opinion", `${opinionId}`], getOpinion, {
    enabled: Boolean(opinionId),
  });

  return { opinion: data, isLoading };
};
