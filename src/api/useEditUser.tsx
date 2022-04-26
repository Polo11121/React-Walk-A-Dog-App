import axios from "axios";
import { useMutation } from "react-query";

type UseEditUserPayload = {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
  phone_number: number;
};

export const useEditUser = (onSuccess: () => void) => {
  const editUser = ({
    id,
    username,
    email,
    avatar_url,
    phone_number,
  }: UseEditUserPayload) =>
    axios.patch(`http://127.0.0.1:8000/api/user/${id}/`, {
      username,
      email,
      avatar_url,
      phone_number,
    });

  const { mutate, isLoading } = useMutation(editUser, { onSuccess });

  return { mutate, isLoading };
};
