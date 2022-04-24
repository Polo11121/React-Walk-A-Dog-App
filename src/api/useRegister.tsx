import { useMutation } from "react-query";
import axios from "axios";

export const useRegister = () => {
  const register = ({
    email,
    userName,
    password,
  }: {
    email: string;
    userName: string;
    password: string;
  }) =>
    axios.post("http://127.0.0.1:8000/api/auth/register/", {
      username: userName,
      email,
      password,
    });

  const { mutateAsync, isLoading } = useMutation(register);

  return { mutateAsync, isLoading };
};
