import { useMutation } from "react-query";
import axios from "axios";

type EditDogRecommendationsPayload = {
  id: string;
  type: "recommendation" | "contraindications";
  value: string;
};

export const useEditDogRecommendations = (onSuccess: () => void) => {
  const editDogRecommendations = ({
    id,
    type,
    value,
  }: EditDogRecommendationsPayload) =>
    axios.patch(
      `http://127.0.0.1:8000/api/dog/${id}/`,
      type === "recommendation"
        ? {
            recommendation: value,
          }
        : { contraindications: value }
    );

  const { mutate, isLoading } = useMutation(editDogRecommendations);

  return { mutate, isLoading };
};
