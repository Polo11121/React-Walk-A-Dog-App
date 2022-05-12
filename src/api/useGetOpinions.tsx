import axios from "axios";
import { useQuery } from "react-query";
import { OpinionType } from "types/Opinion.types";

type UseGetOpinionsType = {
  opinions: OpinionType[];
  isLoading: boolean;
};

export const useGetOpinions = (): UseGetOpinionsType => {
  const getOpinions = () =>
    axios
      .get(`http://127.0.0.1:8000/api/clientopinion/`)
      .then((resp) => resp.data);

  const { data, isLoading } = useQuery('opinions', getOpinions, );

  return { opinions: data, isLoading };
};
