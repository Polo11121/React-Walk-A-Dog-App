import axios from "axios";
import useAuthContext from "hooks/context/AuthContext";
import { useMutation } from "react-query";

export const useChangePassword = (
  onSuccess: () => void,
  onError: () => void
) => {
  const { authTokens } = useAuthContext();
  const changePassword = ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) =>
    axios
      .patch(
        "http://127.0.0.1:8000/api/auth/password",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${authTokens?.access}` },
        }
      )
      .catch((error) => console.log(error));

  const { mutate, isLoading } = useMutation(changePassword, {
    onSuccess,
    onError,
  });

  return { mutate, isLoading };
};
