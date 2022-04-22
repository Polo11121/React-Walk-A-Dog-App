import { Button } from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import "./UserProfile.scss";

export const UserProfile = () => {
  const navigate = useNavigate();

  const switchToChangePassword = () => navigate("/change-password");
  const switchToEditUserProfile = () => navigate("/edit-user-profile");

  return (
    <div className="user-profile">
      <div className="user-profile__title">Profil użytkownika</div>
      <img
        className="user-profile__image"
        src="https://media.discordapp.net/attachments/781826798282735637/966748146443108362/womanPlaceholder.jpg?width=530&height=530"
        alt=""
      />
      <div className="user-profile__title">Young Jessica</div>
      <div className="user-profile__section-title">
        <div className="user-profile__line"></div>
        <div>Informacje</div>
        <div className="user-profile__line"></div>
      </div>
      <div className="user-profile__information">
        <div className="user-profile__info-container">
          <div className="user-profile__info-title">Nazwa użykownika: </div>
          <div className="user-profile__info">young69</div>
        </div>
        <div className="user-profile__info-container">
          <div className="user-profile__info-title">Adres email: </div>
          <div className="user-profile__info">bogini69@gmail.com</div>
        </div>
        <div className="user-profile__info-container">
          <div className="user-profile__info-title">Nr. telefonu:</div>
          <div className="user-profile__info">669123872</div>
        </div>
      </div>
      <div className="user-profile__buttons">
        <Button
          styles={{ width: "140px" }}
          size="M"
          onClick={switchToChangePassword}
          title="Zmień hasło"
          type="primary"
        />
        <Button
          styles={{ width: "140px" }}
          size="M"
          onClick={switchToEditUserProfile}
          Icon={<EditIcon />}
          title="Edytuj profil"
          type="primary"
        />
      </div>
    </div>
  );
};
