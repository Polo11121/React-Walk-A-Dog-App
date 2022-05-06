import { useState } from "react";
import Calendar from "react-calendar";
import { useGetSlots } from "api/useGetSlots";
import { WalksList } from "Pages/TrainerInfo/WalksList/WalksList";
import { useParams } from "react-router-dom";
import { useGetUser } from "api/useGetUser";
import { getFormattedDate } from "helpers/helpers";
import "react-calendar/dist/Calendar.css";

export const TrainerWalks = () => {
  const params = useParams();
  const { user } = useGetUser(params.id);
  const { slots } = useGetSlots();
  const [date, setDate] = useState(new Date());
  const [showWalksList, setShowWalksList] = useState(false);

  const chooseDateHandler = (e: Date) => {
    setDate(e);
    setShowWalksList(true);
  };

  const goBackHandler = () => setShowWalksList(false);

  return (
    <div>
      {showWalksList ? (
        <WalksList
          slots={slots.filter(
            ({ trainer, date: slotDate }) =>
              trainer === user.id && slotDate === getFormattedDate(date)
          )}
          goBackHandler={goBackHandler}
          date={date}
        />
      ) : (
        <Calendar onChange={chooseDateHandler} value={date} />
      )}
    </div>
  );
};
