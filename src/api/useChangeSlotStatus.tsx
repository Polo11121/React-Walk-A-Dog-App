import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

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
      `${config.API_URL}/api/slot/${id}/`,
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
