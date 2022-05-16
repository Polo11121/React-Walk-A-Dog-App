import axios from "axios";
import { useMutation } from "react-query";

type UseRemoveDogFromSlotPayloadType = {
  slotId?: string;
  index: number;
};

export const useRemoveDogFromSlot = (onSuccess?: () => void) => {
  const removeDogFromSlot = ({
    slotId,
    index,
  }: UseRemoveDogFromSlotPayloadType) => {
    const getPayload = () => {
      if (index === 0) {
        return { dog1: null };
      } else if (index === 1) {
        return { dog2: null };
      }
      return { dog3: null };
    };

    return axios.patch(
      `http://146.59.16.195:8000/api/slot/${slotId}/`,
      getPayload()
    );
  };

  const { mutate, isLoading } = useMutation(removeDogFromSlot, { onSuccess });

  return { mutate, isLoading };
};
