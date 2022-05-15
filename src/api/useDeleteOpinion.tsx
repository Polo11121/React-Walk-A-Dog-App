import axios from "axios";
import { useMutation } from "react-query";

export const useDeleteOpinion = (onSuccess?: () => void) => {
  const deleteOpinion = (id: number) =>
    axios.delete(`http://127.0.0.1:8000/api/clientopinion/${id}/`);

  const { mutate, isLoading } = useMutation(deleteOpinion, { onSuccess });

  return { mutate, isLoading };
};
