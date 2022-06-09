import dogAvatar from "assets/logo.png";
import funnyDog from "assets/funny.png";
import normalDog from "assets/normal.png";
import angryDog from "assets/angry.png";
import lovelyDog from "assets/lovely.png";
import { OpinionCard } from "Components/OpinionCard/OpinionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUsers } from "api/useGetUsers";
import { useGetSlots } from "api/useGetSlots";
import { Button, EmptyList, Modal, WithLoader } from "Components";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { useCustomToast } from "hooks/useCustomToast";
import { useGetDog } from "api/useGetDog";
import { useGetDogOpinions } from "api/useGetDogOpinions";
import { useDeleteDogOpinion } from "api/useDeleteDogOpinion";
import "./DogOpinions.scss";
import useAuthContext from "hooks/context/AuthContext";

export const DogOpinions = () => {
  const { userId } = useAuthContext();
  const [deleteOpinionId, setDeleteOpinionId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const { opinions, isLoading: isOpinionsLoading } = useGetDogOpinions();
  const { users, isLoading: isUsersLoading } = useGetUsers();

  const { dog } = useGetDog(id);
  const { slots, isLoading: isSlotsLoading } = useGetSlots();

  const dogWalks = slots?.filter(
    ({ status, dog1, dog2, dog3 }) =>
      id &&
      (+id === dog1 || +id === dog2 || +id === dog3) &&
      status === "zakończony"
  );
  const countWalk = dogWalks?.length;
  const goBack = () => navigate(`/dog-profile/${dog?.owner}/${id}`);
  const dogOpinions = opinions?.filter(({ dog }) => id && dog === +id);

  const openDeleteOpinionModal = (opinionId: number) =>
    setDeleteOpinionId(opinionId);

  const closeDeleteOpinionModal = () => setDeleteOpinionId(null);

  const onSuccess = () => {
    queryClient.invalidateQueries("dog-opinions"); // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Usunięto opinie!");
    closeDeleteOpinionModal();
  };

  const { mutate } = useDeleteDogOpinion(onSuccess);

  const deleteOpinionHandler = () => {
    if (deleteOpinionId) {
      mutate(deleteOpinionId);
    }
  };

  const goToDogProfile = () => navigate(`/dog-profile/${id}`);

  const switchToAddDogOpinion = () => navigate(`/dog-opinion-add/${id}`);

  const isLoading = isOpinionsLoading || isSlotsLoading || isUsersLoading;

  const lovelyCount = dogOpinions?.filter(({ type }) => type === "kochany");
  const funnyCount = dogOpinions?.filter(({ type }) => type === "zabawny");
  const hardCount = dogOpinions?.filter(({ type }) => type === "trudny");
  const calmCount = dogOpinions?.filter(({ type }) => type === "spokojny");

  return (
    <div className="dogs-opinion">
      <WithLoader isLoading={isLoading}>
        <>
          <div className="dogs-opinion__title">Opinie {dog?.name}</div>

          <div className="dogs-opinion__ownerInfo">
            <img
              onClick={goToDogProfile}
              className="dogs-opinion__imageUser"
              src={dog?.avatar || dogAvatar}
              alt={dog?.name}
            />
            <div className="dogs-opinion__rate">
              <div style={{ fontSize: "25px", fontWeight: "500" }}>
                {dog?.name}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="dogs-opinion__type">
                  <img src={funnyDog} height={28} alt="zabawny" />
                  <span>{funnyCount?.length}</span>
                </div>
                <div className="dogs-opinion__type">
                  <img src={lovelyDog} height={28} alt="kochany" />
                  <span>{lovelyCount?.length}</span>
                </div>
                <div className="dogs-opinion__type">
                  <img src={normalDog} height={28} alt="normal" />
                  <span>{calmCount?.length}</span>
                </div>
                <div className="dogs-opinion__type">
                  <img src={angryDog} height={28} alt="trudny" />
                  <span>{hardCount?.length}</span>
                </div>
              </div>
              <div
                style={{
                  fontSize: "25px",
                  fontWeight: "500",
                }}
              >
                spacery: {countWalk}
              </div>
            </div>
          </div>
          <div className="dogs-opinion__opinionList">
            <EmptyList>
              {dogOpinions?.map(
                ({ id: opinionId, client, trainer, raport, type }) => {
                  const opinionClient = users?.find(
                    ({ id }) => id === client || id === trainer
                  );

                  return (
                    <OpinionCard
                      openDeleteOpinionModal={openDeleteOpinionModal}
                      key={opinionId}
                      review={raport}
                      points={2}
                      type={type}
                      opinionId={opinionId}
                      userAvatar={opinionClient?.avatar}
                      userAvatarAlt={opinionClient?.username}
                      client={opinionClient?.id}
                    />
                  );
                }
              )}
            </EmptyList>
          </div>
          <div className="dogs-opinion__buttons">
            {userId && dog?.owner !== +userId && (
              <Button
                onClick={switchToAddDogOpinion}
                title="Dodaj opinie"
                type="primary"
              />
            )}
            <Button
              styles={{ marginLeft: "auto" }}
              onClick={goBack}
              title="Powrót"
              type="default"
            />
          </div>
          {deleteOpinionId && (
            <Modal>
              <div className="dogs-opinion__modal-content">
                Na pewno chcesz usunąć opinię?
                <Button
                  styles={{ margin: "20px auto 0", width: "80%" }}
                  title="Usuń"
                  onClick={deleteOpinionHandler}
                  type="red"
                  size="L"
                />
                <Button
                  styles={{ margin: "20px auto 0", width: "80%" }}
                  title="Anuluj"
                  onClick={closeDeleteOpinionModal}
                  type="green"
                  size="L"
                />
              </div>
            </Modal>
          )}
        </>
      </WithLoader>
    </div>
  );
};
