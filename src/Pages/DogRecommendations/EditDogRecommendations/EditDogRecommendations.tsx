import { ChangeEvent, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEditDogRecommendations } from "api/useEditDogRecommendations";
import { useGetDog } from "api/useGetDog";
import { Button } from "Components";
import { useQueryClient } from "react-query";
import { useCustomToast } from "hooks/context/useCustomToast";
import { useGoBack } from "hooks/useGoBack";
import "./EditDogRecommendations.scss";

export const EditDogRecommendations = () => {
  const queryClient = useQueryClient();
  const goBack = useGoBack();
  const { subId: id } = useParams();
  const { dog } = useGetDog(id);
  const { pathname } = useLocation();
  const titlePrefix = pathname.split("/")[1];
  const isRecommendations = titlePrefix === "edit-dog-recommendations";
  const [inputValue, setInputValue] = useState(
    isRecommendations ? dog?.recommendation : dog?.contraindications
  );

  const onSuccess = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast(
      isRecommendations
        ? `Pomyślnie zedytowano zalecenia!`
        : `Pomyślnie zedytowano przeciwwskazania!`
    );
    queryClient.invalidateQueries(["dog", id]);
  };

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
          styles={{ width: "160px", fontWeight: "500", borderRadius: "15px" }}
          disabled={isButtonDisabled()}
          size="L"
          onClick={submitDogRecommendationsHandler}
          title="Zatwierdź"
          type="green"
        />
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
      </div>
    </div>
  );
};
