import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Formik } from "formik";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { Button } from "../../Components/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "../../Components/Input/Input";
import { manageDogProfileSchema } from "./manageDogProfilSchema";
import { useAddDog } from "../../api/useAddDog";
import { useQueryClient } from "react-query";
import useAuthContext from "../../hooks/AuthContext";
import { useGetDog } from "../../api/useGetDog";
import { useEditDog } from "../../api/useEditDog";
import "./ManageDogProfile.scss";

export const ManageDogProfile = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [image, setImage] = useState<ImageType>({
    data_url: "",
  });
  const { dog, isLoading: isDogInfoLoading } = useGetDog(id);
  const { userId } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const titlePrefix = pathname.split("-")[0];
  const isEdit = titlePrefix === "/edit";

  const onSuccess = () => {
    queryClient.invalidateQueries(["dog", id]);
    queryClient.invalidateQueries("dogs");

    navigate(isEdit ? `/dog-profile/${id}` : "/dog-profiles");
  };

  const { mutate: mutateAddDog, isLoading: isAddDogLoading } =
    useAddDog(onSuccess);
  const { mutate: mutateEditDog, isLoading: isEditDogLoading } =
    useEditDog(onSuccess);

  const goBack = () => navigate(-1);

  const onChange = (imageList: ImageListType) => {
    if (imageList) {
      setImage(imageList[0]);
    }
  };

  useEffect(() => {
    if (dog?.avatar_url) {
      setImage({ data_url: dog?.avatar_url });
    }
  }, [dog]);

  return !isDogInfoLoading ? (
    <div className="manage-dog-profile">
      <Formik
        validationSchema={manageDogProfileSchema}
        onSubmit={({ dogName, race, age, weight }) => {
          if (userId) {
            isEdit
              ? mutateEditDog({
                  id: "1",
                  age: +age,
                  avatar_url: image.data_url,
                  breed: race,
                  name: dogName,
                  weight: +weight,
                })
              : mutateAddDog({
                  age: +age,
                  avatar_url: image.data_url,
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
          age: dog?.age || "",
          weight: dog?.weight || "",
        }}
      >
        {(props) => {
          const haveValuesChanged =
            JSON.stringify(props.initialValues) !==
              JSON.stringify(props.values) || image.data_url !== dog.avatar_url;

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
            !haveValuesChanged;

          return (
            <>
              <div className="manage-dog-profile__title">
                {isEdit ? "Edytuj" : "Stwórz"} profil psa
              </div>
              <div className="manage-dog-profile__choose-photo">
                <ImageUploading
                  value={[image]}
                  onChange={onChange}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload }) => (
                    <>
                      <div
                        onClick={onImageUpload}
                        className="manage-dog-profile__choose-photo-container"
                      >
                        {image.data_url ? (
                          <img
                            className="manage-dog-profile__choose-photo-container"
                            src={image.data_url}
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
                  disabled={isEdit ? isButtonDisabledEdit : isButtonDisabledAdd}
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
    </div>
  ) : null;
};
