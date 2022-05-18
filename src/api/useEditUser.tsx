import axios from "axios";
import { useMutation } from "react-query";

type UseEditUserPayload = {
  id: string;
  username: string;
  email: string;
  avatar: File;
  phone_number: number;
};

export const useEditUser = (onSuccess: () => void) => {
  const editUser = ({
    id,
    username,
    email,
    avatar,
    phone_number,
  }: UseEditUserPayload) => {
    const formData = new FormData();
    avatar && formData.append("avatar", avatar);
    formData.append("username", username.trim());
    formData.append("email", email.trim());
    phone_number && formData.append("phone_number", `${phone_number}`);

    return axios
      .patch(`http://146.59.16.195:8000/api/user/${id}/`, formData)
      .catch((error) => console.log(error));
  };

  const { mutate, isLoading } = useMutation(editUser, { onSuccess });

  return { mutate, isLoading };
};
