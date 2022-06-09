import { Button } from "Components";
import userAvatar from "assets/user-avatar.png";
import { Rating, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "api/useGetUser";
import { useGoBack } from "hooks/useGoBack";
import { useGetSlots } from "api/useGetSlots";
import { useGetOpinion } from "api/useGetOpinion";
import "./TrainerDetails.scss";
import useAuthContext from "hooks/context/AuthContext";

export const TrainerDetails = () => {
  const params = useParams();
  const { opinion } = useGetOpinion(params.id);
  const navigate = useNavigate();
  const { user } = useGetUser(`${opinion?.trainer}`);
  const { userId } = useAuthContext();
  const goBack = useGoBack();

  const { slots } = useGetSlots();

  const trainerWalks = slots?.filter(
    ({ trainer, status }) =>
      opinion?.trainer &&
      trainer === +opinion?.trainer &&
      status === "zakończony"
  );

  const countWalk = trainerWalks?.length;

  let rating = 0;

  if (opinion?.points !== undefined) {
    rating = opinion?.points;
  }

  const goToTrainerProfile = () => navigate(`/user-profile${user?.id}`);

  const goToEditOpinion = () =>
    navigate(`/trainer-opinion-edit/${opinion?.id}`);

  return (
    <div className="trainer-details">
      <div className="trainer-details__title">Szczegóły opinii</div>
      <div className="trainer-details__trainerInfo">
        <img
          onClick={goToTrainerProfile}
          className="trainer-details__imageUser"
          src={user?.avatar || userAvatar}
          alt={user?.username}
        />
        <div className="trainer-details__info">
          <div>{user?.username}</div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            {user?.is_trainer ? "Trener" : "Użytkownik"}
          </div>
          <div>spacery: {countWalk}</div>
        </div>
      </div>
      <Rating className="trainer-details__rating" value={rating} readOnly />
      <div className="trainer-details__review">
        <TextField
          className="trainer-addOpinion__review"
          id="TextFieldOpinion"
          disabled
          multiline
          rows={16}
          value={opinion?.review}
        />
      </div>
      <div className="trainer-details__buttons">
        {userId && opinion?.client === +userId && (
          <Button
            onClick={goToEditOpinion}
            title="Edytuj opinie"
            type="primary"
          />
        )}
        <Button
          styles={{ marginLeft: "auto" }}
          onClick={goBack}
          title="Powrót"
          type="default"
        />
      </div>
    </div>
  );
};
