import { Button, WithLoader } from "Components";
import { Rating, TextField } from "@mui/material";
import { useQueryClient } from "react-query";
import { useCustomToast } from "hooks/useCustomToast";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "api/useGetUser";
import { useGoBack } from "hooks/useGoBack";
import { useGetSlots } from "api/useGetSlots";
import { useGetOpinion } from "api/useGetOpinion";
import { useEffect, useState } from "react";
import { useEditOpinion } from "api/useEditOpinion";
import userAvatar from "assets/user-avatar.png";
import useAuthContext from "hooks/context/AuthContext";
import "./EditOpinion.scss";

export const EditOpinion = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuthContext();
  const params = useParams();
  const navigate = useNavigate();
  const { opinion, isLoading: isOpinionLoading } = useGetOpinion(params.id);
  const { user, isLoading: isUserLoading } = useGetUser(`${opinion?.trainer}`);
  const goBack = useGoBack();
  const { slots, isLoading: isSlotsLoading } = useGetSlots();

  const trainerWalks = slots?.filter(
    ({ trainer, status }) =>
      opinion?.trainer &&
      trainer === +opinion?.trainer &&
      status === "zakończony"
  );
  const countWalk = trainerWalks?.length;

  const [valueRating, setValueRating] = useState<number>(0);
  const [valueText, setValueText] = useState<string>("");

  const isLoading = isOpinionLoading || isSlotsLoading || isUserLoading;

  useEffect(() => {
    if (!isLoading && userId && opinion?.client !== +userId) {
      navigate(`/user-profile/${userId}`);
    }

    if (opinion?.points && opinion?.review) {
      setValueRating(opinion?.points);
      setValueText(opinion?.review);
    }
  }, [opinion, isLoading]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueText(event.target.value);
  };

  const onSuccess = () => {
    queryClient
      .invalidateQueries(["opinion", `${params.id}`])
      .then(() => navigate(`/trainer-info/${opinion?.trainer}/opinions`)); // eslint-disable-next-line react-hooks/rules-of-hooks
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
      <WithLoader isLoading={isLoading}>
        <>
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
            style={{ marginTop: "20px" }}
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
              type="primary"
            />
            <Button onClick={goBack} title="Powrót" type="default" />
          </div>
        </>
      </WithLoader>
    </div>
  );
};

export default EditOpinion;
