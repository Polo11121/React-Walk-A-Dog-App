import "./DogCard.scss";

type DogCardProps = {
  imageSrc: string;
  name: string;
  race: string;
};
export const DogCard = ({ imageSrc, name, race }: DogCardProps) => {
  return (
    <div className="dog-card">
      <img className="dog-card__image" src={imageSrc} alt={name} />
      <div className="dog-card__info">
        <span className="dog-card__name">{name}</span>
        <span className="dog-card__race">{race}</span>
      </div>
    </div>
  );
};
