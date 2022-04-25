import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEditDogRecommendations } from "../../../api/useEditDogRecommendations";
import { useGetDog } from "../../../api/useGetDog";
import { Button } from "../../../Components/Button/Button";
import { useQueryClient } from "react-query";
import "./EditDogRecommendations.scss";

export const EditDogRecommendations = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { dog } = useGetDog(id);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const titlePrefix = pathname.split("/")[1];
  const isRecommendations = titlePrefix === "edit-dog-recommendations";
  const [inputValue, setInputValue] = useState(
    isRecommendations ? dog?.recommendation : dog?.contraindications
  );

  const onSuccess = () => queryClient.invalidateQueries(["dog", id]);

  const { mutate } = useEditDogRecommendations(onSuccess);

  const submitDogRecommendationsHandler = () => {
    if (id) {
      mutate({
        id,
        type: isRecommendations ? "recommendation" : "contraindications",
        value: inputValue,
      });
    }
  };

  const changeRecommendationsHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => setInputValue(event?.target.value);

  const goBack = () => navigate(-1);

  const isButtonDisabled = () =>
    isRecommendations
      ? inputValue === dog?.recommendation
      : inputValue === dog?.contraindications;

  return (
    <div className="edit-dog-recommendations">
      <div className="edit-dog-recommendations__title">
        Edytuj
        {isRecommendations ? " zalecenia" : " przeciwwskazania"}
      </div>
      <textarea
        onChange={changeRecommendationsHandler}
        value={inputValue}
        className="edit-dog-recommendations__text-area"
      />
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
          disabled={isButtonDisabled()}
          size="L"
          onClick={submitDogRecommendationsHandler}
          title="Zatwierdź"
          type="green"
        />
      </div>
    </div>
  );
};
