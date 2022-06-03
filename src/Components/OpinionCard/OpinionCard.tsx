import funnyDog from "assets/funny.png";
import normalDog from "assets/normal.png";
import angryDog from "assets/angry.png";
import lovelyDog from "assets/lovely.png";
import { Rating } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import userAvatarDefault from "assets/user-avatar.png";
import { Button } from "Components";
import useAuthContext from "hooks/context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./OpinionCard.scss";
import { capitalizeFirstLetter } from "helpers/helpers";

type OpinionCardProps = {
  opinionId: number;
  points: number;
  review: string;
  userAvatarAlt?: string;
  client?: number;
  type?: string;
  userAvatar?: string;
  openDeleteOpinionModal: (opinionId: number) => void;
};

export const OpinionCard = ({
  opinionId,
  points,
  review,
  type,
  client,
  userAvatarAlt,
  userAvatar,
  openDeleteOpinionModal,
}: OpinionCardProps) => {
  const { userId } = useAuthContext();
  const navigate = useNavigate();

  const switchToEditOpinion = () =>
    navigate(`/trainer-opinion-edit/${opinionId}`);

  const switchToOpinion = () =>
    type
      ? navigate(`/dog-opinion/${opinionId}`)
      : navigate(`/trainer-opinion/${opinionId}`);

  const deleteOpinionHandler = () => openDeleteOpinionModal(opinionId);

  const getIcon = (type: string) => {
    if (type === "spokojny") {
      return normalDog;
    }
    if (type === "zabawny") {
      return funnyDog;
    }
    if (type === "trudny") {
      return angryDog;
    }
    if (type === "kochany") {
      return lovelyDog;
    }
  };

  return (
    <div className="opinion-card">
      {client === +`${userId}` && (
        <ClearIcon
          onClick={deleteOpinionHandler}
          className="opinion-card__delete-icon"
        />
      )}
      <div className="opinion-card__info" onClick={switchToOpinion}>
        <img
          className="opinion-card__imageUser"
          src={userAvatar || userAvatarDefault}
          alt={userAvatarAlt}
        />
        <div className="opinion-card__rating">
          <div className="opinion-card__rating">
            {type ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <img height={30} src={getIcon(type)} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {capitalizeFirstLetter(type)}
                </span>
              </div>
            ) : (
              <Rating name="Read-Rating" value={points} />
            )}
          </div>
          <div className="opinion-card__opinion">{review}</div>
        </div>
      </div>
      {client === +`${userId}` && (
        <Button
          styles={{
            width: "auto",
            paddingRight: "15px",
            paddingLeft: "15px",
            marginLeft: "auto",
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
          }}
          size="M"
          onClick={switchToEditOpinion}
          title="Edytuj"
          type="primary"
        />
      )}
    </div>
  );
};
