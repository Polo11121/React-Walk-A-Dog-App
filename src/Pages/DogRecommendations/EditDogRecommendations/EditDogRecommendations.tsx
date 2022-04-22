import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../Components/Button/Button";
import "./EditDogRecommendations.scss";

export const EditDogRecommendations = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const titlePrefix = pathname.split("-")[2];

  const goBack = () => navigate(-1);
  return (
    <div className="edit-dog-recommendations">
      <div className="edit-dog-recommendations__title">
        Edytuj
        {titlePrefix === "recommendations" ? " zalecenia" : " przeciwwskazania"}
      </div>
      <textarea className="edit-dog-recommendations__text-area" />
      <div className="edit-dog-recommendations__buttons">
        <Button
          styles={{
            fontWeight: "500",
            width: "160px",
            borderRadius: "15px",
          }}
          size="L"
          onClick={goBack}
          title="Anuluj"
          type="red"
        />
        <Button
          styles={{ width: "160px", fontWeight: "500", borderRadius: "15px" }}
          size="L"
          onClick={goBack}
          title="Zatwierdź"
          type="green"
        />
      </div>
    </div>
  );
};
