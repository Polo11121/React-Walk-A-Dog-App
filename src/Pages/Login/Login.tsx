import { useState } from "react";
import { Formik } from "formik";
import { Button } from "../../Components/Button/Button";
import { Input } from "../../Components/Input/Input";
import { useNavigate } from "react-router-dom";
import ErrorText from "../../Components/ErrorText/ErrorText";
import { useLogin } from "../../api/useLogin";
import useAuthContext from "../../hooks/AuthContext";
import "./Login.scss";

export const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuthContext();

  const switchToRegisterPageHandler = () => navigate("/register");

  const switchToForgotPassword = () => navigate("/forgot-password");

  const onSuccess = ({ data }: { data: any }) =>
    loginUser({ access: data.access, refresh: data.refresh });

  const { mutate, isLoading } = useLogin(onSuccess);

  return (
    <div className="login">
      <div className="login__container">
        <Formik
          onSubmit={({ password, userName }) => {
            if (!password || !userName) {
              setError(true);
              return;
            }
            mutate({ userName, password });
          }}
          initialValues={{ userName: "", password: "" }}
        >
          {(props) => (
            <>
              <Input
                formikProps={props}
                inputName="userName"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Nazwa użytkownika"
              />
              <Input
                type="password"
                inputName="password"
                formikProps={props}
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Hasło"
              />
              <ErrorText
                styles={{ marginBottom: "0.5rem", textAlign: "center" }}
                isError={error}
                text="Błędna nazwa użytkownika lub hasło"
              />
              <div className="login__buttons">
                <Button
                  disabled={isLoading}
                  onClick={props.handleSubmit}
                  styles={{
                    marginBottom: "1.5rem",
                  }}
                  title="ZALOGUJ"
                  type="primary"
                  size="XL"
                />
                <Button
                  onClick={switchToRegisterPageHandler}
                  title="Nie mam konta"
                  type="default"
                  size="M"
                />
              </div>
            </>
          )}
        </Formik>
        <span
          onClick={switchToForgotPassword}
          className="login__forgot-password"
        >
          Zapomniałem hasła
        </span>
      </div>
    </div>
  );
};
