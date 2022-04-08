import * as yup from "yup";

export const changePasswordSchema = yup.object({
  password: yup
    .string()
    .required("Podaj hasło")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Hasło powinno zawierać min. 8 znaków, zawierać małe i duże litery, cyfrę oraz znak specjalny"
    ),
  repeatPassword: yup
    .string()
    .required("Powtórz hasło")
    .oneOf([yup.ref("password"), null], "Hasła muszą być jednakowe"),
  oldPassword: yup.string().required("Podaj stare hasło"),
});
