import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import jwt_decode from "jwt-decode";
import { AuthTokensType } from "../types/User.type";
import { useGetUser } from "../api/useGetUser";

type AuthContextType = {
  authTokens: null | AuthTokensType;
  userId: null | string;
  userInfo: {
    avatar_url: string;
    email: string;
    id: number;
    is_trainer: boolean;
    phone_number: number;
    username: string;
  };
  loginUser: ({ access, refresh }: AuthTokensType) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  authTokens: null,
  userId: null,
  userInfo: {
    avatar_url: "",
    email: "",
    id: 0,
    is_trainer: false,
    phone_number: 0,
    username: "",
  },
  loginUser: () => null,
  logoutUser: () => null,
});

const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authTokens, setAuthTokens] = useState<AuthTokensType | null>(null);
  const [userId, setUserId] = useState<null | string>(null);
  const { user } = useGetUser(userId);

  useEffect(() => {
    if (sessionStorage.authTokens) {
      const sessionData = JSON.parse(sessionStorage.authTokens);
      setAuthTokens(sessionData);
      setUserId(jwt_decode<{ user_id: string }>(sessionData.access).user_id);
    }
  }, []);

  const loginUser = ({ access, refresh }: AuthTokensType) => {
    setUserId(jwt_decode<{ user_id: string }>(access).user_id);
    sessionStorage.setItem("authTokens", JSON.stringify({ access, refresh }));
  };

  const logoutUser = () => {
    setUserId(null);
    setAuthTokens(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ authTokens, userId, loginUser, logoutUser, userInfo: user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
