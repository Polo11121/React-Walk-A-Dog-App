import axios from "axios";
import { useQuery } from "react-query";
import { SlotType } from "types/User.types";

type UseGetSlotType = {
  slot: SlotType;
  isLoading: boolean;
};
export const useGetSlot = (id?: string): UseGetSlotType => {
  const getSlot = () =>
    axios
      .get(`http://146.59.16.195:8000/api/slot/${id}/`)
      .then((resp) => resp.data);

  const { data, isLoading } = useQuery(["slot", id], getSlot);

  return { slot: data, isLoading };
};