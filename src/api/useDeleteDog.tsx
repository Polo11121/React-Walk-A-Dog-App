import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

export const useDeleteDog = (onSuccess: () => void) => {
  const deleteDog = ({ id, isActive }: { id: string; isActive: boolean }) =>
    axios.patch(`${config.API_URL}/api/dog/${id}/`, { is_active: !isActive });

  const { mutate, isLoading } = useMutation(deleteDog, { onSuccess });

  return { mutate, isLoading };
};
