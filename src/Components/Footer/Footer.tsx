import LogoutIcon from "@mui/icons-material/Logout";
import PetsIcon from "@mui/icons-material/Pets";
import useAuthContext from "hooks/context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import "./Footer.scss";

export const Footer = ({ logoutUser }: { logoutUser: () => void }) => {
  const { userId } = useAuthContext();
  const navigate = useNavigate();

  const switchToMyDogs = () => navigate(`/dog-profiles/${userId}`);
  const switchToMyProfile = () => navigate(`/user-profile/${userId}`);

  return (
    <div className="footer">
      <div onClick={switchToMyDogs} className="footer__icon">
        <PetsIcon />
        <div>My Dogs</div>
      </div>
      <div onClick={switchToMyProfile} className="footer__icon">
        <AccountCircleIcon />
        <div>My Profile</div>
      </div>
      <div onClick={logoutUser} className="footer__icon">
        <LogoutIcon />
        <div>Logout</div>
      </div>
    </div>
  );
};
