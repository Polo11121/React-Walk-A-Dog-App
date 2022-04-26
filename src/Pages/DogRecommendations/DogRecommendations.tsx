import { useGoBack } from "hooks/useGoBack";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDog } from "api/useGetDog";
import { Button } from "Components";
import "./DogRecommendations.scss";

export const DogRecommendations = () => {
  const { id } = useParams();
  const { dog } = useGetDog(id);
  const navigate = useNavigate();
  const goBack = useGoBack();

  const goToEditDogRecommendations = () =>
    navigate(`/edit-dog-recommendations/${id}`);

  const goToEditDogContraindications = () =>
    navigate(`/edit-dog-contraindications/${id}`);

  return (
    <div className="dog-recommendations">
      <div className="dog-recommendations__name">Rambo</div>
      <div className="dog-recommendations__subtitle">
        zalecenia i przeciwwskazania
      </div>
      <div className="dog-recommendations__box dog-recommendations__box--red">
        <div className="dog-recommendations__box-content">
          {dog.contraindications}
        </div>
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
        <div className="dog-recommendations__box-content">
          {dog.recommendation}
        </div>
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
