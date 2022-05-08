import { useState } from "react";
import { Formik } from "formik";
import { Button, Input, Modal } from "Components";
import { useGoBack } from "hooks/useGoBack";
import { changePasswordSchema } from "Pages/ChangePassword/changePasswordSchema";
import { useChangePassword } from "api/useChangePassword";
import { useCustomToast } from "hooks/useCustomToast";
import "./ChangePassword.scss";

export const ChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const goBack = useGoBack();

  const onSuccess = () => setIsOpen(true);

  const onError = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Nieprawiłowe stare hasło !", true);
    setError(true);
  };

  const { mutate, isLoading } = useChangePassword(onSuccess, onError);

  return (
    <div className="change-password">
      <div className="change-password__container">
        <Formik
          onSubmit={({ oldPassword, newPassword }) => {
            mutate({ oldPassword, newPassword });
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
                  disabled={
                    (Boolean(
                      props.errors.oldPassword ||
                        props.errors.repeatNewPassword ||
                        props.errors.newPassword
                    ) &&
                      error) ||
                    isLoading
                  }
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
        <Modal>
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
        </Modal>
      )}
    </div>
  );
};
