import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

type UseAddOpinionPayloadType = {
  client: number;
  trainer: number;
  review: string;
  points: number;
};

export const useAddOpinion = (onSuccess?: () => void) => {
  const addOpinion = ({
    trainer,
    client,
    review,
    points,
  }: UseAddOpinionPayloadType) =>
    axios.post(`${config.API_URL}/clientopinion/`, {
      trainer,
      client,
      review: review.trim(),
      points,
    });

  const { mutate, isLoading } = useMutation(addOpinion, { onSuccess });

  return { mutate, isLoading };
};
