import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import jwt_decode from "jwt-decode";
import { AuthTokensType } from "types/User.types";
import { useGetUser } from "api/useGetUser";
import { useNavigate } from "react-router-dom";

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
  isAppLoading: boolean;
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
  isAppLoading: true,
});

const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authTokens, setAuthTokens] = useState<AuthTokensType | null>(null);
  const [userId, setUserId] = useState<null | string>(null);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const { user } = useGetUser(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.authTokens) {
      const sessionData = JSON.parse(sessionStorage.authTokens);
      setAuthTokens(sessionData);
      setUserId(jwt_decode<{ user_id: string }>(sessionData.access).user_id);
    }
    setIsAppLoading(false);
  }, []);

  const loginUser = ({ access, refresh }: AuthTokensType) => {
    setUserId(jwt_decode<{ user_id: string }>(access).user_id);
    sessionStorage.setItem("authTokens", JSON.stringify({ access, refresh }));
  };

  const logoutUser = () => {
    setUserId(null);
    setAuthTokens(null);
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        userId,
        loginUser,
        logoutUser,
        userInfo: user,
        isAppLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
