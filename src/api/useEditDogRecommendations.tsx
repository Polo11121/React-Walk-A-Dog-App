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
      `http://146.59.16.195:8000/api/dog/${id}/`,
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
