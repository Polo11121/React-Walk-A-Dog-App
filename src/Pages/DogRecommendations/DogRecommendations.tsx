import { useGoBack } from "hooks/useGoBack";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDog } from "api/useGetDog";
import { Button } from "Components";
import { useOwner } from "hooks/useOwner";
import "./DogRecommendations.scss";

export const DogRecommendations = () => {
  const { subId: id } = useParams();
  const { dog } = useGetDog(id);
  const navigate = useNavigate();
  const isOwner = useOwner();
  const goBack = useGoBack();

  const goToEditDogRecommendations = () =>
    navigate(`/edit-dog-recommendations/${dog.owner}/${dog.id}`);

  const goToEditDogContraindications = () =>
    navigate(`/edit-dog-contraindications/${dog.owner}/${dog.id}`);

  return (
    <div className="dog-recommendations">
      <div className="dog-recommendations__name">{dog?.name}</div>
      {!dog?.is_active && (
        <div
          className="dog-recommendations__name"
          style={{ color: "red", margin: 0 }}
        >
          (Nieaktywny)
        </div>
      )}
      <div className="dog-recommendations__subtitle">
        zalecenia i przeciwwskazania
      </div>
      <div className="dog-recommendations__box dog-recommendations__box--green">
        <div className="dog-recommendations__box-content">
          {dog?.recommendation}
        </div>
        {isOwner && dog?.is_active && (
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
        )}
      </div>
      <div className="dog-recommendations__box dog-recommendations__box--red">
        <div className="dog-recommendations__box-content">
          {dog?.contraindications}
        </div>
        {isOwner && dog?.is_active && (
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
        )}
      </div>
      <div className="dog-recommendations__button">
        <Button size="M" onClick={goBack} title="Powrót" type="default" />
      </div>
    </div>
  );
};
