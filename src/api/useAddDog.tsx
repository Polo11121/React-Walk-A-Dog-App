import axios from "axios";
import { useMutation } from "react-query";

type UseAddDogPayloadType = {
  name: string;
  owner: number;
  age: number;
  breed: string;
  weight: number;
  avatar: File;
};

export const useAddDog = (onSuccess?: () => void) => {
  const addDog = ({
    name,
    owner,
    age,
    breed,
    weight,
    avatar,
  }: UseAddDogPayloadType) => {
    const formData = new FormData();
    avatar && formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("owner", `${owner}`);
    formData.append("age", `${age}`);
    formData.append("weight", `${weight}`);
    formData.append("breed", `${breed}`);
    formData.append("contraindications", "");
    formData.append("recommendation", "");

    return axios.post(`http://146.59.16.195:8000/api/dog/`, formData);
  };

  const { mutate, isLoading } = useMutation(addDog, { onSuccess });

  return { mutate, isLoading };
};
