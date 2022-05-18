import { Button } from "Components";
import { useNavigate, useParams } from "react-router-dom";
import { Rating, TextField } from "@mui/material";
import { useAddOpinion } from "api/useAddOpinion";
import { useQueryClient } from "react-query";
import { useCustomToast } from "hooks/useCustomToast";
import { useGetSlots } from "api/useGetSlots";
import { useGoBack } from "hooks/useGoBack";
import { useGetUser } from "api/useGetUser";
import { useState } from "react";
import useAuthContext from "hooks/context/AuthContext";
import userAvatar from "assets/user-avatar.png";
import "./AddOpinion.scss";

export const AddOpinion = () => {
  const queryClient = useQueryClient();
  const [valueRating, setValueRating] = useState<number>(0);
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useGetUser(params.id);
  const { userId } = useAuthContext();
  const goBack = () => navigate(`/trainer-info/${params.id}/opinions`);
  const { slots } = useGetSlots();

  const trainerWalks = slots?.filter(
    ({ trainer, status }) =>
      params.id && trainer === +params.id && status === "zakończony"
  );
  const countWalk = trainerWalks?.length;

  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries("opinions"); // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Dodano opinie!");
    goBack();
  };

  const { mutate } = useAddOpinion(onSuccess);

  const addOpinion = () =>
    mutate({
      points: valueRating,
      review: value,
      trainer: +`${params.id}`,
      client: +`${userId}`,
    });

  return (
    <div className="trainer-addOpinion">
      <div className="trainer-addOpinion__title">Dodaj opinie</div>
      <div className="trainer-addOpinion__trainerInfo">
        <img
          className="trainer-addOpinion__imageUser"
          src={user?.avatar || userAvatar}
          alt={user?.username}
        />
        <div className="trainer-addOpinion__info">
          <div>{user?.username}</div>
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            {user?.is_trainer ? "Trener" : "Użytkownik"}
          </div>
          <div>spacery: {countWalk}</div>
        </div>
      </div>
      <Rating
        className="trainer-addOpinion__rating"
        value={valueRating}
        onChange={(event, newValue) => {
          setValueRating(+`${newValue}`);
        }}
      />
      <TextField
        className="trainer-addOpinion__review"
        id="TextFieldOpinion"
        multiline
        rows={16}
        onChange={handleChange}
      />
      <div className="trainer-addOpinion__buttons">
        {
          <Button
            onClick={addOpinion}
            disabled={!value.trim()}
            title="Dodaj opinie"
            type="primary"
          />
        }
        <Button onClick={goBack} title="Powrót" type="default" />
      </div>
    </div>
  );
};

export default AddOpinion;
