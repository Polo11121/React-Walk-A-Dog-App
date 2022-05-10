import dogAvatar from "assets/logo.png";
import userAvatar from "assets/user-avatar.png";
import { getFormattedHour } from "helpers/helpers";
import { Link } from "react-router-dom";
import "./CardWalk.scss";

type CardWalkProps = {
  dogAvatarSrc: string;
  id: number;
  dogName: string;
  trainerAvatar: string;
  trainerName: string;
  date: string;
  time_from: string;
  time_to: string;
};
export const CardWalk = ({
  dogAvatarSrc,
  trainerAvatar,
  dogName,
  id,
  date,
  time_from,
  time_to,
  trainerName,
}: CardWalkProps) => {
  return (
    <Link to={`/walk-info/${id}`}>
      <div className="card-walk">
        <img
          className="card-walk__image"
          src={dogAvatarSrc || dogAvatar}
          alt={dogName}
        />
        <div className="card-walk__trainer-info">
          <span>Trener:</span>
          <div className="card-walk__trainer">
            <img
              className="card-walk__trainer-avatar"
              src={trainerAvatar || userAvatar}
              alt={trainerName}
            />
            <span>{trainerName}</span>
          </div>
        </div>
        <div className="card-walk__info">
          <span>Data:</span>
          <span> {date}</span>
          <span>
            {getFormattedHour(time_from)} - {getFormattedHour(time_to)}
          </span>
        </div>
      </div>
    </Link>
  );
};
