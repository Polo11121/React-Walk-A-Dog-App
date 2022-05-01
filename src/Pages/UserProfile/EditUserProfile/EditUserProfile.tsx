import { useEffect, useState } from "react";
import userAvatar from "assets/user-avatar.png";
import { Formik } from "formik";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { useParams } from "react-router-dom";
import { useEditUser } from "api/useEditUser";
import { useGetUser } from "api/useGetUser";
import { Input, Button } from "Components";
import { editProfileSchema } from "Pages/UserProfile/EditUserProfile/editProfileSchema";
import { useQueryClient } from "react-query";
import { useCustomToast } from "hooks/context/useCustomToast";
import { useGoBack } from "hooks/useGoBack";
import "./EditUserProfile.scss";

export const EditUserProfile = () => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<ImageType>();
  const goBack = useGoBack();
  const { id } = useParams();
  const { user } = useGetUser(id);

  const onChange = (imageList: ImageListType) => {
    if (imageList) {
      setImage(imageList[0]);
    }
  };

  const onSuccess = () => {
    queryClient.invalidateQueries(["user", id]).then(() => goBack());
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast(`Pomyślnie zedytowano profil!`);
  };

  const { mutate, isLoading } = useEditUser(onSuccess);

  useEffect(() => {
    if (user?.avatar) {
      setImage({ data_url: user.avatar });
    } else {
      setImage({ data_url: userAvatar });
    }
  }, [user]);

  return (
    <div className="edit-user-profile">
      <div className="edit-user-profile__title">Edycja profilu</div>
      <img
        className="edit-user-profile__image"
        src={image?.data_url}
        alt={user?.username}
      />
      <Formik
        onSubmit={({ email, phoneNumber, userName }) => {
          if (id && image) {
            mutate({
              id,
              avatar: image.file as File,
              email,
              phone_number: phoneNumber,
              username: userName,
            });
          }
        }}
        validationSchema={editProfileSchema}
        initialValues={{
          userName: user?.username,
          email: user?.email,
          phoneNumber: user?.phone_number,
        }}
      >
        {(props) => {
          const haveValuesChanged =
            JSON.stringify(props.initialValues) !==
              JSON.stringify(props.values) ||
            (image?.data_url !== userAvatar &&
              image?.data_url !== user?.avatar);

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
                  value={[image as ImageType]}
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
