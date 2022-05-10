import Calendar from "react-calendar";
import { useGetSlots } from "api/useGetSlots";
import { WalksList } from "Pages/TrainerInfo/WalksList/WalksList";
import { useParams } from "react-router-dom";
import { useGetUser } from "api/useGetUser";
import { getFormattedDate } from "helpers/helpers";
import useWalksContext from "hooks/context/WalksContext";
import "react-calendar/dist/Calendar.css";

export const TrainerWalks = () => {
  const {
    showWalksList,
    goBackHandler,
    walkListDate,
    chooseWalkListDateHandler,
  } = useWalksContext();
  const params = useParams();
  const { user } = useGetUser(params.id);
  const { slots } = useGetSlots();

  const slotDates = slots
    ?.filter(({ trainer, date: slotDate }) => trainer === user.id)
    .map(({ date }) => new Date(date).toDateString());

  return (
    <div>
      {showWalksList ? (
        <WalksList
          slots={slots?.filter(
            ({ trainer, date: slotDate }) =>
              trainer === user.id && slotDate === getFormattedDate(walkListDate)
          )}
          goBackHandler={goBackHandler}
          date={walkListDate}
        />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Calendar
            tileClassName={({ date }) =>
              slotDates?.includes(date.toDateString())
                ? "react-calendar__tile--slots"
                : null
            }
            onChange={chooseWalkListDateHandler}
            value={walkListDate}
          />
        </div>
      )}
    </div>
  );
};
