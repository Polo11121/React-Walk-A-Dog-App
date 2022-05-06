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
