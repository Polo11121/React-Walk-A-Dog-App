import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

type useEditOpinionPayload = {
  id: number;
  review?: string;
  points?: number;
};

export const useEditOpinion = (onSuccess: () => void) => {
  const editOpinion = ({ id, review, points }: useEditOpinionPayload) => {
    return axios
      .patch(`${config.API_URL}/api/clientopinion/${id}/`, {
        review: review && review.trim(),
        points,
      })
      .catch((error) => console.log(error));
  };

  const { mutate, isLoading } = useMutation(editOpinion, { onSuccess });

  return { mutate, isLoading };
};
