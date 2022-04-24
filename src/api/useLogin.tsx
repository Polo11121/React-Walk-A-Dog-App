import { useMutation } from "react-query";
import axios from "axios";

export const useLogin = (onSuccess: (data: any) => void) => {
  const login = ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) =>
    axios.post("http://127.0.0.1:8000/api/auth/login/", {
      username: userName,
      email: "eloelo320@wp.pl",
      password,
    });

  const { mutate, isLoading } = useMutation(login, {
    onSuccess,
  });

  return { mutate, isLoading };
};
