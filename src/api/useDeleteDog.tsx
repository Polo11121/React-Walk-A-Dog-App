import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

export const useDeleteDog = (onSuccess: () => void) => {
  const deleteDog = ({ id }: { id: string }) =>
    axios.delete(`${config.API_URL}/api/dog/${id}/`);

  const { mutate, isLoading } = useMutation(deleteDog, { onSuccess });

  return { mutate, isLoading };
};
