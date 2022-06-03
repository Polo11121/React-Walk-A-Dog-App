import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

type UseAddOpinionPayloadType = {
  client: number | null;
  trainer: number | null;
  raport: string;
  dog: number;
  type: string | null;
};

export const useAddDogOpinion = (onSuccess?: () => void) => {
  const addOpinion = ({
    trainer,
    client,
    dog,
    raport,
    type,
  }: UseAddOpinionPayloadType) =>
    axios.post(`${config.API_URL}/api/traineropinion/`, {
      trainer,
      client,
      dog,
      type,
      raport: raport.trim(),
    });

  const { mutate, isLoading } = useMutation(addOpinion, { onSuccess });

  return { mutate, isLoading };
};
