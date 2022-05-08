import { createContext, ReactNode, useContext, useState } from "react";
import { TimePickerValue } from "react-time-picker";

const today = new Date();

const WalksContext = createContext({
  walkDate: today,
  walkTime: (today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds()) as TimePickerValue,
  changeTimeHandler: (value: TimePickerValue) => {},
  changeDateHandler: (date: Date) => {},
  walkListDate: today,
  chooseWalkListDateHandler: (e: Date) => {},
  goBackHandler: () => {},
  showWalksList: false,
  resetWalkList: () => {},
});

const useWalksContext = () => useContext(WalksContext);

export const WalksProvider = ({ children }: { children: ReactNode }) => {
  const [walkDate, setWalkDate] = useState(today);
  const [walkTime, setWalkTime] = useState(
    (today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds()) as TimePickerValue
  );
  const [walkListDate, setWalkListDate] = useState(new Date());
  const [showWalksList, setShowWalksList] = useState(false);

  const chooseWalkListDateHandler = (e: Date) => {
    setWalkListDate(e);
    setShowWalksList(true);
  };

  const goBackHandler = () => setShowWalksList(false);

  const changeDateHandler = (date: Date) => setWalkDate(date);

  const changeTimeHandler = (value: TimePickerValue) => setWalkTime(value);

  const resetWalkList = () => {
    setWalkListDate(new Date());
    setShowWalksList(false);
  };

  return (
    <WalksContext.Provider
      value={{
        resetWalkList,
        walkListDate,
        chooseWalkListDateHandler,
        goBackHandler,
        showWalksList,
        walkDate,
        walkTime,
        changeTimeHandler,
        changeDateHandler,
      }}
    >
      {children}
    </WalksContext.Provider>
  );
};

export default useWalksContext;
