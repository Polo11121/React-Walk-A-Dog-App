import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

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
    axios.post(`${config.API_URL}/api/slot/`, {
      trainer,
      date,
      time_from,
      time_to,
    });

  const { mutate, isLoading } = useMutation(addSlot, { onSuccess });

  return { mutate, isLoading };
};
