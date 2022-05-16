import axios from "axios";
import { useMutation } from "react-query";

type UseAddDogPayloadType = {
  id: string;
  name: string;
  age: number;
  breed: string;
  weight: number;
  avatar: File;
};

export const useEditDog = (onSuccess?: () => void) => {
  const editDog = ({
    id,
    name,
    age,
    breed,
    weight,
    avatar,
  }: UseAddDogPayloadType) => {
    const formData = new FormData();
    avatar && formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("age", `${age}`);
    formData.append("weight", `${weight}`);
    formData.append("breed", `${breed}`);

    return axios.patch(`http://146.59.16.195:8000/api/dog/${id}/`, formData);
  };

  const { mutate, isLoading } = useMutation(editDog, { onSuccess });

  return { mutate, isLoading };
};
