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
        "http://146.59.16.195:8000/api/auth/password",
        {
          old_password: oldPassword.trim(),
          new_password: newPassword.trim(),
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