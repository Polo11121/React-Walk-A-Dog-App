import axios from "axios";
import { useMutation } from "react-query";

type UseAddWalkLocationPayloadType = {
  slot: number;
  lat: number;
  lng: number;
};

export const UseAddWalkLocation = () => {
  const addWalkLocation = ({ slot, lat, lng }: UseAddWalkLocationPayloadType) =>
    axios.post(`http://127.0.0.1:8000/api/walk/`, {
      slot,
      lat,
      lng,
    });

  const { mutateAsync, isLoading } = useMutation(addWalkLocation);

  return { mutateAsync, isLoading };
};
