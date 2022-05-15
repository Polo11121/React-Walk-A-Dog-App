import userAvatar from "assets/user-avatar.png";

export const MapAvatar = ({
  avatarSrc,
  lat,
  lng,
}: {
  avatarSrc?: string;
  lat: number;
  lng: number;
}) => {
  return (
    <img
      style={{
        height: "60px",
        width: "60px",
        borderRadius: "50%",
        border: "1px solid #a7ecae",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      }}
      src={avatarSrc || userAvatar}
      alt="avatar"
    />
  );
};
