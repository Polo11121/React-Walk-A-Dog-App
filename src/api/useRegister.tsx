import axios from "axios";
import { useMutation } from "react-query";

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
      .post("http://146.59.16.195:8000/api/auth/register/", {
        username: userName,
        email,
        password,
      })
      .catch((error) => console.log(error));

  const { mutateAsync, isLoading } = useMutation(register, { onError });

  return { mutateAsync, isLoading };
};
