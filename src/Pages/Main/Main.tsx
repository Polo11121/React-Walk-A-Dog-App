import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import logo from "../../assets/logo.png";
import "./Main.scss";

export const Main = () => {
  const navigate = useNavigate();

  const switchToLoginPageHandler = () => navigate("login");

  const switchToRegisterPageHandler = () => navigate("register");

  return (
    <div className="main">
      <div className="main__container">
        <img src={logo} alt="logo" />
        <h1 className="main__logo">Walk A dog</h1>
        <div className="main__buttons">
          <Button
            onClick={switchToLoginPageHandler}
            styles={{ marginBottom: "1.5rem" }}
            type="primary"
            size="XL"
            title="ZALOGUJ"
          />
          <Button
            onClick={switchToRegisterPageHandler}
            styles={{ marginBottom: "1.5rem" }}
            type="secondary"
            size="XL"
            title="ZAREJESTRUJ"
          />
        </div>
      </div>
    </div>
  );
};
