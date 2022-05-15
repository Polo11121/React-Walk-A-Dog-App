import { useEffect, useState } from "react";
import userAvatar from "assets/user-avatar.png";
import { Button, Modal } from "Components";
import { useGoBack } from "hooks/useGoBack";
import { useGetSlot } from "api/useGetSlot";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFormattedHour,
  isInThePast,
  getActualTime,
  addOneHourToTime,
  isToday,
} from "helpers/helpers";
import { useGetUser } from "api/useGetUser";
import { useGetDogs } from "api/useGetDogs";
import { useRemoveDogFromSlot } from "api/useRemoveDogFromSlot";
import { useCustomToast } from "hooks/useCustomToast";
import { useQueryClient } from "react-query";
import useAuthContext from "hooks/context/AuthContext";
import WalkInfoDog from "Pages/WalkInfo/WalkInfoDog/WalkInfoDog";
import { DogType } from "types/Dog.types";
import { useChangeSlotStatus } from "api/useChangeSlotStatus";
import "./WalkInfo.scss";
import { UseAddWalkLocation } from "api/useAddWalkLocation";

export const WalkInfo = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { startWalk, activeWalk } = useAuthContext();
  const { id } = useParams();
  const { userInfo, userId } = useAuthContext();
  const { slot } = useGetSlot(id);
  const { user } = useGetUser(`${slot?.trainer}`);
  const { dogs } = useGetDogs();
  const [isStartWalkOpen, setIsStartWalkOpen] = useState(false);
  const [removeDogInfo, setRemoveDogInfo] = useState({
    isOpen: false,
    index: 0,
    dogName: "",
  });
  const [dogsInfo, setDogsInfo] = useState<
    {
      id: string;
      name: string;
      avatar: string;
      isAdded: boolean;
      owner: string;
    }[]
  >();

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

      setDogsInfo([
        getFilteredDog(filteredDog1),
        getFilteredDog(filteredDog2),
        getFilteredDog(filteredDog3),
      ]);
    }
  }, [dogs, slot]);

  const goToTrainerProfile = () => navigate(`/user-profile/${slot?.trainer}`);

  const goToWalkLive = () => navigate(`/walk-live/${slot?.id}`);

  const goToTrainerOpinion = () =>
    navigate(`/trainer-opinion-add/${slot?.trainer}`);

  const closeRemoveDogHandler = () =>
    setRemoveDogInfo({ isOpen: false, dogName: "", index: 0 });

  const openRemoveDogHandler = (index: number, dogName: string) =>
    setRemoveDogInfo({ isOpen: true, index, dogName });

  const onSuccess = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Pomyślnie wypisano psa ze spaceru !");
    queryClient.invalidateQueries(["slot", id]);
    closeRemoveDogHandler();
  };

  const { mutateAsync: addWalkLocation } = UseAddWalkLocation();

  const onSuccessChangeSlotStatus = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Rozpoczęto spacer!");
    navigator.geolocation.getCurrentPosition(({ coords }) =>
      addWalkLocation({
        lat: coords.latitude,
        lng: coords.longitude,
        slot: slot?.id,
      }).then((response) => startWalk(`${response.data.id}`))
    );
    queryClient.invalidateQueries(["slot", id]);
    navigate(`/walk-live/${id}`);
  };

  const { mutate } = useRemoveDogFromSlot(onSuccess);

  const { mutate: changeSlotStatus } = useChangeSlotStatus(
    onSuccessChangeSlotStatus
  );

  const startWalkHandler = () => {
    changeSlotStatus({
      status: "w trakcie",
      id,
      time_from: `${getActualTime(new Date(slot?.date))}`,
      time_to: `${addOneHourToTime(`${getActualTime(new Date(slot?.date))}`)}`,
    });
  };

  const removeDogHandler = () =>
    mutate({ index: removeDogInfo.index, slotId: id });

  const openStartWalkHandler = () => setIsStartWalkOpen(true);

  const closeStartWalkHandler = () => setIsStartWalkOpen(false);

  const haveAnyDog = slot?.dog1 || slot?.dog2 || slot?.dog3;

  return (
    <div className="walk-info">
      <div className="walk-info__title">Spacer</div>
      <div className="walk-info__content">
        <div className="walk-info__subtitle">Trener:</div>
        <div onClick={goToTrainerProfile} className="walk-info__box">
          <img
            className="walk-info__avatar"
            src={user?.avatar || userAvatar}
            alt={user?.username}
          />
          <span>{user?.username}</span>
        </div>
        <div className="walk-info__box">
          <div className="walk-info__subtitle">Data: </div>
          {slot?.date &&
            new Intl.DateTimeFormat("pl").format(new Date(slot?.date))}
        </div>
        <div className="walk-info__box">
          <div className="walk-info__subtitle">Godzina: </div>{" "}
          {slot?.time_from && getFormattedHour(slot?.time_from)} -{" "}
          {slot?.time_to && getFormattedHour(slot?.time_to)}
        </div>
        <div className="walk-info__box">
          <div className="walk-info__subtitle">Status: </div> {slot?.status}
        </div>
        <div
          className="walk-info__title"
          style={{ fontSize: "30px", marginTop: "0" }}
        >
          Psy
        </div>
        {dogsInfo?.map((dogInfo, index) => (
          <WalkInfoDog
            status={slot?.status}
            time_from={slot?.time_from}
            date={new Date(slot?.date)}
            openRemoveDogHandler={openRemoveDogHandler}
            isAddingBlocked={
              userInfo?.is_trainer ||
              userInfo?.id === slot?.trainer ||
              slot?.status !== "nie rozpoczęty"
            }
            index={index}
            isOwner={
              dogInfo.owner === `${userInfo?.id}` &&
              !isInThePast(new Date(slot?.date))
            }
            dogsInfo={dogsInfo}
            key={index}
            dogInfo={dogInfo}
            dogs={dogs.filter(
              ({ owner, id: dogId }) =>
                owner === userInfo?.id &&
                id &&
                !dogsInfo.map(({ id }) => id).includes(`${dogId}`)
            )}
            setDogsInfo={setDogsInfo}
          />
        ))}
        {userId &&
          !activeWalk &&
          haveAnyDog &&
          +userId === slot?.trainer &&
          slot?.status === "nie rozpoczęty" &&
          isToday(new Date(slot?.date)) && (
            <Button
              styles={{ margin: "0 auto" }}
              size="XL"
              onClick={openStartWalkHandler}
              title="Rozpocznij"
              type="primary"
            />
          )}
        {slot?.status === "w trakcie" &&
          isToday(new Date(slot?.date)) &&
          userId &&
          (dogsInfo?.map(({ owner }) => owner).includes(`${userId}`) ||
            +userId === slot?.trainer) && (
            <Button
              styles={{ margin: "0 auto" }}
              size="XL"
              onClick={goToWalkLive}
              title="Podgląd"
              type="primary"
            />
          )}
        {slot?.status === "zakończony" &&
          userId &&
          dogsInfo?.map(({ owner }) => owner).includes(`${userId}`) && (
            <Button
              styles={{ margin: "0 auto" }}
              size="XL"
              onClick={goToTrainerOpinion}
              title="Dodaj opinie"
              type="primary"
            />
          )}
      </div>
      <div style={{ width: "90%" }}>
        <Button
          styles={{ marginLeft: "auto", marginBottom: "40px" }}
          size="M"
          onClick={goBack}
          title="Powrót"
          type="default"
        />
      </div>
      {isStartWalkOpen && (
        <Modal>
          <div className="walks-list__modal-content">
            Chcesz rozpocząć spacer o godzinie{"      "}
            {getActualTime(new Date(slot?.date))}
            {" - "}
            {addOneHourToTime(`${getActualTime(new Date(slot?.date))}`)}
            <Button
              styles={{ margin: "20px auto 0", width: "80%" }}
              onClick={startWalkHandler}
              title="Rozpocznij"
              type="green"
              size="L"
            />
            <Button
              styles={{ margin: "20px auto 0", width: "80%" }}
              title="Anuluj"
              onClick={closeStartWalkHandler}
              type="red"
              size="L"
            />
          </div>
        </Modal>
      )}
      {removeDogInfo.isOpen && (
        <Modal>
          <div className="walks-list__modal-content">
            Na pewno chcesz wypisać psa "{removeDogInfo.dogName}" ze spaceru ?
            <Button
              styles={{ margin: "20px auto 0", width: "80%" }}
              title="Wypisz"
              onClick={removeDogHandler}
              type="red"
              size="L"
            />{" "}
            <Button
              styles={{ margin: "20px auto 0", width: "80%" }}
              onClick={closeRemoveDogHandler}
              title="Anuluj"
              type="green"
              size="L"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
