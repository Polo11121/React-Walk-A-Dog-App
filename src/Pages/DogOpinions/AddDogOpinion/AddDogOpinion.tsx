import funnyDog from "assets/funny.png";
import normalDog from "assets/normal.png";
import angryDog from "assets/angry.png";
import lovelyDog from "assets/lovely.png";
import { Button } from "Components";
import { useParams, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useQueryClient } from "react-query";
import { useCustomToast } from "hooks/useCustomToast";
import { useGetSlots } from "api/useGetSlots";
import { useState } from "react";
import useAuthContext from "hooks/context/AuthContext";
import userAvatar from "assets/user-avatar.png";
import { useGetDog } from "api/useGetDog";
import { useAddDogOpinion } from "api/useAddDogOpinion";
import "./AddDogOpinion.scss";

export const AddDogOpinion = () => {
  const queryClient = useQueryClient();
  const [type, setType] = useState<null | string>(null);
  const { id } = useParams();
  const { userInfo } = useAuthContext();
  const { userId } = useAuthContext();
  const { dog } = useGetDog(id);
  const navigate = useNavigate();
  const { slots } = useGetSlots();

  const trainerWalks = slots?.filter(
    ({ trainer, status }) => id && trainer === +id && status === "zakończony"
  );
  const countWalk = trainerWalks?.length;

  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries("dog-opinions"); // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Dodano opinie!");
    goBack();
  };

  const { mutate } = useAddDogOpinion(onSuccess);

  const addOpinion = () =>
    mutate({
      raport: value,
      dog: +`${id}`,
      type,
      trainer: userInfo.is_trainer ? +`${id}` : null,
      client: !userInfo.is_trainer ? +`${userId}` : null,
    });

  const goBack = () => navigate(`/dog-opinions/${id}`);

  return (
    <div className="dog-add-opinion">
      <div className="dog-add-opinion__title">Dodaj opinie</div>
      <div className="dog-add-opinion__trainerInfo">
        <img
          className="dog-add-opinion__imageUser"
          src={dog?.avatar || userAvatar}
          alt={dog?.name}
        />
        <div className="dog-add-opinion__info">
          <div>{dog?.name}</div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            {dog?.breed}
          </div>
          <div>spacery: {countWalk}</div>
        </div>
      </div>
      <div className="dog-add-opinion__icons">
        <div
          onClick={() => setType("zabawny")}
          className="dog-add-opinion__icon-container"
        >
          <img src={funnyDog} height={50} alt="zabawny" />
          <span style={type === "zabawny" ? { color: "#8fe388" } : {}}>
            Zabawny
          </span>
        </div>
        <div
          onClick={() => setType("kochany")}
          className="dog-add-opinion__icon-container"
        >
          <img src={lovelyDog} height={50} alt="kochany" />
          <span style={type === "kochany" ? { color: "#8fe388" } : {}}>
            Kochany
          </span>
        </div>
        <div
          onClick={() => setType("spokojny")}
          className="dog-add-opinion__icon-container"
        >
          <img src={normalDog} height={50} alt="spokojny" />
          <span style={type === "spokojny" ? { color: "#8fe388" } : {}}>
            Spokojny
          </span>
        </div>
        <div
          onClick={() => setType("trudny")}
          className="dog-add-opinion__icon-container"
        >
          <img src={angryDog} height={50} alt="trudny" />
          <span style={type === "trudny" ? { color: "#8fe388" } : {}}>
            Trudny
          </span>
        </div>
      </div>
      <TextField
        className="dog-add-opinion__review"
        id="TextFieldOpinion"
        multiline
        rows={15}
        onChange={handleChange}
      />
      <div className="dog-add-opinion__buttons">
        {
          <Button
            onClick={addOpinion}
            disabled={!value.trim() || type === null}
            title="Dodaj opinie"
            type="primary"
          />
        }
        <Button onClick={goBack} title="Powrót" type="default" />
      </div>
    </div>
  );
};

export default AddDogOpinion;
