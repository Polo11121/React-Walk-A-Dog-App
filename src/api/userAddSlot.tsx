import axios from "axios";
import { useMutation } from "react-query";

type UseAddSlotPayloadType = {
  trainer: number;
  date: Date | string;
  time_from: Date | string;
  time_to: string;
};

export const useAddSlot = (onSuccess?: () => void) => {
  const addSlot = ({
    trainer,
    date,
    time_from,
    time_to,
  }: UseAddSlotPayloadType) =>
    axios.post(`http://146.59.16.195:8000/api/slot/`, {
      trainer,
      date,
      time_from,
      time_to,
    });

  const { mutate, isLoading } = useMutation(addSlot, { onSuccess });

  return { mutate, isLoading };
};
