import ClearIcon from "@mui/icons-material/Clear";
import { getFormattedHour } from "helpers/helpers";
import { useNavigate } from "react-router-dom";
import "./Walk.scss";

type WalkType = {
  id: number;
  dateStart: string;
  dateEnd: string;
  isOwner?: boolean;
  dogAvatar1?: string;
  dogAvatar2?: string;
  dogAvatar3?: string;
  openRemoveSlotHandler?: (
    startWalk: string,
    endWalk: string,
    id: number
  ) => void;
};
export const Walk = ({
  dateStart,
  id,
  dateEnd,
  dogAvatar1,
  dogAvatar2,
  dogAvatar3,
  isOwner,
  openRemoveSlotHandler,
}: WalkType) => {
  const navigate = useNavigate();

  const goToWalkInfo = () => navigate(`/walk-info/${id}`);

  const removeSlotHandler = () =>
    openRemoveSlotHandler && openRemoveSlotHandler(dateStart, dateEnd, id);

  return (
    <div className="walk">
      {isOwner && (
        <ClearIcon onClick={removeSlotHandler} className="walk__delete-icon" />
      )}
      <div className="walk__content" onClick={goToWalkInfo}>
        <span>
          {getFormattedHour(dateStart)} - {getFormattedHour(dateEnd)}
        </span>
        <div className="walk__avatars">
          {dogAvatar1 ? (
            <img className="walk__avatar" src={dogAvatar1} alt="dog1" />
          ) : (
            <div className="walk__avatar">Wolny slot</div>
          )}
          {dogAvatar2 ? (
            <img className="walk__avatar" src={dogAvatar2} alt="dog2" />
          ) : (
            <div className="walk__avatar">Wolny slot</div>
          )}
          {dogAvatar3 ? (
            <img className="walk__avatar" src={dogAvatar3} alt="dog3" />
          ) : (
            <div className="walk__avatar">Wolny slot</div>
          )}
        </div>
      </div>
    </div>
  );
};
