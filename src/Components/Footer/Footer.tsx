import LogoutIcon from "@mui/icons-material/Logout";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import GroupIcon from "@mui/icons-material/Group";
import useAuthContext from "hooks/context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import "./Footer.scss";

export const Footer = ({ logoutUser }: { logoutUser: () => void }) => {
  const { userId, userInfo } = useAuthContext();
  const navigate = useNavigate();

  const switchToWalks = () =>
    userInfo.is_trainer
      ? navigate(`trainer-info/${userId}/walks`)
      : navigate(`/walks`);

  const switchToMyProfile = () => navigate(`/user-profile/${userId}`);

  const switchToUserProfiles = () => navigate("/user-profiles/trainers");

  return (
    <div className="footer">
      <div onClick={switchToWalks} className="footer__icon">
        <DirectionsWalkIcon />
        <div>Spacery</div>
      </div>
      <div onClick={switchToUserProfiles} className="footer__icon">
        <GroupIcon />
        <div>Użytkownicy</div>
      </div>
      <div onClick={switchToMyProfile} className="footer__icon">
        <AccountCircleIcon />
        <div>Mój Profil</div>
      </div>
      <div onClick={logoutUser} className="footer__icon">
        <LogoutIcon />
        <div>Wyloguj</div>
      </div>
    </div>
  );
};
