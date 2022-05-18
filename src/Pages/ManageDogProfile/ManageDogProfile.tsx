import AddIcon from "@mui/icons-material/Add";
import ImageUploading, { ImageType } from "react-images-uploading";
import { Button, Modal, Input } from "Components";
import { Formik } from "formik";
import { manageDogProfileSchema } from "Pages/ManageDogProfile/manageDogProfilSchema";
import { useManageDogProfile } from "Pages/ManageDogProfile/useManageDogProfile";
import { useGoBack } from "hooks/useGoBack";
import { CircularProgress } from "@mui/material";
import "./ManageDogProfile.scss";

export const ManageDogProfile = () => {
  const {
    userId,
    isEdit,
    mutateEditDog,
    mutateAddDog,
    dog,
    image,
    isAddDogLoading,
    error,
    isEditDogLoading,
    isDeleteDogLoading,
    changeImageHandler,
    setError,
    openDeleteModalHandler,
    deleteDogHandler,
    closeDeleteModalHandler,
    isOpen,
  } = useManageDogProfile();

  const goBack = useGoBack();

  return (
    <div className="manage-dog-profile">
      {dog?.id || !isEdit ? (
        <Formik
          validationSchema={manageDogProfileSchema}
          onSubmit={({ dogName, race, age, weight }) => {
            if (userId && image) {
              isEdit
                ? mutateEditDog({
                    id: `${dog.id}`,
                    age: +age,
                    avatar: image.file as File,
                    breed: race,
                    name: dogName,
                    weight: +weight,
                  })
                : mutateAddDog({
                    age: +age,
                    avatar: image.file as File,
                    breed: race,
                    name: dogName,
                    weight: +weight,
                    owner: +userId,
                  });
            }
          }}
          validateOnMount
          initialValues={{
            dogName: dog?.name || "",
            race: dog?.breed || "",
            age: dog?.age ? `${dog?.age}` : "",
            weight: dog?.weight ? `${dog?.weight}` : "",
          }}
        >
          {(props) => {
            const haveValuesChanged =
              JSON.stringify(props.initialValues) !==
                JSON.stringify(props.values) || image?.data_url !== dog?.avatar;

            const isButtonDisabledAdd =
              isAddDogLoading ||
              (error &&
                Boolean(
                  props.errors.dogName ||
                    props.errors.weight ||
                    props.errors.age ||
                    props.errors.race
                ));

            const isButtonDisabledEdit =
              isEditDogLoading ||
              Boolean(
                props.errors.dogName ||
                  props.errors.weight ||
                  props.errors.age ||
                  props.errors.race
              ) ||
              !haveValuesChanged ||
              isDeleteDogLoading;

            return (
              <>
                <div className="manage-dog-profile__title">
                  {isEdit ? "Edytuj" : "Stwórz"} profil psa
                </div>
                <div className="manage-dog-profile__choose-photo">
                  <ImageUploading
                    value={[image as ImageType]}
                    onChange={changeImageHandler}
                    dataURLKey="data_url"
                  >
                    {({ onImageUpload }) => (
                      <>
                        <div
                          onClick={onImageUpload}
                          className="manage-dog-profile__choose-photo-container"
                        >
                          {image?.data_url ? (
                            <img
                              className="manage-dog-profile__choose-photo-container"
                              src={image?.data_url}
                              alt="avatar"
                            />
                          ) : (
                            <AddIcon fontSize="large" />
                          )}
                        </div>
                        <div
                          onClick={onImageUpload}
                          className="manage-dog-profile__choose-photo-text"
                        >
                          Dodaj Zdjęcie
                        </div>
                      </>
                    )}
                  </ImageUploading>
                </div>
                <div className="manage-dog-profile__container">
                  <Input
                    isError={isEdit || error}
                    formikProps={props}
                    inputName="dogName"
                    styles={{ marginBottom: "1.5rem" }}
                    placeholder="Nazwa psa"
                  />
                  <Input
                    isError={isEdit || error}
                    formikProps={props}
                    inputName="race"
                    styles={{ marginBottom: "1.5rem" }}
                    placeholder="Rasa"
                  />
                  <Input
                    isError={isEdit || error}
                    inputName="age"
                    formikProps={props}
                    styles={{ marginBottom: "1.5rem" }}
                    placeholder="Wiek (lata)"
                  />
                  <Input
                    isError={isEdit || error}
                    formikProps={props}
                    inputName="weight"
                    styles={{ marginBottom: "1.5rem" }}
                    placeholder="Waga (kg)"
                  />
                </div>
                <div className="manage-dog-profile__buttons">
                  <Button
                    disabled={
                      isEdit ? isButtonDisabledEdit : isButtonDisabledAdd
                    }
                    styles={{ width: "140px" }}
                    onClick={() => {
                      setError(
                        Boolean(
                          props.errors.dogName ||
                            props.errors.weight ||
                            props.errors.age ||
                            props.errors.race
                        )
                      );
                      props.handleSubmit();
                    }}
                    size="M"
                    title="Zapisz"
                    type="default"
                  />
                  <Button
                    styles={{ width: "140px" }}
                    onClick={goBack}
                    size="M"
                    title="Anuluj"
                    type="default"
                  />
                </div>
              </>
            );
          }}
        </Formik>
      ) : (
        <CircularProgress color="success" />
      )}
      {isEdit && (
        <div className="manage-dog-profile__delete-button">
          <Button
            styles={{ width: "140px" }}
            onClick={openDeleteModalHandler}
            size="M"
            title="Usuń"
            type="red"
          />
        </div>
      )}
      {isOpen && (
        <Modal>
          <div className="manage-dog-profile__modal-content">
            Na pewno chcesz usunąć profil psa "{dog.name}"?
            <Button
              onClick={deleteDogHandler}
              styles={{ margin: "20px auto 0", width: "80%" }}
              title="Usuń"
              type="red"
              size="L"
            />
            <Button
              onClick={closeDeleteModalHandler}
              styles={{ margin: "20px auto 0", width: "80%" }}
              title="Anuluj"
              type="green"
              size="L"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};