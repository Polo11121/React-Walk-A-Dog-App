import dogAvatar from "assets/logo.png";
import userAvatar from "assets/user-avatar.png";
import { Link } from "react-router-dom";
import "./Card.scss";

type CardProps = {
  imageSrc: string;
  name: string;
  subTitle: string;
  id: number;
  ownerId?: number;
  isUser?: boolean;
  isActive?: boolean;
};
export const Card = ({
  imageSrc,
  name,
  subTitle,
  id,
  isActive=true,
  ownerId,
  isUser = false,
}: CardProps) => {
  return (
    <Link to={isUser ? `/user-profile/${id}` : `/dog-profile/${ownerId}/${id}`}>
      <div className="dog-card">
        <img
          className="dog-card__image"
          src={imageSrc ? imageSrc : isUser ? userAvatar : dogAvatar}
          alt={name}
        />
        <div className="dog-card__info">
          <span className="dog-card__name">
            {name}
            {!isActive && (
              <span
                style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}
              >
                (Nieaktywny)
              </span>
            )}
          </span>
          <span className="dog-card__race">{subTitle}</span>
        </div>
      </div>
    </Link>
  );
};
