import axios from "axios";
import { useQuery } from "react-query";
import config from "config.json";

type UseGetWalkLocation = {
  walkLocation: { slot: number; lat: number; lng: number };
  isLoading: boolean;
};

export const useGetWalkLocation = (slotId?: number): UseGetWalkLocation => {
  const getWalkLocation = () =>
    axios
      .get(`${config.API_URL}/api/walk/`)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));

  const { data, isLoading } = useQuery("walks", getWalkLocation, {
    retry: 1,
    useErrorBoundary: true,
    enabled: Boolean(slotId),
  });

  return {
    walkLocation: data?.find(({ slot }: { slot: number }) => slot === slotId),
    isLoading,
  };
};
