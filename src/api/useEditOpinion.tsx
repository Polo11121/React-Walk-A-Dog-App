import axios from "axios";
import { useMutation } from "react-query";

type useEditOpinionPayload = {
  id: number;
  review?: string;
  points?: number;
};

export const useEditOpinion = (onSuccess: () => void) => {
  const editOpinion = ({ id, review, points }: useEditOpinionPayload) => {
    return axios
      .patch(`http://146.59.16.195:8000/api/clientopinion/${id}/`, {
        review: review && review.trim(),
        points,
      })
      .catch((error) => console.log(error));
  };

  const { mutate, isLoading } = useMutation(editOpinion, { onSuccess });

  return { mutate, isLoading };
};
