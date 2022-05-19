import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

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
      `${config.API_URL}/api/dog/${id}/`,
      type === "recommendation"
        ? {
            recommendation: value.trim(),
          }
        : { contraindications: value.trim() }
    );

  const { mutate, isLoading } = useMutation(editDogRecommendations, {
    onSuccess,
  });

  return { mutate, isLoading };
};
