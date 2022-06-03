import axios from "axios";
import { useQuery } from "react-query";
import { OpinionType } from "types/Opinion.types";
import config from "config.json";

type UseGetOpinionsType = {
  opinions: OpinionType[];
  isLoading: boolean;
};

export const useGetOpinions = (): UseGetOpinionsType => {
  const getOpinions = () =>
    axios.get(`${config.API_URL}/api/clientopinion/`).then((resp) => resp.data);

  const { data, isLoading, isFetching } = useQuery("opinions", getOpinions);

  return { opinions: data, isLoading: isLoading || isFetching };
};
