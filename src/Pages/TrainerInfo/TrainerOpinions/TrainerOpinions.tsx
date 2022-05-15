import userAvatar from "assets/user-avatar.png";
import { Rating } from "@mui/material";
import { OpinionCard } from "Components/OpinionCard/OpinionCard";
import { useGetOpinions } from "api/useGetOpinions";
import { useParams } from "react-router-dom";
import { useGetUsers } from "api/useGetUsers";
import { useGetSlots } from "api/useGetSlots";
import { EmptyList } from "Components";
import "./TrainerOpinions.scss";

type TrainerOpinionsProps = {
  name: string;
  avatar: string;
};

export const TrainerOpinions = ({ name, avatar }: TrainerOpinionsProps) => {
  const { opinions } = useGetOpinions();
  const { users } = useGetUsers();
  const { id } = useParams();
  const { slots } = useGetSlots();

  const trainerWalks = slots?.filter(
    ({ trainer, status }) => id && trainer === +id && status === "zakończony"
  );
  const countWalk = trainerWalks?.length;

  const trainerOpinions = opinions?.filter(
    ({ trainer }) => id && trainer === +id
  );
  const avg =
    trainerOpinions?.length &&
    trainerOpinions
      ?.map(({ points }) => points)
      ?.reduce((prev, opinion) => {
        const result = prev + opinion;
        return result;
      });

  return (
    <div className="trainer-opinion">
      <div className="trainer-opinion__ownerInfo">
        <img
          className="trainer-opinion__imageUser"
          src={avatar || userAvatar}
          alt={name}
        />
        <div className="trainer-opinion__rate">
          <div style={{ fontSize: "25px", fontWeight: "500" }}>{name}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="trainer-opinion__mark">
              {(avg ? avg / trainerOpinions?.length : 0).toFixed(1)}
            </span>
            <Rating
              className="trainer-opinion__star"
              defaultValue={1}
              max={1}
              readOnly
            />
          </div>
          <div style={{ fontSize: "25px", fontWeight: "500" }}>
            {countWalk} spacer
          </div>
        </div>
      </div>
      <div className="trainer-opinion__opinionList">
        <EmptyList>
          {trainerOpinions?.map(({ id: opinionId, client, review, points }) => {
            const opinionClient = users?.find(({ id }) => id === client);

            return (
              <OpinionCard
                key={opinionId}
                review={review}
                points={points}
                opinionId={opinionId}
                userAvatar={opinionClient?.avatar}
                userAvatarAlt={opinionClient?.username}
                client={client}
              />
            );
          })}
        </EmptyList>
      </div>
    </div>
  );
};
