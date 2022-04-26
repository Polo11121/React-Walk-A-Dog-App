import logo from "assets/logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

export const Header = ({ hideButton }: { hideButton?: boolean }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="header">
      {!hideButton && (
        <IconButton onClick={goBack} className="header__back-button">
          <ArrowBackIcon color="primary" />
        </IconButton>
      )}
      <div className="header__main">
        <img className="header__logo" src={logo} alt="logo" />
        <span>Walk A Dog</span>
      </div>
    </div>
  );
};
