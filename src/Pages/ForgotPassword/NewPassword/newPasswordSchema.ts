import * as yup from "yup";

export const newPasswordSchema = yup.object({
  oldPassword: yup.string().trim().required("Podaj stare hasło"),
  newPassword: yup
    .string()
    .trim()
    .required("Podaj nowe hasło")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Hasło powinno zawierać min. 8 znaków, zawierać małe i duże litery, cyfrę oraz znak specjalny"
    ),
  repeatNewPassword: yup
    .string()
    .trim()
    .required("Powtórz nowe hasło")
    .oneOf([yup.ref("newPassword"), null], "Hasła muszą być jednakowe"),
});
