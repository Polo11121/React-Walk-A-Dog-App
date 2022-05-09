import axios from "axios";
import { useQuery } from "react-query";
import { SlotType } from "types/User.types";

type UseGetSlotsType = {
  slots: SlotType[];
  isLoading: boolean;
};

export const useGetSlots = (): UseGetSlotsType => {
  const getSlots = () =>
    axios
      .get("http://127.0.0.1:8000/api/slot/")
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading } = useQuery("slots", getSlots);

  return { slots: data, isLoading };
};
