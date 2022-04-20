import * as yup from "yup";

export const manageDogProfileSchema = yup.object({
  dogName: yup.string().required("Podaj nazwę psa"),
  race: yup.string().required("Podaj rasę psa"),
  age: yup
    .string()
    .required("Podaj wiek psa")
    .test("Is positive?", "Nieprawidłowy wiek psa", (value) =>
      Boolean(value && +value > 0)
    ),
  weight: yup
    .string()
    .required("Podaj wagę psa")
    .test("Is positive?", "Nieprawidłowa waga psa", (value) =>
      Boolean(value && +value > 0)
    ),
});
