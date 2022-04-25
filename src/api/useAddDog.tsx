import axios from "axios";
import { useMutation } from "react-query";

type UseAddDogPayloadType = {
  name: string;
  owner: number;
  age: number;
  breed: string;
  weight: number;
  avatar_url: string;
};

export const useAddDog = (onSuccess?: () => void) => {
  const addDog = ({
    name,
    owner,
    age,
    breed,
    weight,
    avatar_url,
  }: UseAddDogPayloadType) =>
    axios.post(`http://127.0.0.1:8000/api/dog/`, {
      name,
      owner,
      age,
      breed,
      weight,
      recommendation: "dasdas",
      contraindications: "dasda",
      avatar_url,
    });

  const { mutate, isLoading } = useMutation(addDog, { onSuccess });

  return { mutate, isLoading };
};
