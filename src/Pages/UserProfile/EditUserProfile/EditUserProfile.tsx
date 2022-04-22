import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../Components/Button/Button";
import { Input } from "../../../Components/Input/Input";
import "./EditUserProfile.scss";

export const EditUserProfile = () => {
  const navigate = useNavigate();

  const switchToChangePassword = () => navigate("/change-password");

  const goBack = () => navigate(-1);

  return (
    <div className="edit-user-profile">
      <div className="edit-user-profile__title">Edycja profilu</div>
      <img
        className="edit-user-profile__image"
        src="https://media.discordapp.net/attachments/781826798282735637/966748146443108362/womanPlaceholder.jpg?width=530&height=530"
        alt=""
      />
      <Formik
        onSubmit={(values) => {}}
        validateOnMount
        initialValues={{
          userName: "",
          email: "",
          phoneNumber: "",
        }}
      >
        {(props) => (
          <div className="edit-user-profile__inputs">
            <Button
              styles={{ margin: "1.5rem 0", width: "250px" }}
              size="M"
              title="Zmień zdjęcie profilowe"
              type="primary"
            />
            <Input
              isError={false}
              inputName="userName"
              formikProps={props}
              styles={{ marginBottom: "1.5rem" }}
              placeholder="Nazwa użytkownika"
            />
            <Input
              isError={false}
              formikProps={props}
              inputName="email"
              styles={{ marginBottom: "1.5rem" }}
              placeholder="Email"
            />
            <Input
              isError={false}
              formikProps={props}
              inputName="phoneNumber"
              styles={{ marginBottom: "1.5rem" }}
              placeholder="Numer telefonu"
            />
          </div>
        )}
      </Formik>
      <div className="edit-user-profile__buttons">
        <Button
          styles={{ width: "140px" }}
          size="M"
          onClick={switchToChangePassword}
          title="Zapisz"
          type="primary"
        />
        <Button
          styles={{ width: "140px" }}
          size="M"
          onClick={goBack}
          title="Anuluj"
          type="primary"
        />
      </div>
    </div>
  );
};
