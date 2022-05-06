import axios from "axios";
import { useMutation } from "react-query";

type UseAddDogToSlotPayloadType = {
  slotId?: string;
  dogId: string;
  index: number;
};

export const useAddDogToSlot = (onSuccess?: () => void) => {
  const addDogToSlot = ({
    slotId,
    dogId,
    index,
  }: UseAddDogToSlotPayloadType) => {
    const getPayload = (id: string) => {
      if (index === 0) {
        return { dog1: id };
      } else if (index === 1) {
        return { dog2: id };
      }

      return { dog3: id };
    };
    return axios.patch(
      `http://127.0.0.1:8000/api/slot/${slotId}/`,
      getPayload(dogId)
    );
  };

  const { mutate, isLoading } = useMutation(addDogToSlot, { onSuccess });

  return { mutate, isLoading };
};
