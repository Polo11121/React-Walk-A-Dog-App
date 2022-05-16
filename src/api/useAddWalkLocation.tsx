import axios from "axios";
import { useMutation } from "react-query";

type UseAddWalkLocationPayloadType = {
  slot: number;
  lat: number;
  lng: number;
};

export const UseAddWalkLocation = () => {
  const addWalkLocation = ({ slot, lat, lng }: UseAddWalkLocationPayloadType) =>
    axios.post(`http://146.59.16.195:8000/api/walk/`, {
      slot,
      lat,
      lng,
    });

  const { mutateAsync, isLoading } = useMutation(addWalkLocation);

  return { mutateAsync, isLoading };
};
