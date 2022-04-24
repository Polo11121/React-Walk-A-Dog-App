import "./Footer.scss";
import LogoutIcon from "@mui/icons-material/Logout";

export const Footer = ({ logoutUser }: { logoutUser: () => void }) => {
  return (
    <div className="footer">
      <div onClick={logoutUser} className="footer__logout">
        <LogoutIcon />
        <div>Logout</div>
      </div>
    </div>
  );
};
