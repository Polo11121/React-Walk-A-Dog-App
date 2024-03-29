import DatePicker, { registerLocale } from "react-datepicker";
import TimePicker from "react-time-picker";
import { Walk } from "Pages/TrainerInfo/Walk/Walk";
import {
  getFormattedDate,
  getFormattedHour,
  isInThePast,
  isTodayInThePastTime,
} from "helpers/helpers";
import { useGetDogs } from "api/useGetDogs";
import { useGetSlots } from "api/useGetSlots";
import pl from "date-fns/locale/pl";
import useWalksContext from "hooks/context/WalksContext";
import "react-datepicker/dist/react-datepicker.css";
import "./Walks.scss";
import { EmptyList, WithLoader } from "Components";

registerLocale("pl", pl);

export const Walks = () => {
  const { walkDate, walkTime, changeDateHandler, changeTimeHandler } =
    useWalksContext();
  const { dogs, isLoading: isDogsLoading } = useGetDogs();
  const { slots, isLoading: isSlotsLoading } = useGetSlots();

  const isLoading = isDogsLoading || isSlotsLoading;
  return (
    <div className="walks">
      <div className="walks__title">Spacery</div>
      <div className="walks__inputs">
        <div style={{ flex: 0.5 }}>
          <span>Data:</span>
          <DatePicker
            dateFormat="d MMMM yyyy "
            minDate={new Date()}
            locale="pl"
            selected={walkDate}
            onChange={changeDateHandler}
          />
        </div>
        <div
          style={{
            flex: 0.5,
          }}
        >
          <span>Godzina:</span>
          <TimePicker onChange={changeTimeHandler} value={walkTime} />
        </div>
      </div>
      <div className="walks__list">
        <WithLoader isLoading={isLoading}>
          <EmptyList>
            {slots
              ?.filter(
                ({ date: slotDate, time_from, dog1, dog2, dog3, status }) => {
                  return (
                    slotDate === getFormattedDate(walkDate) &&
                    +getFormattedHour(time_from).split(":").join("") >=
                      +walkTime?.toString().split(":").join("") &&
                    (!dog1 || !dog2 || !dog3) &&
                    !isInThePast(new Date(slotDate)) &&
                    !isTodayInThePastTime(new Date(slotDate), time_from) &&
                    status === "nie rozpoczęty"
                  );
                }
              )
              ?.sort(
                (slot1, slot2) =>
                  parseInt(slot1.time_from.slice(0, 2)) -
                  parseInt(slot2.time_from.slice(0, 2))
              )
              ?.reverse()
              .map(({ id, time_from, time_to, dog1, dog2, dog3, status }) => (
                <Walk
                  status={status}
                  key={id}
                  id={id}
                  dogAvatar1={dogs?.find(({ id }) => id === dog1)?.avatar}
                  dogAvatar2={dogs?.find(({ id }) => id === dog2)?.avatar}
                  dogAvatar3={dogs?.find(({ id }) => id === dog3)?.avatar}
                  dateStart={time_from}
                  dateEnd={time_to}
                />
              ))}
          </EmptyList>
        </WithLoader>
      </div>
    </div>
  );
};
