import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ImageListType, ImageType } from "react-images-uploading";
import { useAddDog } from "api/useAddDog";
import { useQueryClient } from "react-query";
import useAuthContext from "hooks/context/AuthContext";
import { useGetDog } from "api/useGetDog";
import { useEditDog } from "api/useEditDog";
import { useCustomToast } from "hooks/context/useCustomToast";
import { useDeleteDog } from "api/useDeleteDog";
import "./ManageDogProfile.scss";

export const useManageDogProfile = () => {
  const queryClient = useQueryClient();
  const { subId: id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState<ImageType>();
  const { dog } = useGetDog(id);
  const { userId } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const titlePrefix = pathname.split("-")[0];
  const isEdit = titlePrefix === "/edit";

  const onSuccess = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast(
      isEdit
        ? `Pomyślnie zedytowano profil!`
        : `Pomyślnie utworzono profil psa!`
    );
    queryClient.invalidateQueries(["dog", id]);
    queryClient.invalidateQueries("dogs");

    navigate(`/dog-profiles/${userId}`);
  };

  const onSuccessDeleteDog = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast(`Pomyślnie usunięto profil psa!`);
    queryClient.invalidateQueries("dogs");
    navigate(`/dog-profiles/${userId}`);
  };

  const { mutate: mutateDeleteDog, isLoading: isDeleteDogLoading } =
    useDeleteDog(onSuccessDeleteDog);

  const openDeleteModalHandler = () => setIsOpen(true);
  const closeDeleteModalHandler = () => setIsOpen(false);

  const deleteDogHandler = () => {
    if (id) {
      mutateDeleteDog({ id });
    }
  };

  const { mutate: mutateAddDog, isLoading: isAddDogLoading } =
    useAddDog(onSuccess);

  const { mutate: mutateEditDog, isLoading: isEditDogLoading } =
    useEditDog(onSuccess);

  const changeImageHandler = (imageList: ImageListType) => {
    if (imageList) {
      setImage(imageList[0]);
    }
  };

  useEffect(() => setImage({ data_url: dog?.avatar }), [dog]);

  return {
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
  };
};
