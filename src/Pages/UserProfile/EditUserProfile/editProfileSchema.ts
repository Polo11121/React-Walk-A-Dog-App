import * as yup from "yup";

export const editProfileSchema = yup.object({
  userName: yup.string().required("Podaj nazwe użytkownika"),
  email: yup
    .string()
    .required("Podaj adres email")
    .email("Nieprawidłowy adres email"),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Nieprawidłowy numer telefonu")
    .length(9, "Nieprawidłowy numer telefonu")
    .nullable(),
});
