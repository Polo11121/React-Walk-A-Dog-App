import axios from "axios";
import { useQuery } from "react-query";
import { SlotType } from "types/User.types";
import config from "config.json";

type UseGetSlotType = {
  slot: SlotType;
  isLoading: boolean;
};
export const useGetSlot = (id?: string): UseGetSlotType => {
  const getSlot = () =>
    axios.get(`${config.API_URL}/api/slot/${id}/`).then((resp) => resp.data);

  const { data, isLoading } = useQuery(["slot", id], getSlot);

  return { slot: data, isLoading };
};
