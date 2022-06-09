import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

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
    formData.append("name", name.trim());
    formData.append("owner", `${owner}`);
    formData.append("age", `${age}`);
    formData.append("weight", `${weight}`);
    formData.append("breed", `${breed.trim()}`);
    formData.append("contraindications", "");
    formData.append("recommendation", "");
    formData.append("is_active", true as unknown as string);

    return axios.post(`${config.API_URL}/api/dog/`, formData);
  };

  const { mutate, isLoading } = useMutation(addDog, { onSuccess });

  return { mutate, isLoading };
};
