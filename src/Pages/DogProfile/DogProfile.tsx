import { Button } from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import "./DogProfile.scss";

export const DogProfile = () => {
  const navigate = useNavigate();

  const switchToManageDogProfile = () => navigate("/edit-dog");
  const switchToManageDogRecommendations = () =>
    navigate("/dog-recommendations");

  return (
    <div className="dog-profile">
      <img
        className="dog-profile__image"
        src="https://bi.im-g.pl/im/d0/a9/e1/z14789072Q,Prawdopodobnie-najslawniejsze-zdjecie-Piesela.jpg"
        alt=""
      />
      <div className="dog-profile__name">Pimpek</div>
      <div className="dog-profile__section">
        <div className="dog-profile__section-title">
          <div className="dog-profile__line"></div>
          <div>Informacje</div>
          <div className="dog-profile__line"></div>
        </div>
        <div className="dog-profile__section-infos">
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Wiek:</div>
            <div>2 lata</div>
          </div>
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Rasa:</div>
            <div>gigaczad</div>
          </div>
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Waga:</div>
            <div>69kg</div>
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
