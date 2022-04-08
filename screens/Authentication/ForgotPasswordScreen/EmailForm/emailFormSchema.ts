import * as yup from "yup";

export const emailFormSchema = yup.object({
  email: yup
    .string()
    .required("Podaj adres email")
    .email("Nieprawidłowy adres email"),
});
