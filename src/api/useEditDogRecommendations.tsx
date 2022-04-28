import axios from "axios";
import { useMutation } from "react-query";

type UseEditDogRecommendationsPayload = {
  id: string;
  type: "recommendation" | "contraindications";
  value: string;
};

export const useEditDogRecommendations = (onSuccess: () => void) => {
  const editDogRecommendations = ({
    id,
    type,
    value,
  }: UseEditDogRecommendationsPayload) =>
    axios.patch(
      `http://127.0.0.1:8000/api/dog/${id}/`,
      type === "recommendation"
        ? {
            recommendation: value,
          }
        : { contraindications: value }
    );

  const { mutate, isLoading } = useMutation(editDogRecommendations, {
    onSuccess,
  });

  return { mutate, isLoading };
};
