import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

export const useLogin = (
  onSuccess: (data: any) => void,
  onError: () => void
) => {
  const login = ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) =>
    axios.post(`${config.API_URL}/api/auth/login/`, {
      username: userName.trim(),
      password: password.trim(),
    });

  const { mutate, isLoading } = useMutation(login, {
    onSuccess,
    onError,
  });

  return { mutate, isLoading };
};
