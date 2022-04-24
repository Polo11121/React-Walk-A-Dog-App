import { useState } from "react";
import { Formik } from "formik";
import { Button } from "../../Components/Button/Button";
import { Input } from "../../Components/Input/Input";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "./registerSchema";
import { useRegister } from "../../api/useRegister";
import "./Register.scss";

export const Register = () => {
  const { mutateAsync, isLoading } = useRegister();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
                isError={error}
                formikProps={props}
                inputName="userName"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Nazwa użytkownika"
              />
              <Input
                isError={error}
                type="password"
                inputName="password"
                formikProps={props}
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Hasło"
              />
              <Input
                type="password"
                isError={error}
                formikProps={props}
                inputName="repeatPassword"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Powtórz Hasło"
              />
              <Input
                isError={error}
                formikProps={props}
                inputName="email"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Email"
              />
              <div className="register__buttons">
                <Button
                  onClick={() => {
                    setError(
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
