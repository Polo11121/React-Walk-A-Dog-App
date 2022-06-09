import { useState } from "react";
import useAuthContext from "hooks/context/AuthContext";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { ErrorText, Button, Input } from "Components";
import { useLogin } from "api/useLogin";
import { useCustomToast } from "hooks/useCustomToast";
import "./Login.scss";

export const Login = () => {
  const [error, setError] = useState(false);
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();

  const switchToRegisterPageHandler = () => navigate("/register");

  const switchToForgotPassword = () => navigate("/forgot-password");

  const onError = () => setError(true);

  const onSuccess = ({ data }: { data: any }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast(`Witaj ${data.user.username}!`);
    loginUser({ access: data.access, refresh: data.refresh });
    navigate(`/user-profile/${data.user.id}`);
  };

  const { mutate, isLoading } = useLogin(onSuccess, onError);

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
                label="Nazwa użytkownika"
                formikProps={props}
                inputName="userName"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Wpisz nazwe użytkownika..."
              />
              <Input
                label="Hasło"
                type="password"
                inputName="password"
                formikProps={props}
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Wpisz hasło..."
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
