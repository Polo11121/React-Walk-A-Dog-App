import * as yup from "yup";

export const editProfileSchema = yup.object({
  userName: yup.string().required("Podaj nazwe użytkownika"),
  email: yup
    .string()
    .required("Podaj adres email")
    .email("Nieprawidłowy adres email"),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Nieprawiłowy numer telefonu"
    )
    .nullable(),
});
