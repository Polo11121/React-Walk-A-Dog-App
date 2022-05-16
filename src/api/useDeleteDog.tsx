import axios from "axios";
import { useMutation } from "react-query";

export const useDeleteDog = (onSuccess: () => void) => {
  const deleteDog = ({ id }: { id: string }) =>
    axios.delete(`http://146.59.16.195:8000/api/dog/${id}/`);

  const { mutate, isLoading } = useMutation(deleteDog, { onSuccess });

  return { mutate, isLoading };
};
