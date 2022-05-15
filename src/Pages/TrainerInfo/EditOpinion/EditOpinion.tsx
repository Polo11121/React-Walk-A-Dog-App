import { Button } from "Components";
import { Rating, TextField } from "@mui/material";
import { useQueryClient } from "react-query";
import { useCustomToast } from "hooks/useCustomToast";
import { useParams } from "react-router-dom";
import { useGetUser } from "api/useGetUser";
import { useGoBack } from "hooks/useGoBack";
import { useGetSlots } from "api/useGetSlots";
import { useGetOpinion } from "api/useGetOpinion";
import { useEffect, useState } from "react";
import { useEditOpinion } from "api/useEditOpinion";
import userAvatar from "assets/user-avatar.png";
import "./EditOpinion.scss";

export const EditOpinion = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { opinion } = useGetOpinion(params.id);
  const { user } = useGetUser(`${opinion?.trainer}`);
  const goBack = useGoBack();
  const { slots } = useGetSlots();

  const trainerWalks = slots?.filter(
    ({ trainer, status }) =>
      opinion?.trainer &&
      trainer === +opinion?.trainer &&
      status === "zakończony"
  );
  const countWalk = trainerWalks?.length;

  const [valueRating, setValueRating] = useState<number>(0);
  const [valueText, setValueText] = useState<string>("");

  useEffect(() => {
    if (opinion?.points && opinion?.review) {
      setValueRating(opinion?.points);
      setValueText(opinion?.review);
    }
  }, [opinion]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueText(event.target.value);
  };

  const onSuccess = () => {
    queryClient
      .invalidateQueries(["opinion", `${params.id}`])
      .then(() => goBack()); // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Zedytowano opinie!");
  };

  const isButtonDisabled =
    (valueText === opinion?.review && valueRating === opinion?.points) ||
    !valueText.trim();

  const { mutate } = useEditOpinion(onSuccess);

  const editOpinion = () =>
    mutate({
      id: +`${params.id}`,
      points: valueRating || 0,
      review: valueText,
    });

  return (
    <div className="trainer-editOpinion">
      <div className="trainer-editOpinion__title">Edytuj opinie</div>
      <div className="trainer-editOpinion__trainerInfo">
        <img
          className="trainer-editOpinion__imageUser"
          src={user?.avatar || userAvatar}
          alt={user?.username}
        />
        <div className="trainer-editOpinion__info">
          <div>{user?.username}</div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            {user?.is_trainer ? "Trener" : "Użytkownik"}
          </div>
          <div>spacery: {countWalk}</div>
        </div>
      </div>
      <Rating
        className="trainer-editOpinion__rating"
        value={valueRating}
        onChange={(event, newValue) => {
          setValueRating(+`${newValue}`);
        }}
      />
      <TextField
        className="trainer-editOpinion__review"
        id="TextFieldOpinion"
        multiline
        rows={16}
        defaultValue={opinion?.review}
        onChange={handleChange}
      />
      <div className="trainer-editOpinion__buttons">
        <Button
          onClick={editOpinion}
          disabled={isButtonDisabled}
          title="Edytuj opinie"
          type="default"
        />
        <Button onClick={goBack} title="Powrót" type="default" />
      </div>
    </div>
  );
};

export default EditOpinion;
