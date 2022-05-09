import { ReactNode } from "react";
import dogInBox from "assets/empty-dog.png";
import "./EmptyList.scss";

export const EmptyList = ({
  children,
  isVisible = false,
}: {
  children: ReactNode | string[];
  isVisible?: boolean;
}) => {
  console.log(children);
  if ((Array.isArray(children) && children.length) || isVisible) {
    return <>{children}</>;
  } else {
    return (
      <div className="empty-list">
        <img className="empty-list__dog" src={dogInBox} alt="dog-in-the-box" />
        <span className="empty-list__text">Hau, nic tu nie ma !</span>
      </div>
    );
  }
};
