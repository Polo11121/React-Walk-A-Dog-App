import { useState } from "react";
import { Formik } from "formik";
import { Button } from "../../Components/Button/Button";
import { Input } from "../../Components/Input/Input";
import { changePasswordSchema } from "./changePasswordSchema";
import "./ChangePassword.scss";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const goBack = () => navigate(-1);

  return (
    <div className="change-password">
      <div className="change-password__container">
        <Formik
          onSubmit={(values) => {
            setIsOpen(true);
          }}
          validationSchema={changePasswordSchema}
          validateOnMount
          initialValues={{
            newPassword: "",
            oldPassword: "",
            repeatNewPassword: "",
          }}
        >
          {(props) => (
            <>
              <div className="change-password__title">Zmiana hasła</div>
              <div className="change-password__inputs">
                <Input
                  type="password"
                  isError={error}
                  formikProps={props}
                  inputName="oldPassword"
                  styles={{ marginBottom: "1.5rem" }}
                  placeholder="Stare hasło"
                />
                <Input
                  isError={error}
                  type="password"
                  inputName="newPassword"
                  formikProps={props}
                  styles={{ marginBottom: "1.5rem" }}
                  placeholder="Nowe hasło"
                />
                <Input
                  type="password"
                  isError={error}
                  formikProps={props}
                  inputName="repeatNewPassword"
                  styles={{ marginBottom: "1.5rem" }}
                  placeholder="Powtórz nowe hasło"
                />
              </div>
              <div className="change-password__buttons">
                <Button
                  onClick={() => {
                    setError(
                      Boolean(
                        props.errors.oldPassword ||
                          props.errors.repeatNewPassword ||
                          props.errors.newPassword
                      )
                    );
                    props.handleSubmit();
                  }}
                  styles={{ width: "140px" }}
                  title="Zmień"
                  type="primary"
                  size="M"
                />
                <Button
                  onClick={goBack}
                  styles={{ width: "140px" }}
                  title="Anuluj"
                  type="primary"
                  size="M"
                />
              </div>
            </>
          )}
        </Formik>
      </div>
      {isOpen && (
        <div className="change-password__modal">
          <div className="change-password__modal-content">
            Pomyślnie zmieniono hasło
            <Button
              styles={{ margin: "20px auto 0", width: "80%" }}
              onClick={goBack}
              title="Powrót"
              type="primary"
              size="L"
            />
          </div>
        </div>
      )}
    </div>
  );
};
