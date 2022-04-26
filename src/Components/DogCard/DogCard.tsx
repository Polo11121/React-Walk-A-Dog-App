import { Link } from "react-router-dom";
import "./DogCard.scss";

type DogCardProps = {
  imageSrc: string;
  name: string;
  race: string;
  id: number;
};
export const DogCard = ({ imageSrc, name, race, id }: DogCardProps) => {
  return (
    <Link to={`/dog-profile/${id}`}>
      <div className="dog-card">
        <img
          className="dog-card__image"
          src={`http://127.0.0.1:8000${imageSrc}`}
          alt={name}
        />
        <div className="dog-card__info">
          <span className="dog-card__name">{name}</span>
          <span className="dog-card__race">{race}</span>
        </div>
      </div>
    </Link>
  );
};
