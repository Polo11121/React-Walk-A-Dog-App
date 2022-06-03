import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

export const useDeleteDogOpinion = (onSuccess?: () => void) => {
  const deleteOpinion = (id: number) =>
    axios.delete(`${config.API_URL}/api/traineropinion/${id}/`);

  const { mutate, isLoading } = useMutation(deleteOpinion, { onSuccess });

  return { mutate, isLoading };
};
