import EditIcon from "@mui/icons-material/Edit";
import { Button } from "Components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "api/useGetUser";
import "./UserProfile.scss";

export const UserProfile = () => {
  const { id } = useParams();
  const { user } = useGetUser(id);
  const navigate = useNavigate();

  const switchToChangePassword = () => navigate("/change-password");

  const switchToEditUserProfile = () => navigate(`/edit-user-profile/${id}`);

  return (
    <div className="user-profile">
      <div className="user-profile__title">
        Profil {user?.is_trainer ? "trenera" : "użytkownika"}
      </div>
      <img
        className="user-profile__image"
        src={`http://127.0.0.1:8000${user?.avatar_url}`}
        alt={user?.username}
      />
      <div className="user-profile__title">{user?.username}</div>
      <div className="user-profile__section-title">
        <div className="user-profile__line"></div>
        <div>Informacje</div>
        <div className="user-profile__line"></div>
      </div>
      <div className="user-profile__information">
        <div className="user-profile__info-container">
          <div className="user-profile__info-title">Nazwa użykownika: </div>
          <div className="user-profile__info">{user?.username}</div>
        </div>
        <div className="user-profile__info-container">
          <div className="user-profile__info-title">Adres email: </div>
          <div className="user-profile__info">{user?.email}</div>
        </div>
        <div className="user-profile__info-container">
          <div className="user-profile__info-title">Nr. telefonu:</div>
          <div className="user-profile__info">{user?.phone_number}</div>
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
