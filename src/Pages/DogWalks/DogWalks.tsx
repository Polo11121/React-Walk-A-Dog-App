import { useParams } from "react-router-dom";
import { useGetDog } from "api/useGetDog";
import { Button, EmptyList } from "Components";
import { useGoBack } from "hooks/useGoBack";
import { useGetSlots } from "api/useGetSlots";
import { CardWalk } from "Components/CardWalk/CardWalk";
import { useGetUsers } from "api/useGetUsers";
import "./DogWalks.scss";

export const DogWalks = () => {
  const { id } = useParams();
  const { slots } = useGetSlots();
  const { dog } = useGetDog(id);
  const { users } = useGetUsers();
  const goBack = useGoBack();

  return (
    <div className="dog-walks">
      <div className="dog-walks__title">Spacery {dog?.name}</div>
      <div className="dog-walks__list">
        <EmptyList>
          {slots
            ?.sort((dog1, dog2) => {
              if (
                !(
                  new Date(dog2?.date).getTime() -
                  new Date(dog1?.date).getTime()
                )
              ) {
                return (
                  +dog2?.time_from.split(":").join("") -
                  +dog1?.time_from.split(":").join("")
                );
              }
              return (
                new Date(dog2?.date).getTime() - new Date(dog1?.date).getTime()
              );
            })
            ?.filter(
              ({ dog1, dog2, dog3, status }) =>
                id &&
                (dog1 === +id || dog2 === +id || dog3 === +id) &&
                (status === "zakończony" || status === "w trakcie")
            )
            .map(({ time_from, time_to, date, trainer, id, status }) => {
              const walkTrianer = users?.find(({ id }) => id === trainer);

              return (
                <CardWalk
                  id={id}
                  status={status}
                  dogAvatarSrc={dog?.avatar}
                  dogName={dog?.name}
                  trainerName={walkTrianer?.username as string}
                  trainerAvatar={walkTrianer?.avatar as string}
                  date={date}
                  time_from={time_from}
                  time_to={time_to}
                />
              );
            })}
        </EmptyList>
      </div>
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
