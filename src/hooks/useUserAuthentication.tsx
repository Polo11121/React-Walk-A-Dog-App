import { useEffect, useState } from "react";
import { userInfoType } from "../types/User.type";

export const useUserAuthentication = () => {
  const [userInfo, setUserInfo] = useState<null | userInfoType>(null);

  useEffect(() => {
    if (sessionStorage.user) {
      setUserInfo(JSON.parse(sessionStorage.user));
    }
  }, []);

  const loginUser = ({ token, userId }: userInfoType) => {
    setUserInfo({ token, userId });
    sessionStorage.setItem("user", JSON.stringify({ token, userId }));
  };

  const logoutUser = () => {
    setUserInfo(null);
    sessionStorage.clear();
  };

  return {
    userInfo,
    loginUser,
    logoutUser,
  };
};
