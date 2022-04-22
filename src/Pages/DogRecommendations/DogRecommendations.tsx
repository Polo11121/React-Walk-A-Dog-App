import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import "./DogRecommendations.scss";

export const DogRecommendations = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const goToEditDogRecommendations = () =>
    navigate("/edit-dog-recommendations");

  const goToEditDogContraindications = () =>
    navigate("/edit-dog-contraindications");

  return (
    <div className="dog-recommendations">
      <div className="dog-recommendations__name">Rambo</div>
      <div className="dog-recommendations__subtitle">
        zalecenia i przeciwwskazania
      </div>
      <div className="dog-recommendations__box dog-recommendations__box--red">
        <div className="dog-recommendations__box-content"></div>
        <div className="dog-recommendations__box-button">
          <Button
            onClick={goToEditDogContraindications}
            styles={{
              width: "100px",
              fontWeight: "500",
            }}
            size="M"
            title="Edytuj"
            type="red"
          />
        </div>
      </div>
      <div className="dog-recommendations__box dog-recommendations__box--green">
        <div className="dog-recommendations__box-content"></div>
        <div className="dog-recommendations__box-button">
          <Button
            onClick={goToEditDogRecommendations}
            styles={{
              width: "100px",
              fontWeight: "500",
            }}
            size="M"
            title="Edytuj"
            type="green"
          />
        </div>
      </div>
      <div className="dog-recommendations__button">
        <Button
          styles={{ width: "140px" }}
          size="M"
          onClick={goBack}
          title="Powrót"
          type="default"
        />
      </div>
    </div>
  );
};
