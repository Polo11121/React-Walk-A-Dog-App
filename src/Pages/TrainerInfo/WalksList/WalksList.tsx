import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TimePicker, { TimePickerValue } from "react-time-picker";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { useGetUser } from "api/useGetUser";
import {
  addOneHourToTime,
  formatter,
  getActualTime,
  getFormattedDate,
  getFormattedHour,
  isInThePast,
  isWeekend,
} from "helpers/helpers";
import { useAddSlot } from "api/userAddSlot";
import { useOwner } from "hooks/useOwner";
import { useParams } from "react-router-dom";
import { Walk } from "Pages/TrainerInfo/Walk/Walk";
import { useQueryClient } from "react-query";
import { Button, ErrorText, Modal } from "Components";
import { SlotType } from "types/User.types";
import { useCustomToast } from "hooks/useCustomToast";
import { useDeleteSlot } from "api/useDeleteSlot";
import { useGetDogs } from "api/useGetDogs";
import "./WalksList.scss";

type WalksListType = {
  goBackHandler: () => void;
  date: Date;
  slots: SlotType[];
};

export const WalksList = ({ goBackHandler, date, slots }: WalksListType) => {
  const queryClient = useQueryClient();
  const { dogs } = useGetDogs();
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [removeSlotInfo, setRemoveSlotInfo] = useState({
    isOpen: false,
    id: 0,
    startWalk: "",
    endWalk: "",
  });
  const [startWalk, setStartWalk] = useState("" as TimePickerValue);
  const params = useParams();
  const isOwner = useOwner();
  const { user } = useGetUser(params.id);

  const goBack = () => {
    if (isAddSlotOpen) {
      setStartWalk("");
      setIsAddSlotOpen(false);
    } else {
      goBackHandler();
    }
  };

  const openAddSlotHandler = () => setIsAddSlotOpen(true);

  const openRemoveSlotHandler = (
    startWalk: string,
    endWalk: string,
    id: number
  ) => setRemoveSlotInfo({ isOpen: true, startWalk, endWalk, id });

  const closeRemoveSlotHandler = () =>
    setRemoveSlotInfo({ isOpen: false, startWalk: "", endWalk: "", id: 0 });

  const onSuccess = () => {
    queryClient.invalidateQueries("slots"); // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Utworzono slot spacerowy!");
    setStartWalk("");
    goBack();
  };

  const onSuccessDeleteSlot = () => {
    queryClient.invalidateQueries("slots"); // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Usunięto slot spacerowy!");
    closeRemoveSlotHandler();
  };

  const { mutate } = useAddSlot(onSuccess);

  const { mutate: mutateDeleteSlot } = useDeleteSlot(onSuccessDeleteSlot);

  const deleteSlot = () => mutateDeleteSlot({ id: removeSlotInfo.id });

  const addSlot = () =>
    mutate({
      date: getFormattedDate(date),
      time_from: startWalk,
      time_to: addOneHourToTime(startWalk as string),
      trainer: user.id,
    });

  const isSlotAlreadyExist =
    !!startWalk &&
    slots.some(
      ({ time_from, time_to }) =>
        startWalk.toString().split("-").join("") >=
          getFormattedHour(time_from).split("-").join("") &&
        startWalk.toString().split("-").join("") <
          getFormattedHour(time_to).split("-").join("")
    );

  return (
    <div className="walks-list">
      <div className="walks-list__top-info">
        <IconButton onClick={goBack}>
          <ArrowBackIcon style={{ color: "#8fe388" }} />
        </IconButton>
        {isAddSlotOpen ? (
          <span>Dodaj nowy slot spacerowy na</span>
        ) : (
          <span>
            {isOwner
              ? "Twoje sloty spacerowe na dzień"
              : `Sloty spacerowe ${user.username} na dzień`}
          </span>
        )}
        <span className="walks-list__date">{formatter.format(date)} </span>
      </div>
      {isAddSlotOpen ? (
        <div className="walks-list__form">
          <span className="walks-list__subtitle">
            Godzina rozpoczęcia spaceru
          </span>
          <TimePicker
            minTime={
              getActualTime(date) || (isWeekend(date) ? "09:00:00" : "08:00:00")
            }
            maxTime={isWeekend(date) ? "16:00:00" : "18:00:00"}
            onChange={setStartWalk}
            value={startWalk}
          />
          <span className="walks-list__bold-text" style={{ marginTop: "1rem" }}>
            Czas Spaceru
          </span>
          <span
            className="walks-list__bold-text"
            style={{ marginTop: "0.5rem" }}
          >
            <>
              {startWalk || "?"} -{" "}
              {startWalk ? addOneHourToTime(startWalk as string) : "?"}
            </>
          </span>
          <ErrorText
            styles={{ textAlign: "center" }}
            text="Slot na podaną godzinę już istnieje"
            isError={isSlotAlreadyExist}
          />
          <Button
            styles={{ marginTop: "1rem", width: "200px" }}
            size="L"
            onClick={addSlot}
            title="Dodaj Spacer"
            type="primary"
            disabled={!startWalk || isSlotAlreadyExist}
          />
        </div>
      ) : (
        <>
          <div className="walks-list__content">
            {slots
              .sort(
                (slot1, slot2) =>
                  parseInt(slot1.time_from.slice(0, 2)) -
                  parseInt(slot2.time_from.slice(0, 2))
              )
              .map(({ id, time_from, time_to, dog1, dog2, dog3 }) => (
                <Walk
                  key={id}
                  id={id}
                  dogAvatar1={dogs?.find(({ id }) => id === dog1)?.avatar}
                  dogAvatar2={dogs?.find(({ id }) => id === dog2)?.avatar}
                  dogAvatar3={dogs?.find(({ id }) => id === dog3)?.avatar}
                  openRemoveSlotHandler={openRemoveSlotHandler}
                  isOwner={isOwner && !isInThePast(date)}
                  dateStart={time_from}
                  dateEnd={time_to}
                />
              ))}
          </div>
          {isOwner && slots.length < 5 && !isInThePast(date) && (
            <div
              onClick={openAddSlotHandler}
              style={!slots.length ? { margin: "0 auto" } : {}}
              className="walks-list__add-button"
            >
              <AddIcon />
            </div>
          )}
        </>
      )}
      {removeSlotInfo.isOpen && (
        <Modal>
          <div className="walks-list__modal-content">
            Na pewno chcesz usunąć slot spacerowy na {removeSlotInfo.startWalk}{" "}
            - {removeSlotInfo.endWalk}?
            <Button
              onClick={deleteSlot}
              styles={{ margin: "20px auto 0", width: "80%" }}
              title="Usuń"
              type="red"
              size="L"
            />
            <Button
              styles={{ margin: "20px auto 0", width: "80%" }}
              onClick={closeRemoveSlotHandler}
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
