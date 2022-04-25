import axios from "axios";
import { useMutation } from "react-query";

type UseAddDogPayloadType = {
  id: string;
  name: string;
  age: number;
  breed: string;
  weight: number;
  avatar_url: string;
};

export const useEditDog = (onSuccess?: () => void) => {
  const editDog = ({
    id,
    name,
    age,
    breed,
    weight,
    avatar_url,
  }: UseAddDogPayloadType) =>
    axios.patch(`http://127.0.0.1:8000/api/dog/${id}/`, {
      name,
      age,
      breed,
      weight,
      avatar_url,
    });

  const { mutate, isLoading } = useMutation(editDog, { onSuccess });

  return { mutate, isLoading };
};
