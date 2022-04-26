import EditIcon from "@mui/icons-material/Edit";
import { DogCard, Button } from "Components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserDogs } from "api/useGetUserDogs";
import "./DogProfiles.scss";

export const DogProfiles = () => {
  const { id } = useParams();
  const { dogs } = useGetUserDogs(id);
  const navigate = useNavigate();

  const switchToAddDog = () => navigate("/add-dog");

  return (
    <div className="dog-profiles">
      <div className="dog-profiles__title">Psie profile</div>
      <div className="dog-profiles__list">
        {dogs?.map(({ name, breed, avatar_url, id }) => (
          <DogCard
            id={id}
            key={id}
            name={name}
            race={breed}
            imageSrc={avatar_url}
          />
        ))}
      </div>
      <div className="dog-profiles__add-button">
        <Button
          styles={{
            marginLeft: "auto",
            marginBottom: "40px",
          }}
          onClick={switchToAddDog}
          Icon={<EditIcon />}
          size="M"
          title="Dodaj profil"
          type="default"
        />
      </div>
    </div>
  );
};
