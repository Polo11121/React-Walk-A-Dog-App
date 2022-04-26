import axios from "axios";
import { useMutation } from "react-query";

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
    axios.post("http://127.0.0.1:8000/api/auth/login/", {
      username: userName,
      password,
    });

  const { mutate, isLoading } = useMutation(login, {
    onSuccess,
    onError,
  });

  return { mutate, isLoading };
};
