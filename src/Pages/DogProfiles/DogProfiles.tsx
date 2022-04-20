import { Button } from "../../Components/Button/Button";
import { DogCard } from "../../Components/DogCard/DogCard";
import EditIcon from "@mui/icons-material/Edit";
import "./DogProfiles.scss";

export const DogProfiles = () => {
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
      <Button
        styles={{ width: "140px", marginLeft: "auto", marginTop: "1rem" }}
        Icon={<EditIcon />}
        size="S"
        title="Dodaj profil"
        type="default"
      />
    </div>
  );
};
