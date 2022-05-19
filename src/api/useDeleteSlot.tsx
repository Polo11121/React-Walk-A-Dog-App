import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

export const useDeleteSlot = (onSuccess: () => void) => {
  const deleteSlot = ({ id }: { id: number }) =>
    axios.delete(`${config.API_URL}/api/slot/${id}/`);

  const { mutate, isLoading } = useMutation(deleteSlot, { onSuccess });

  return { mutate, isLoading };
};
