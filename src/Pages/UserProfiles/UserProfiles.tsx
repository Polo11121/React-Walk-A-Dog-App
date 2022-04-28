import { Card } from "Components";
import { useGetUsers } from "api/useGetUsers";
import "./UserProfiles.scss";

export const UserProfiles = () => {
  const { users } = useGetUsers();

  return (
    <div className="user-profiles">
      <div className="user-profiles__title">Profile Użytkowników</div>
      <div className="user-profiles__list">
        {users?.map(({ username, is_trainer, avatar, id }) => (
          <Card
            isUser
            id={id}
            key={id}
            name={username}
            subTitle={is_trainer ? "Trener" : ""}
            imageSrc={avatar}
          />
        ))}
      </div>
    </div>
  );
};
