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
import { useCustomToast } from "hooks/useCustomToast";

type AuthContextType = {
  authTokens: null | AuthTokensType;
  userId: null | string;
  userInfo: {
    avatar: string;
    email: string;
    id: number;
    is_trainer: boolean;
    phone_number: number;
    username: string;
  };
  loginUser: ({ access, refresh }: AuthTokensType) => void;
  logoutUser: () => void;
  isAppLoading: boolean;
  startWalk: (slotId: string) => void;
  stopWalk: () => void;
  activeWalk: string;
};

const AuthContext = createContext<AuthContextType>({
  authTokens: null,
  userId: null,
  userInfo: {
    avatar: "",
    email: "",
    id: 0,
    is_trainer: false,
    phone_number: 0,
    username: "",
  },
  loginUser: () => null,
  logoutUser: () => null,
  startWalk: () => null,
  stopWalk: () => null,
  isAppLoading: true,
  activeWalk: "",
});

const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authTokens, setAuthTokens] = useState<AuthTokensType | null>(null);
  const [userId, setUserId] = useState<null | string>(null);
  const [activeWalk, setActiveWalk] = useState("");
  const [isAppLoading, setIsAppLoading] = useState(true);
  const { user } = useGetUser(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.authTokens) {
      const sessionData = JSON.parse(sessionStorage.authTokens);
      setAuthTokens(sessionData);
      setActiveWalk(sessionStorage.activeWalk);
      setUserId(jwt_decode<{ user_id: string }>(sessionData.access).user_id);
    }

    setIsAppLoading(false);
  }, [sessionStorage.activeWalk]);

  const loginUser = ({ access, refresh }: AuthTokensType) => {
    setUserId(jwt_decode<{ user_id: string }>(access).user_id);
    setAuthTokens({ access, refresh });
    sessionStorage.setItem("authTokens", JSON.stringify({ access, refresh }));
  };

  const startWalk = (slotId: string) => {
    sessionStorage.setItem("activeWalk", slotId);
    setActiveWalk(slotId);
  };

  const stopWalk = () => {
    sessionStorage.removeItem("activeWalk");
    setActiveWalk("");
  };

  const logoutUser = () => {
    setUserId(null);
    setAuthTokens(null);
    setActiveWalk("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Pomyślnie wylogowano!");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        activeWalk,
        startWalk,
        stopWalk,
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
