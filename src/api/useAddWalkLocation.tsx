import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

type UseAddWalkLocationPayloadType = {
  slot: number;
  lat: number;
  lng: number;
};

export const UseAddWalkLocation = () => {
  const addWalkLocation = ({ slot, lat, lng }: UseAddWalkLocationPayloadType) =>
    axios.post(`${config.API_URL}/api/walk/`, {
      slot,
      lat,
      lng,
    });

  const { mutateAsync, isLoading } = useMutation(addWalkLocation);

  return { mutateAsync, isLoading };
};
