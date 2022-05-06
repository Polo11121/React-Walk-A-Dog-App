import { useParams } from "react-router-dom";
import { useGetDog } from "api/useGetDog";
import { Button } from "Components";
import { useGoBack } from "hooks/useGoBack";
import "./DogWalks.scss";

export const DogWalks = () => {
  const { id } = useParams();
  const { dog } = useGetDog(id);
  const goBack = useGoBack();

  return (
    <div className="dog-walks">
      <div className="dog-walks__title">Spacery {dog.name}</div>
      <div className="dog-walks__list"></div>
      <Button
        styles={{
          marginLeft: "auto",
          marginBottom: "40px",
        }}
        onClick={goBack}
        size="M"
        title="Powrót"
        type="default"
      />
    </div>
  );
};
