import axios from "axios";
import { useMutation } from "react-query";

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
    axios.post(`http://146.59.16.195:8000/api/clientopinion/`, {
      trainer,
      client,
      review,
      points,
    });

  const { mutate, isLoading } = useMutation(addOpinion, { onSuccess });

  return { mutate, isLoading };
};
