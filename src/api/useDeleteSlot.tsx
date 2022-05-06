import axios from "axios";
import { useMutation } from "react-query";

export const useDeleteSlot = (onSuccess: () => void) => {
  const deleteSlot = ({ id }: { id: number }) =>
    axios.delete(`http://127.0.0.1:8000/api/slot/${id}/`);

  const { mutate, isLoading } = useMutation(deleteSlot, { onSuccess });

  return { mutate, isLoading };
};
