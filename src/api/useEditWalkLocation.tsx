import axios from "axios";
import { useMutation } from "react-query";

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
    axios.patch(`http://127.0.0.1:8000/api/walk/${slot}/`, {
      lat,
      lng,
    });

  const { mutate, isLoading } = useMutation(addEditLocation);

  return { mutate, isLoading };
};
