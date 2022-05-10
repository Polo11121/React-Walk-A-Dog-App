import axios from "axios";
import { useMutation } from "react-query";

export const useChangeSlotStatus = (onSuccess?: () => void) => {
  const changeSlotStatus = ({
    status,
    id,
    time_from,
    time_to,
  }: {
    status: "nie rozpoczęty" | "w trakcie" | "zakończony";
    id?: string;
    time_from?: string;
    time_to?: string;
  }) =>
    axios.patch(
      `http://127.0.0.1:8000/api/slot/${id}/`,
      time_from
        ? {
            status,
            time_from,
            time_to,
          }
        : { status }
    );

  const { mutate, isLoading } = useMutation(changeSlotStatus, { onSuccess });

  return { mutate, isLoading };
};
