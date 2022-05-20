import { Rating } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import userAvatarDefault from "assets/user-avatar.png";
import { Button } from "Components";
import useAuthContext from "hooks/context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./OpinionCard.scss";

type OpinionCardProps = {
  opinionId: number;
  points: number;
  review: string;
  userAvatarAlt?: string;
  client?: number;
  userAvatar?: string;
  openDeleteOpinionModal: (opinionId: number) => void;
};

export const OpinionCard = ({
  opinionId,
  points,
  review,
  client,
  userAvatarAlt,
  userAvatar,
  openDeleteOpinionModal,
}: OpinionCardProps) => {
  const { userId } = useAuthContext();
  const navigate = useNavigate();

  const switchToEditOpinion = () =>
    navigate(`/trainer-opinion-edit/${opinionId}`);

  const switchToOpinion = () => navigate(`/trainer-opinion/${opinionId}`);

  const deleteOpinionHandler = () => openDeleteOpinionModal(opinionId);

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
            <Rating name="Read-Rating" value={points} />
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
