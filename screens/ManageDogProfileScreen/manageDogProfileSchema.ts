import * as yup from "yup";

export const manageDogSchema = yup.object({
  dogName: yup.string().required("Podaj imię psa"),
  dogRace: yup.string().required("Podaj rasę psa"),
  dogDate: yup
    .string()
    .required("Podaj datę urodzenia psa ")
    .matches(
      /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
      "Podaj datę urodzeniaw formacie yyyy-mm--dd"
    ),
  dogWeight: yup
    .number()
    .typeError("Nieprawidłowa waga psa")
    .required("Podaj wagę psa")
    .positive("Nieprawidłowa waga psa"),
});
