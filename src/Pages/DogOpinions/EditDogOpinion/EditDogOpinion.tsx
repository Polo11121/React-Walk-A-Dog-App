import { useEffect, useState } from "react";
import funnyDog from "assets/funny.png";
import normalDog from "assets/normal.png";
import angryDog from "assets/angry.png";
import lovelyDog from "assets/lovely.png";
import { Button, WithLoader } from "Components";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { useGetSlots } from "api/useGetSlots";
import { useGoBack } from "hooks/useGoBack";
import useAuthContext from "hooks/context/AuthContext";
import userAvatar from "assets/user-avatar.png";
import { useGetDog } from "api/useGetDog";
import { useGetDogOpinion } from "api/useGetDogOpinion";
import { useCustomToast } from "hooks/useCustomToast";
import { useEditDogOpinion } from "api/useEditDogOpinion";
import { useQueryClient } from "react-query";
import "./EditDogOpinion.scss";

export const EditDogOpinion = () => {
  const queryClient = useQueryClient();
  const goBack = useGoBack();
  const { userId } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { opinion, isLoading: isDogOpinionLoading } = useGetDogOpinion(id);
  const { dog, isLoading: isDogLoading } = useGetDog(`${opinion?.dog}`);
  const { slots, isLoading: isSlotLoading } = useGetSlots();
  const [type, setType] = useState(opinion?.type);
  const [raport, setRaport] = useState(opinion?.raport);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaport(event.target.value);
  };

  const dogWalks = slots?.filter(
    ({ trainer, status }) =>
      opinion?.dog && trainer === +opinion?.dog && status === "zakończony"
  );

  const isLoading = isDogOpinionLoading || isDogLoading || isSlotLoading;

  useEffect(() => {
    if (
      !isLoading &&
      userId &&
      opinion?.client !== +userId &&
      opinion?.trainer !== +userId
    ) {
      navigate(`/user-profile/${userId}`);
    }

    if (opinion) {
      setRaport(opinion?.raport);
      setType(opinion?.type);
    }
  }, [opinion, isLoading]);

  const onSuccess = () => {
    queryClient
      .invalidateQueries(["dog-opinion", `${id}`])
      .then(() => navigate(`/dog-opinions/${opinion?.dog}`)); // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Zedytowano opinie!");
  };

  const { mutate } = useEditDogOpinion(onSuccess);

  const editOpinion = () =>
    mutate({
      id: `${id}`,
      raport,
      type,
    });

  const countWalk = dogWalks?.length;

  const isDisabled = raport === opinion?.raport && type === opinion?.type;

  return (
    <div className="edit-dog-opinion">
      <WithLoader isLoading={isLoading}>
        <>
          <div className="edit-dog-opinion__title">Opinia</div>
          <div className="edit-dog-opinion__trainerInfo">
            <img
              className="edit-dog-opinion__imageUser"
              src={dog?.avatar || userAvatar}
              alt={dog?.name}
            />
            <div className="edit-dog-opinion__info">
              <div>{dog?.name}</div>
              <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                {dog?.breed}
              </div>
              <div>spacery: {countWalk}</div>
            </div>
          </div>
          <div className="edit-dog-opinion__icons">
            <div
              onClick={() => setType("zabawny")}
              className="edit-dog-opinion__icon-container"
            >
              <img src={funnyDog} height={50} alt="zabawny" />
              <span style={type === "zabawny" ? { color: "#8fe388" } : {}}>
                Zabawny
              </span>
            </div>
            <div
              onClick={() => setType("kochany")}
              className="edit-dog-opinion__icon-container"
            >
              <img src={lovelyDog} height={50} alt="kochany" />
              <span style={type === "kochany" ? { color: "#8fe388" } : {}}>
                Kochany
              </span>
            </div>
            <div
              onClick={() => setType("spokojny")}
              className="edit-dog-opinion__icon-container"
            >
              <img src={normalDog} height={50} alt="spokojny" />
              <span style={type === "spokojny" ? { color: "#8fe388" } : {}}>
                Spokojny
              </span>
            </div>
            <div
              onClick={() => setType("trudny")}
              className="edit-dog-opinion__icon-container"
            >
              <img src={angryDog} height={50} alt="trudny" />
              <span style={type === "trudny" ? { color: "#8fe388" } : {}}>
                Trudny
              </span>
            </div>
          </div>
          <TextField
            value={raport}
            onChange={handleChange}
            className="edit-dog-opinion__review"
            id="TextFieldOpinion"
            multiline
            rows={15}
          />
          <div className="edit-dog-opinion__buttons">
            {userId &&
              (opinion?.client === +userId || opinion?.trainer === +userId) && (
                <Button
                  disabled={isDisabled}
                  onClick={editOpinion}
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
        </>
      </WithLoader>
    </div>
  );
};

export default EditDogOpinion;
