import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import { Input } from "../../Components/Input/Input";
import ErrorText from "../../Components/ErrorText/ErrorText";
import "./ForgotPassword.scss";

export const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const switchToNewPassword = () => navigate("/new-password");

  return (
    <div className="forgot-password">
      <div className="forgot-password__container">
        <Formik
          onSubmit={({ email }) => {
            if (!email.length) {
              setError("Podaj Email");
              return;
            }
            if (!email.includes("@")) {
              setError("Nieprawidłowy Email");
              return;
            }
            setError("");
            setIsOpen(true);
          }}
          initialValues={{ email: "" }}
        >
          {(props) => (
            <>
              <Input
                formikProps={props}
                inputName="email"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Adres email"
              />
              <ErrorText
                styles={{ marginBottom: "0.5rem", textAlign: "center" }}
                isError={Boolean(error)}
                text={error}
              />
              <Button
                onClick={props.handleSubmit}
                title="Przypomnij hasło"
                type="primary"
                size="L"
              />
            </>
          )}
        </Formik>
      </div>
      {isOpen && (
        <div className="forgot-password__modal">
          <div className="forgot-password__modal-content">
            Link do zresetowania hasła został wysłany na twojego maila
            <Button
              styles={{ margin: "20px auto 0", width: "80%" }}
              onClick={switchToNewPassword}
              title="Dalej"
              type="primary"
              size="L"
            />
          </div>
        </div>
      )}
    </div>
  );
};
