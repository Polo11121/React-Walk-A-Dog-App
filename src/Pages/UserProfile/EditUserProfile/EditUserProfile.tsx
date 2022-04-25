import { Formik } from "formik";
import { useState } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { useNavigate, useParams } from "react-router-dom";
import { useEditUser } from "../../../api/useEditUser";
import { useGetUser } from "../../../api/useGetUser";
import { Button } from "../../../Components/Button/Button";
import { Input } from "../../../Components/Input/Input";
import { editProfileSchema } from "./editProfileSchema";
import { useQueryClient } from "react-query";
import "./EditUserProfile.scss";

export const EditUserProfile = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { user } = useGetUser(id);
  const [image, setImage] = useState<ImageType>({ data_url: user.avatar_url });

  const onChange = (imageList: ImageListType) => {
    if (imageList) {
      setImage(imageList[0]);
    }
  };

  const onSuccess = () => queryClient.invalidateQueries(["user", id]);

  const { mutate, isLoading } = useEditUser(onSuccess);

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="edit-user-profile">
      <div className="edit-user-profile__title">Edycja profilu</div>
      <img className="edit-user-profile__image" src={image.data_url} alt="" />
      <Formik
        onSubmit={({ email, phoneNumber, userName }) => {
          if (id && image.data_url) {
            mutate({
              id,
              avatar_url: image.data_url,
              email,
              phone_number: phoneNumber,
              username: userName,
            });
          }
        }}
        validateOnMount
        validationSchema={editProfileSchema}
        initialValues={{
          userName: user.username,
          email: user.email,
          phoneNumber: user.phone_number,
        }}
      >
        {(props) => {
          const haveValuesChanged =
            JSON.stringify(props.initialValues) !==
              JSON.stringify(props.values) ||
            image.data_url !== user.avatar_url;

          const isButtonDisabled =
            isLoading ||
            !haveValuesChanged ||
            !!(
              props.errors.email ||
              props.errors.phoneNumber ||
              props.errors.userName
            );

          return (
            <>
              <div className="edit-user-profile__inputs">
                <ImageUploading
                  value={[image]}
                  onChange={onChange}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload }) => (
                    <Button
                      onClick={onImageUpload}
                      styles={{ margin: "1.5rem 0", width: "250px" }}
                      size="M"
                      title="Zmień zdjęcie profilowe"
                      type="primary"
                    />
                  )}
                </ImageUploading>
                <Input
                  isError
                  inputName="userName"
                  formikProps={props}
                  styles={{ marginBottom: "1.5rem" }}
                  placeholder="Nazwa użytkownika"
                />
                <Input
                  isError
                  formikProps={props}
                  inputName="email"
                  styles={{ marginBottom: "1.5rem" }}
                  placeholder="Email"
                />
                <Input
                  isError
                  formikProps={props}
                  inputName="phoneNumber"
                  styles={{ marginBottom: "1.5rem" }}
                  placeholder="Numer telefonu"
                />
              </div>
              <div className="edit-user-profile__buttons">
                <Button
                  styles={{ width: "140px" }}
                  size="M"
                  disabled={isButtonDisabled}
                  onClick={props.handleSubmit}
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
            </>
          );
        }}
      </Formik>
    </div>
  );
};
