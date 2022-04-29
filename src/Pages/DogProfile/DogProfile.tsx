import EditIcon from "@mui/icons-material/Edit";
import dogAvatar from "assets/logo.png";
import userAvatar from "assets/user-avatar.png";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Button } from "Components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetDog } from "api/useGetDog";
import { useOwner } from "hooks/useOwner";
import { useGetUser } from "api/useGetUser";
import "./DogProfile.scss";

export const DogProfile = () => {
  const { id: ownerId, subId: id } = useParams();
  const { dog } = useGetDog(id);
  const { user } = useGetUser(ownerId);
  const isOwner = useOwner();
  const navigate = useNavigate();

  const switchToManageDogProfile = () =>
    navigate(`/edit-dog/${dog.owner}/${dog.id}`);

  const switchToDogWalks = () => navigate(`/dog-walks/${dog.id}`);

  const switchToManageDogRecommendations = () =>
    navigate(`/dog-recommendations/${dog.owner}/${dog.id}`);

  return (
    <div className="dog-profile">
      <img
        className="dog-profile__image"
        src={dog?.avatar || dogAvatar}
        alt=""
      />
      <div className="dog-profile__name">{dog?.name}</div>
      <div className="dog-profile__section">
        <div className="dog-profile__section-title">
          <div className="dog-profile__line"></div>
          <div>Właściciel</div>
          <div className="dog-profile__line"></div>
        </div>
        <Link
          to={`/user-profile/${ownerId}`}
          className="dog-profile__section-infos"
          style={{ width: "100%" }}
        >
          <div className="dog-profile__owner-info">
            <img
              className="dog-profile__owner-image"
              src={user?.avatar || userAvatar}
              alt={user?.username}
            />
            <div className="dog-profile__section-info-title">
              {user?.username}
            </div>
          </div>
        </Link>
      </div>
      <div className="dog-profile__section">
        <div className="dog-profile__section-title">
          <div className="dog-profile__line"></div>
          <div>Informacje</div>
          <div className="dog-profile__line"></div>
        </div>
        <div className="dog-profile__section-infos">
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Wiek:</div>
            <div>{dog?.age} lata</div>
          </div>
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Rasa:</div>
            <div>{dog?.breed}</div>
          </div>
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Waga:</div>
            <div>{dog?.weight}kg</div>
          </div>
        </div>
      </div>
      <div className="dog-profile__section">
        <div className="dog-profile__section-title">
          <div className="dog-profile__line"></div>
          <div>Spacery</div>
          <div className="dog-profile__line"></div>
        </div>
        <div className="dog-profile__section-infos">
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">
              Liczba spacerów:
            </div>
            <div>12</div>
          </div>
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">
              Pokonana odległość:
            </div>
            <div>69km</div>
          </div>
          <div className="dog-profile__section-info">
            <div className="dog-profile__section-info-title">Łączny czas:</div>
            <div>69h</div>
          </div>
        </div>
      </div>
      <div className="dog-profile__buttons">
        <Button
          styles={{ width: "140px" }}
          size="M"
          onClick={switchToManageDogRecommendations}
          title="Zalecenia"
          type="default"
        />
        {isOwner ? (
          <Button
            styles={{ width: "140px" }}
            Icon={<EditIcon />}
            size="M"
            onClick={switchToManageDogProfile}
            title="Edytuj profil"
            type="default"
          />
        ) : (
          <Button
            styles={{ width: "140px" }}
            size="M"
            Icon={<DirectionsWalkIcon />}
            onClick={switchToDogWalks}
            title="Spacery"
            type="default"
          />
        )}
      </div>
      {isOwner && (
        <Button
          styles={{ width: "140px", marginBottom: "40px" }}
          size="M"
          Icon={<DirectionsWalkIcon />}
          onClick={switchToDogWalks}
          title="Spacery"
          type="default"
        />
      )}
    </div>
  );
};
