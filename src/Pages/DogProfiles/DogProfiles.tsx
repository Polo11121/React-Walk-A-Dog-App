import EditIcon from "@mui/icons-material/Edit";
import { Card, Button, EmptyList, WithLoader } from "Components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserDogs } from "api/useGetUserDogs";
import { useOwner } from "hooks/useOwner";
import { useGetUser } from "api/useGetUser";
import { useGoBack } from "hooks/useGoBack";
import "./DogProfiles.scss";

export const DogProfiles = () => {
  const { id } = useParams();
  const { user, isLoading: isUserLoading } = useGetUser(id);
  const { dogs, isLoading: isDogsLoading } = useGetUserDogs(id);
  const goBack = useGoBack();
  const isOwner = useOwner();
  const navigate = useNavigate();

  const switchToAddDog = () => navigate("/add-dog");

  const isLoading = isDogsLoading || isUserLoading;

  return (
    <div className="dog-profiles">
      <div className="dog-profiles__title">
        {isOwner ? "Moje Psie profile" : `Psie profile ${user.username}`}
      </div>
      <div className="dog-profiles__list">
        <WithLoader isLoading={isLoading}>
          <EmptyList>
            {dogs
              ?.sort((dog1, dog2) => dog1?.name.localeCompare(dog2?.name))
              ?.map(({ name, breed, avatar, id, owner }) => (
                <Card
                  ownerId={owner}
                  id={id}
                  key={id}
                  name={name}
                  subTitle={breed}
                  imageSrc={avatar}
                />
              ))}
          </EmptyList>
        </WithLoader>
      </div>
      <div className="dog-profiles__add-button">
        {isOwner ? (
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
        ) : (
          <Button
            styles={{
              marginLeft: "auto",
              marginBottom: "40px",
            }}
            onClick={goBack}
            size="M"
            title="Powrót"
            type="default"
          />
        )}
      </div>
    </div>
  );
};
