import { useState } from "react";
import { Formik } from "formik";
import { Button } from "../../Components/Button/Button";
import { Input } from "../../Components/Input/Input";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "./registerSchema";
import { useRegister } from "../../api/useRegister";
import "./Register.scss";
import ErrorText from "../../Components/ErrorText/ErrorText";

export const Register = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const navigate = useNavigate();

  const onEror = () => setRegisterError(true);

  const { mutateAsync, isLoading } = useRegister(onEror);

  const switchToLoginPageHandler = () => navigate("/login");

  return (
    <div className="register">
      <div className="register__container">
        <Formik
          onSubmit={({ password, userName, email }) => {
            mutateAsync({ email, userName, password }).then(() =>
              setIsOpen(true)
            );
          }}
          validationSchema={registerSchema}
          validateOnMount
          initialValues={{
            userName: "",
            password: "",
            repeatPassword: "",
            email: "",
          }}
        >
          {(props) => (
            <>
              <Input
                isError={inputError}
                formikProps={props}
                inputName="userName"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Nazwa użytkownika"
              />
              <Input
                isError={inputError}
                type="password"
                inputName="password"
                formikProps={props}
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Hasło"
              />
              <Input
                type="password"
                isError={inputError}
                formikProps={props}
                inputName="repeatPassword"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Powtórz Hasło"
              />
              <Input
                isError={inputError}
                formikProps={props}
                inputName="email"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Email"
              />
              <ErrorText
                styles={{ marginBottom: "0.5rem", textAlign: "center" }}
                isError={registerError}
                text="Zajęty email lub nazwa użytkownika"
              />
              <div className="register__buttons">
                <Button
                  onClick={() => {
                    setInputError(
                      Boolean(
                        props.errors.email ||
                          props.errors.password ||
                          props.errors.repeatPassword ||
                          props.errors.userName
                      )
                    );
                    props.handleSubmit();
                  }}
                  disabled={isLoading}
                  styles={{ marginBottom: "1.5rem" }}
                  title="ZAREJESTRUJ"
                  type="primary"
                  size="XL"
                />
                <Button
                  onClick={switchToLoginPageHandler}
                  title="Mam już konto"
                  type="default"
                  size="M"
                />
              </div>
            </>
          )}
        </Formik>
      </div>
      {isOpen && (
        <div className="register__modal">
          <div className="register__modal-content">
            Zarejestrowano pomyślenie. Teraz możesz się zalogować i zacząć
            przygodę z Walk A Dog
            <Button
              styles={{ margin: "20px auto 0", width: "80%" }}
              onClick={switchToLoginPageHandler}
              title="Zaloguj"
              type="primary"
              size="L"
            />
          </div>
        </div>
      )}
    </div>
  );
};
