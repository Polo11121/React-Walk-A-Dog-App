import * as yup from "yup";

export const manageDogProfileSchema = yup.object({
  dogName: yup.string().trim().required("Podaj nazwę psa"),
  race: yup.string().trim().required("Podaj rasę psa"),
  age: yup
    .string()
    .trim()
    .required("Podaj wiek psa")
    .test("Is positive?", "Nieprawidłowy wiek psa", (value) =>
      Boolean(value && +value > 0)
    ),
  weight: yup
    .string()
    .trim()
    .required("Podaj wagę psa")
    .test("Is positive?", "Nieprawidłowa waga psa", (value) =>
      Boolean(value && +value > 0)
    ),
});
