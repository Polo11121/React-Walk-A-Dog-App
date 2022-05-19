import axios from "axios";
import { useQuery } from "react-query";
import { SlotType } from "types/User.types";
import config from "config.json";

type UseGetSlotsType = {
  slots: SlotType[];
  isLoading: boolean;
};

export const useGetSlots = (): UseGetSlotsType => {
  const getSlots = () =>
    axios
      .get(`${config.API_URL}/api/slot/`)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading } = useQuery("slots", getSlots);

  return { slots: data, isLoading };
};
