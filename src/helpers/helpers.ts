export const formatter = new Intl.DateTimeFormat("pl", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const addOneHourToTime = (time: string) => {
  const result = +time.slice(0, 2) + 1 + time.slice(2);

  return result.length === 5 ? result : 0 + result;
};

export const isWeekend = (date: Date) =>
  date.getDay() === 6 || date.getDay() === 0;

export const padTo2Digits = (num: number) => num.toString().padStart(2, "0");

export const getFormattedDate = (date: Date) =>
  date.getFullYear() +
  "-" +
  padTo2Digits(date.getMonth() + 1) +
  "-" +
  padTo2Digits(date.getDate());

export const getFormattedHour = (time: string) => time.slice(0, 5);

export const getActualTime = (date: Date) => {
  const today = new Date();

  return date > today
    ? false
    : padTo2Digits(today.getHours()) + ":" + padTo2Digits(today.getMinutes());
};

export const isToday = (someDate: Date) => {
  const today = new Date();

  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

export const isInThePast = (date: Date) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return date < today;
};

export const isTodayInThePastTime = (date: Date, time: string) => {
  const today = new Date();

  if (isToday(date)) {
    return (
      today.getHours() + "" + today.getMinutes() >
      time.toString().slice(0, 5).split(":").join("")
    );
  }

  return false;
};

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
