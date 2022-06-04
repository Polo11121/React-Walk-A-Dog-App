import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

type useEditOpinionPayload = {
  id?: string;
  type?: string;
  raport?: string;
};

export const useEditDogOpinion = (onSuccess: () => void) => {
  const editOpinion = ({ id, type, raport }: useEditOpinionPayload) => {
    return axios
      .patch(`${config.API_URL}/api/traineropinion/${id}/`, {
        type,
        raport: raport?.trim(),
      })
      .catch((error) => console.log(error));
  };

  const { mutate, isLoading } = useMutation(editOpinion, { onSuccess });

  return { mutate, isLoading };
};
