import axios from "axios";
import { useQuery } from "react-query";

type UseGetWalkLocation = {
  walkLocation: { slot: number; lat: number; lng: number };
  isLoading: boolean;
};

export const useGetWalkLocation = (slotId?: number): UseGetWalkLocation => {
  const getWalkLocation = () =>
    axios
      .get(`http://146.59.16.195:8000/api/walk/`)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading } = useQuery("walks", getWalkLocation, {
    enabled: Boolean(slotId),
  });

  return {
    walkLocation: data?.find(({ slot }: { slot: number }) => slot === slotId),
    isLoading,
  };
};
