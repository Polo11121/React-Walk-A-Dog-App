import * as yup from "yup";

export const registerSchema = yup.object({
  userName: yup
    .string()
    .trim()
    .required("Podaj nazwe użytkownika")
    .max(12, "Maksymalnie 12 znaków"),
  password: yup
    .string()
    .trim()
    .required("Podaj hasło")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Hasło powinno zawierać min. 8 znaków, zawierać małe i duże litery, cyfrę oraz znak specjalny"
    ),
  repeatPassword: yup
    .string()
    .trim()
    .required("Powtórz hasło")
    .oneOf([yup.ref("password"), null], "Hasła muszą być jednakowe"),
  email: yup
    .string()
    .trim()
    .required("Podaj adres email")
    .email("Nieprawidłowy adres email"),
});
