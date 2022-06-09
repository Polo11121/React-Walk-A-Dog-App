import funnyDog from "assets/funny.png";
import normalDog from "assets/normal.png";
import angryDog from "assets/angry.png";
import lovelyDog from "assets/lovely.png";
import { Button } from "Components";
import { useParams, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useGetSlots } from "api/useGetSlots";
import { useGoBack } from "hooks/useGoBack";
import useAuthContext from "hooks/context/AuthContext";
import userAvatar from "assets/user-avatar.png";
import { useGetDog } from "api/useGetDog";
import { useGetDogOpinion } from "api/useGetDogOpinion";
import "./DogOpinion.scss";

export const DogOpinion = () => {
  const { userId } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const { opinion } = useGetDogOpinion(id);
  const { dog } = useGetDog(`${opinion?.dog}`);
  const goBack = useGoBack();
  const { slots } = useGetSlots();

  const switchToEditDogOpinion = () => navigate(`/dog-opinion-edit/${id}`);

  const dogWalks = slots?.filter(
    ({ trainer, status }) =>
      opinion?.dog && trainer === +opinion?.dog && status === "zakończony"
  );
  const countWalk = dogWalks?.length;

  return (
    <div className="dog-opinion">
      <div className="dog-opinion__title">Szczegóły opinii</div>
      <div className="dog-opinion__trainerInfo">
        <img
          className="dog-opinion__imageUser"
          src={dog?.avatar || userAvatar}
          alt={dog?.name}
        />
        <div className="dog-opinion__info">
          <div>{dog?.name}</div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            {dog?.breed}
          </div>
          <div>spacery: {countWalk}</div>
        </div>
      </div>
      <div className="dog-opinion__icons">
        <div className="dog-opinion__icon-container">
          <img src={funnyDog} height={50} alt="zabawny" />
          <span style={opinion?.type === "zabawny" ? { color: "#8fe388" } : {}}>
            Zabawny
          </span>
        </div>
        <div className="dog-opinion__icon-container">
          <img src={lovelyDog} height={50} alt="kochany" />
          <span style={opinion?.type === "kochany" ? { color: "#8fe388" } : {}}>
            Kochany
          </span>
        </div>
        <div className="dog-opinion__icon-container">
          <img src={normalDog} height={50} alt="spokojny" />
          <span
            style={opinion?.type === "spokojny" ? { color: "#8fe388" } : {}}
          >
            Spokojny
          </span>
        </div>
        <div className="dog-opinion__icon-container">
          <img src={angryDog} height={50} alt="trudny" />
          <span style={opinion?.type === "trudny" ? { color: "#8fe388" } : {}}>
            Trudny
          </span>
        </div>
      </div>
      <TextField
        value={opinion?.raport}
        className="dog-opinion__review"
        id="TextFieldOpinion"
        multiline
        rows={15}
        disabled
      />
      <div className="dog-opinion__buttons">
        {userId &&
          (opinion?.client === +userId || opinion?.trainer === +userId) && (
            <Button
              onClick={switchToEditDogOpinion}
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

export default DogOpinion;
