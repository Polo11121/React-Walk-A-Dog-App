import { useParams } from "react-router-dom";
import { useGetDog } from "api/useGetDog";
import "./DogWalks.scss";

export const DogWalks = () => {
  const { id } = useParams();
  const { dog } = useGetDog(id);

  return (
    <div className="dog-walks">
      <div className="dog-walks__title">Spacery {dog.name}</div>
    </div>
  );
};
