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
      .get("http://146.59.16.195:8000/api/slot/")
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading } = useQuery("slots", getSlots);

  return { slots: data, isLoading };
};
