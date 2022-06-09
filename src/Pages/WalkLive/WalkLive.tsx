import { useEffect, useState } from "react";
import userAvatar from "assets/user-avatar.png";
import map from "assets/map.png";
import { useGoBack } from "hooks/useGoBack";
import { useGetSlot } from "api/useGetSlot";
import { useNavigate, useParams } from "react-router-dom";
import dogAvatar from "assets/logo.png";
import { useGetUser } from "api/useGetUser";
import { useGetDogs } from "api/useGetDogs";
import { useQueryClient } from "react-query";
import GoogleMapReact from "google-map-react";
import useAuthContext from "hooks/context/AuthContext";
import { DogType } from "types/Dog.types";
import { getFormattedHour } from "helpers/helpers";
import { Button, MapAvatar, WithLoader } from "Components";
import { useCustomToast } from "hooks/useCustomToast";
import { useChangeSlotStatus } from "api/useChangeSlotStatus";
import { useGetWalkLocation } from "api/useGetWalkLocation";
import "./WalkLive.scss";

export const WalkLive = () => {
  const navigate = useNavigate();
  const { stopWalk } = useAuthContext();
  const { id } = useParams();
  const { userId } = useAuthContext();
  const { slot, isLoading: isSlotLoading } = useGetSlot(id);
  const { walkLocation } = useGetWalkLocation(slot?.id);
  const { user, isLoading: isUserLoading } = useGetUser(`${slot?.trainer}`);
  const { dogs, isLoading: isDogsLoading } = useGetDogs();
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [dogsInfo, setDogsInfo] = useState<
    {
      id: string;
      name: string;
      avatar: string;
      isAdded: boolean;
      owner: string;
    }[]
  >();

  const queryClient = useQueryClient();

  const openMapHandler = () => setIsMapOpen(true);

  const goBack = useGoBack();

  const getFilteredDog = (filteredDog: DogType | undefined) =>
    filteredDog
      ? {
          id: `${filteredDog.id}`,
          avatar: filteredDog.avatar,
          name: filteredDog.name,
          isAdded: true,
          owner: `${filteredDog.owner}`,
        }
      : {
          id: "",
          avatar: "",
          name: "",
          isAdded: false,
          owner: "",
        };

  useEffect(() => {
    if (dogs && slot) {
      const filteredDog1 = dogs.find(({ id }) => id === slot.dog1);

      const filteredDog2 = dogs.find(({ id }) => id === slot.dog2);

      const filteredDog3 = dogs.find(({ id }) => id === slot.dog3);
      if (
        userId &&
        +userId !== slot?.trainer &&
        +userId !== filteredDog1?.owner &&
        +userId !== filteredDog2?.owner &&
        +userId !== filteredDog3?.owner
      ) {
        navigate(`/user-profile/${userId}`);
      }
      setDogsInfo([
        getFilteredDog(filteredDog1),
        getFilteredDog(filteredDog2),
        getFilteredDog(filteredDog3),
      ]);
    }
  }, [dogs, slot]);

  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries("walks");
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const onSuccessChangeSlotStatus = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Zakończono spacer!");
    queryClient.invalidateQueries(["slot", id]);
    navigate(`/walk-info/${slot?.id}`);
  };

  const { mutate: changeSlotStatus } = useChangeSlotStatus(
    onSuccessChangeSlotStatus
  );

  const endWalkHandler = () => {
    stopWalk();
    changeSlotStatus({ id: `${slot?.id}`, status: "zakończony" });
  };

  const goToTrainer = () => navigate(`/user-profile/${slot?.trainer}`);

  const goToDog1 = () =>
    dogsInfo &&
    navigate(`/dog-profile/${dogsInfo[0].owner}/${dogsInfo[0].owner}`);
  const goToDog2 = () =>
    dogsInfo &&
    navigate(`/dog-profile/${dogsInfo[1].owner}/${dogsInfo[1].owner}`);
  const goToDog3 = () =>
    dogsInfo &&
    navigate(`/dog-profile/${dogsInfo[2].owner}/${dogsInfo[2].owner}`);

  const isLoading = isDogsLoading || isUserLoading || isSlotLoading;

  return (
    <div className="walk-live">
      <WithLoader isLoading={isLoading}>
        <>
          <div className="walk-live__title">Podgląd</div>
          <div
            onClick={goToTrainer}
            style={{ marginBottom: "10px" }}
            className="walk-live__box"
          >
            <img
              className="walk-live__avatar"
              src={user?.avatar || userAvatar}
              alt={user?.username}
            />
            <span>{user?.username}</span>
          </div>
          <div className="walk-live__avatars">
            {dogsInfo && dogsInfo[0]?.id && (
              <div onClick={goToDog1} className="walk-live__box">
                <img
                  className="walk-live__avatar"
                  src={(dogsInfo && dogsInfo[0]?.avatar) || dogAvatar}
                  alt={dogsInfo && dogsInfo[0]?.name}
                />
                <span>{dogsInfo[0]?.name}</span>
              </div>
            )}
            {dogsInfo && dogsInfo[1]?.id && (
              <div onClick={goToDog2} className="walk-live__box">
                <img
                  className="walk-live__avatar"
                  src={(dogsInfo && dogsInfo[1]?.avatar) || dogAvatar}
                  alt={dogsInfo && dogsInfo[1]?.name}
                />
                <span>{dogsInfo[1]?.name}</span>
              </div>
            )}
            {dogsInfo && dogsInfo[2]?.id && (
              <div onClick={goToDog3} className="walk-live__box">
                <img
                  className="walk-live__avatar"
                  src={(dogsInfo && dogsInfo[2]?.avatar) || dogAvatar}
                  alt={dogsInfo && dogsInfo[2]?.name}
                />
                <span>{dogsInfo[2]?.name}</span>
              </div>
            )}
          </div>
          <div className="walk-live__time">{slot?.date}</div>
          <div className="walk-live__time" style={{ marginTop: "0" }}>
            W trakcie: {slot?.time_from && getFormattedHour(slot?.time_from)} -{" "}
            {slot?.time_to && getFormattedHour(slot?.time_to)}
          </div>
          {isMapOpen && walkLocation ? (
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyALjeUJOIthg6G-Yk6dJnOjaWd5Y9CjkVg",
              }}
              defaultCenter={{ lat: walkLocation.lat, lng: walkLocation.lng }}
              defaultZoom={25}
            >
              <MapAvatar
                lat={walkLocation.lat}
                lng={walkLocation.lng}
                avatarSrc={user?.avatar}
              />
            </GoogleMapReact>
          ) : (
            <div className="walk-live__map">
              <div className="walk-live__map-content">
                <img
                  onClick={openMapHandler}
                  className="walk-live__map-icon"
                  src={map}
                  alt=""
                />
                <h1 className="walk-live__map-text">Mapa</h1>
              </div>
            </div>
          )}
          {userId === (slot?.trainer as unknown as string) && (
            <Button
              styles={{ margin: " 0  auto 40px" }}
              onClick={endWalkHandler}
              size="XL"
              title="Zakończ"
              type="primary"
            />
          )}
          <div style={{ width: "90%" }}>
            <Button
              styles={{ marginLeft: "auto", marginBottom: "40px" }}
              size="M"
              onClick={goBack}
              title="Powrót"
              type="default"
            />
          </div>
        </>
      </WithLoader>
    </div>
  );
};
