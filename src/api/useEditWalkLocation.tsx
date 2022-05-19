import axios from "axios";
import { useMutation } from "react-query";
import config from "config.json";

type UseEditWalkLocationPayloadType = {
  slot: number;
  lat: number;
  lng: number;
};

export const UseEditWalkLocation = () => {
  const addEditLocation = ({
    slot,
    lat,
    lng,
  }: UseEditWalkLocationPayloadType) =>
    axios.patch(`${config.API_URL}/api/walk/${slot}/`, {
      lat,
      lng,
    });

  const { mutate, isLoading } = useMutation(addEditLocation);

  return { mutate, isLoading };
};
