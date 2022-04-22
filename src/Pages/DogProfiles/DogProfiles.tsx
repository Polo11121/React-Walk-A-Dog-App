import { Button } from "../../Components/Button/Button";
import { DogCard } from "../../Components/DogCard/DogCard";
import EditIcon from "@mui/icons-material/Edit";
import "./DogProfiles.scss";
import { useNavigate } from "react-router-dom";

export const DogProfiles = () => {
  const navigate = useNavigate();

  const switchToAddDog = () => navigate("/add-dog");

  return (
    <div className="dog-profiles">
      <div className="dog-profiles__title">Psie profile</div>
      <div className="dog-profiles__list">
        <DogCard
          name="Pimpek"
          race="gigaczad"
          imageSrc="https://static.fajnyzwierzak.pl/media/uploads/media_image/original/wpis/472/piesel-shiba-inu.jpg"
        />
        <DogCard
          name="Pimpek"
          race="gigaczad"
          imageSrc="https://static.fajnyzwierzak.pl/media/uploads/media_image/original/wpis/472/piesel-shiba-inu.jpg"
        />
        <DogCard
          name="Pimpek"
          race="gigaczad"
          imageSrc="https://static.fajnyzwierzak.pl/media/uploads/media_image/original/wpis/472/piesel-shiba-inu.jpg"
        />
        <DogCard
          name="Pimpek"
          race="gigaczad"
          imageSrc="https://static.fajnyzwierzak.pl/media/uploads/media_image/original/wpis/472/piesel-shiba-inu.jpg"
        />
        <DogCard
          name="Pimpek"
          race="gigaczad"
          imageSrc="https://static.fajnyzwierzak.pl/media/uploads/media_image/original/wpis/472/piesel-shiba-inu.jpg"
        />
        <DogCard
          name="Pimpek"
          race="gigaczad"
          imageSrc="https://static.fajnyzwierzak.pl/media/uploads/media_image/original/wpis/472/piesel-shiba-inu.jpg"
        />
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
