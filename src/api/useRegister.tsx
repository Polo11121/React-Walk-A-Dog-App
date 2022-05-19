import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

export const useRegister = (onError: () => void) => {
  const register = ({
    email,
    userName,
    password,
  }: {
    email: string;
    userName: string;
    password: string;
  }) =>
    axios
      .post(`${config.API_URL}/api/auth/register/`, {
        username: userName.trim(),
        email: email.trim(),
        password: password.trim(),
      })
      .catch((error) => console.log(error));

  const { mutateAsync, isLoading } = useMutation(register, { onError });

  return { mutateAsync, isLoading };
};
