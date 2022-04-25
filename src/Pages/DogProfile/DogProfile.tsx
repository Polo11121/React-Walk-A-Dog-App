import { Button } from "../../Components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import "./DogProfile.scss";
import { useGetDog } from "../../api/useGetDog";

export const DogProfile = () => {
  const { id } = useParams();
  const { dog } = useGetDog(id);
  const navigate = useNavigate();

  const switchToManageDogProfile = () => navigate(`/edit-dog/${id}`);
  const switchToManageDogRecommendations = () =>
    navigate(`/dog-recommendations/${id}`);

  return (
    <div className="dog-profile">
      <img className="dog-profile__image" src={dog?.avatar_url} alt="" />
      <div className="dog-profile__name">{dog?.name}</div>
      <div className="dog-profile__section">
        <div className="dog-profile__section-title">
          <div className="dog-profile__line"></div>
          <div>Informacje</div>
          <div className="dog-profile__line"></div>
        </div>
        <div className="dog-profile__section-infos">
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Wiek:</div>
            <div>{dog?.age} lata</div>
          </div>
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Rasa:</div>
            <div>{dog?.breed}</div>
          </div>
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Waga:</div>
            <div>{dog?.weight}kg</div>
          </div>
        </div>
      </div>
      <div className="dog-profile__section">
        <div className="dog-profile__section-title">
          <div className="dog-profile__line"></div>
          <div>Spacery</div>
          <div className="dog-profile__line"></div>
        </div>
        <div className="dog-profile__section-infos">
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">
              Liczba spacerów:
            </div>
            <div>12</div>
          </div>
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">
              Pokonana odległość:
            </div>
            <div>69km</div>
          </div>
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Łączny czas:</div>
            <div>69h</div>
          </div>
        </div>
      </div>
      <div className="dog-profile__buttons">
        <Button
          styles={{ width: "140px" }}
          size="M"
          onClick={switchToManageDogRecommendations}
          title="Zalecenia"
          type="default"
        />
        <Button
          styles={{ width: "140px" }}
          Icon={<EditIcon />}
          size="M"
          onClick={switchToManageDogProfile}
          title="Edytuj profil"
          type="default"
        />
      </div>
    </div>
  );
};
